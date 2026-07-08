#!/usr/bin/env node
'use strict';

// Generator that emits GitBook-native markdown straight into ./gitbook.
//
// gitbook/openapi/ifunny-api.yaml is the single source of truth for the REST
// API surface. This script reads it and writes one markdown file per tag into
// gitbook/reference/api-reference/, using GitBook's own `{% swagger %}` /
// `{% swagger-parameter %}` / `{% swagger-response %}` / `{% tabs %}` block
// syntax (the same syntax already used by GitBook's own editor, so the
// generated pages get GitBook's native colors/layout/sidebar for free), and
// keeps gitbook/SUMMARY.md and reference/api-reference/README.md in sync.
//
// Each request/response/query/header schema is rendered self-contained in
// JSON, TypeScript and Go: any named types it transitively references
// (including recursive ones, e.g. Comment <-> Reply) are generated once and
// inlined into that same tab set, rather than linking out to a shared
// appendix. GitBook applies syntax highlighting itself from each fenced code
// block's language tag, so no highlighter is bundled here.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const yaml = require('js-yaml');

const SPEC_PATH = path.join(__dirname, '..', 'gitbook', 'openapi', 'ifunny-api.yaml');
const GITBOOK_DIR = path.join(__dirname, '..', 'gitbook');
const API_REFERENCE_DIR = path.join(GITBOOK_DIR, 'reference', 'api-reference');
const SUMMARY_PATH = path.join(GITBOOK_DIR, 'SUMMARY.md');
const REDOCLY_BIN = path.join(__dirname, '..', 'node_modules', '.bin', 'redocly');

// The spec is authored as multiple files (gitbook/openapi/ifunny-api.yaml plus
// ./paths/*.yaml and ./schemas/*.yaml, cross-referenced with relative $refs).
// Bundle it into a single document with `redocly bundle` first, so the rest
// of this script can resolve every $ref as a plain in-document JSON pointer
// (e.g. `#/components/schemas/Foo`) without needing to track, per node, which
// file it was loaded from.
const bundledYaml = execFileSync(REDOCLY_BIN, ['bundle', SPEC_PATH, '--ext', 'yaml'], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});
const spec = yaml.load(bundledYaml);

// ---------------------------------------------------------------------------
// $ref resolution
// ---------------------------------------------------------------------------

function resolveRef(ref) {
  const parts = ref.replace(/^#\//, '').split('/');
  let node = spec;
  for (const p of parts) node = node[p];
  if (!node) throw new Error(`Unresolved $ref: ${ref}`);
  return node;
}

function refName(ref) {
  return ref.split('/').pop();
}

function pascalCase(s) {
  return s
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function lowerFirst(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function pascalToSnakeUpper(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
}

function labelToSnakeUpper(s) {
  return s
    .trim()
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();
}

// Go's net/http canonicalizes header names to e.g. "X-User-Id"; mirrored
// here so generated `header:"..."` struct tags look like real Go code.
function canonicalHeaderName(name) {
  return name
    .split('-')
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase())
    .join('-');
}

// ---------------------------------------------------------------------------
// Named-type resolution, scoped per schema block.
//
// Every request/response schema gets its own fresh `ctx` (registry + queue).
// Within that ctx, $refs and anonymous nested objects become named
// types, generated once and inlined into the same codeblock as the type
// that referenced them. Reusing the same ctx across a whole codeblock
// (rather than one shared, page-wide registry) is what makes each dropdown
// self-contained, and a per-ctx `registry` dedup is what stops recursive
// schemas like Comment <-> Reply from looping forever.
// ---------------------------------------------------------------------------

function registerNamed(ctx, name, schema) {
  if (!ctx.registry.has(name)) {
    ctx.registry.set(name, schema);
    ctx.queue.push(name);
  }
  return name;
}

function flattenAllOf(schema) {
  if (!schema.allOf) return schema;
  const merged = { type: 'object', properties: {}, required: [], description: schema.description };
  for (const branch of schema.allOf) {
    const resolved = branch.$ref ? resolveRef(branch.$ref) : branch;
    const flat = resolved.allOf ? flattenAllOf(resolved) : resolved;
    Object.assign(merged.properties, flat.properties || {});
    merged.required.push(...(flat.required || []));
  }
  return merged;
}

// Resolve a property/array-item schema to an IR node. $refs and anonymous
// objects become named refs (registered for later generation); everything
// else is rendered inline.
function resolveNode(ctx, schema, namePath) {
  if (!schema) return { kind: 'any' };
  if (schema.$ref) {
    const name = refName(schema.$ref);
    registerNamed(ctx, name, resolveRef(schema.$ref));
    return { kind: 'ref', name };
  }
  if (schema.allOf) return resolveNode(ctx, flattenAllOf(schema), namePath);
  if (schema.oneOf) {
    return { kind: 'oneOf', variants: schema.oneOf.map((v, i) => resolveVariant(ctx, v, namePath, i)) };
  }
  const type = schema.type || (schema.properties ? 'object' : undefined);
  if (type === 'array') {
    return { kind: 'array', items: resolveNode(ctx, schema.items || {}, `${namePath}Item`) };
  }
  if (type === 'object' || schema.properties) {
    if (!schema.properties || Object.keys(schema.properties).length === 0) return { kind: 'any' };
    registerNamed(ctx, namePath, schema);
    return { kind: 'ref', name: namePath };
  }
  return { kind: type || 'any', enum: schema.enum, const: schema.const };
}

function resolveVariant(ctx, v, namePath, i) {
  if (v.$ref) {
    const name = refName(v.$ref);
    registerNamed(ctx, name, resolveRef(v.$ref));
    return { kind: 'ref', name };
  }
  const name = v.title ? pascalCase(v.title) : `${namePath}Variant${i + 1}`;
  registerNamed(ctx, name, v);
  return { kind: 'ref', name };
}

// Build the IR body for a schema that already has a name (component schema
// or a synthesized nested-object name). Handles object/array/primitive/enum.
function buildNamedTypeIR(ctx, schema, selfName) {
  const flat = schema.allOf ? flattenAllOf(schema) : schema;
  const type = flat.type || (flat.properties ? 'object' : undefined);
  if (type === 'object' || flat.properties) {
    const props = Object.entries(flat.properties || {}).map(([propName, propSchema]) => ({
      name: propName,
      required: (flat.required || []).includes(propName),
      node: resolveNode(ctx, propSchema, selfName + pascalCase(propName)),
      description: propSchema.description,
    }));
    return { kind: 'object', properties: props, description: flat.description };
  }
  if (type === 'array') {
    return { kind: 'array', items: resolveNode(ctx, flat.items || {}, `${selfName}Item`), description: flat.description };
  }
  return { kind: type || 'string', enum: flat.enum, const: flat.const, description: flat.description };
}

// Top-level entry point for a request body / response schema. Behaves like
// resolveNode, except a bare object at the root is rendered inline (it's
// only used once here, so it doesn't need its own synthesized name).
function renderTopLevelIR(ctx, schema, baseName) {
  if (!schema) return { kind: 'any' };
  if (schema.$ref) {
    const name = refName(schema.$ref);
    registerNamed(ctx, name, resolveRef(schema.$ref));
    return { kind: 'ref', name };
  }
  if (schema.allOf) return renderTopLevelIR(ctx, flattenAllOf(schema), baseName);
  if (schema.oneOf) {
    return { kind: 'oneOf', variants: schema.oneOf.map((v, i) => resolveVariant(ctx, v, baseName, i)) };
  }
  const type = schema.type || (schema.properties ? 'object' : undefined);
  if (type === 'array') {
    return { kind: 'array', items: renderTopLevelIR(ctx, schema.items || {}, `${baseName}Item`) };
  }
  if (type === 'object' || schema.properties) {
    return buildNamedTypeIR(ctx, schema, baseName);
  }
  return { kind: type || 'any', enum: schema.enum, const: schema.const };
}

// Drains a ctx's queue of registered-but-not-yet-built named types into the
// `nested` list, in the same way for any top-level IR (request/response body
// or a synthesized parameters object) - shared by both renderSchemaWithDeps
// and renderParamsSchemaWithDeps below.
function drainQueue(ctx) {
  const seen = new Set();
  const nested = [];
  while (ctx.queue.length) {
    const name = ctx.queue.shift();
    if (seen.has(name)) continue;
    seen.add(name);
    const nestedSchema = ctx.registry.get(name);
    nested.push({ name, ir: buildNamedTypeIR(ctx, nestedSchema, name) });
  }
  return nested;
}

// Renders a top-level schema plus the full closure of named types it
// transitively references, all scoped to one fresh ctx. This is what makes
// a single request/response codeblock self-contained: if the same type is
// referenced multiple times within it, it's still only defined once.
function renderSchemaWithDeps(schema, baseName) {
  const ctx = { registry: new Map(), queue: [] };
  const topIR = renderTopLevelIR(ctx, schema, baseName);
  return { topIR, nested: drainQueue(ctx) };
}

// Synthesizes a top-level "object" IR out of a flat list of OpenAPI
// parameter objects (i.e. everything with the same `in:`, such as all query
// params or all header params on one operation), so a group of parameters
// can be rendered with exactly the same JSON/TS/Go machinery used for
// request/response bodies - each parameter becomes a property, named after
// the parameter's `name`, typed from its `schema`.
function renderParamsSchemaWithDeps(params, baseName) {
  const ctx = { registry: new Map(), queue: [] };
  const properties = params.map((p) => ({
    name: p.name,
    required: !!p.required,
    node: resolveNode(ctx, p.schema || {}, `${baseName}${pascalCase(p.name)}`),
    description: p.description,
  }));
  const topIR = { kind: 'object', properties };
  return { topIR, nested: drainQueue(ctx) };
}

// ---------------------------------------------------------------------------
// Format renderers: JSON (pseudo-schema), TypeScript, Go
// ---------------------------------------------------------------------------

function jsonType(node) {
  switch (node.kind) {
    case 'ref':
      return node.name;
    case 'array':
      return `${jsonType(node.items)}[]`;
    case 'oneOf':
      return node.variants.map(jsonType).join(' | ');
    case 'string':
      if (node.const !== undefined) return String(node.const);
      if (node.enum) return `enum(${node.enum.join(', ')})`;
      return 'string';
    case 'integer':
    case 'number':
      if (node.const !== undefined) return String(node.const);
      if (node.enum) return `enum(${node.enum.join(', ')})`;
      return node.kind;
    case 'boolean':
      return node.const !== undefined ? String(node.const) : 'boolean';
    default:
      return 'any';
  }
}

function renderJSON(name, ir) {
  if (ir.kind !== 'object') {
    return `// ${name}\n"${name}": "${jsonType(ir)}"`;
  }
  return `// ${name}\n${renderJSONBody(ir, 0)}`;
}

function renderJSONBody(ir, level) {
  const pad = '  '.repeat(level);
  const padIn = '  '.repeat(level + 1);
  const lines = ir.properties.map((p) => {
    const key = p.required ? `"${p.name}"` : `"${p.name}"?`;
    return `${padIn}${key}: "${jsonType(p.node)}"`;
  });
  return `{\n${lines.join(',\n')}\n${pad}}`;
}

function tsType(node) {
  switch (node.kind) {
    case 'ref':
      return node.name;
    case 'array':
      return `${tsType(node.items)}[]`;
    case 'oneOf':
      return node.variants.map(tsType).join(' | ');
    case 'string':
      if (node.const !== undefined) return `'${node.const}'`;
      if (node.enum) return node.enum.map((v) => `'${v}'`).join(' | ');
      return 'string';
    case 'integer':
    case 'number':
      if (node.const !== undefined) return String(node.const);
      if (node.enum) return node.enum.join(' | ');
      return 'number';
    case 'boolean':
      return node.const !== undefined ? String(node.const) : 'boolean';
    default:
      return 'unknown';
  }
}

function tsKey(name) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `'${name}'`;
}

function renderTS(name, ir) {
  if (ir.kind !== 'object') {
    return `type ${name} = ${tsType(ir)};`;
  }
  const lines = ir.properties.map((p) => `  ${tsKey(p.name)}${p.required ? '' : '?'}: ${tsType(p.node)};`);
  return `interface ${name} {\n${lines.join('\n')}\n}`;
}

// An integer enum (`type: integer, enum: [...]`) is rendered in Go as a
// local, unexported `<name>Kind` type plus a `const (...)` block, rather
// than collapsing straight to a bare `int` and discarding the enum. This
// applies to both named schemas reached via $ref (e.g. ChatType) and
// anonymous inline enum properties (e.g. `accepted_mailing`) - see
// isIntEnumIR()'s two call sites in renderSchemaBlock/goFieldType below.
function isIntEnumIR(ir) {
  return !!ir && ir.kind === 'integer' && Array.isArray(ir.enum) && ir.enum.length > 0 && ir.const === undefined;
}

// Best-effort extraction of {value: label} pairs out of a free-text enum
// description, e.g. "1=Private Direct Message, 2=Private Group Chat" or
// "1: True - 0: False". Returns null if a label can't be found for every
// value in `values`, so callers can fall back to numbering variants instead.
function parseEnumLabels(description, values) {
  if (!description) return null;
  const re = /(-?\d+)\s*[:=]\s*([A-Za-z][A-Za-z0-9 _/]*?)(?=\s*(?:,|;|-\s*-?\d|\.|$))/g;
  const map = new Map();
  let m;
  while ((m = re.exec(description))) {
    map.set(Number(m[1]), m[2].trim());
  }
  return values.every((v) => map.has(v)) ? map : null;
}

// Enum values are "sequential" (representable with Go's `iota`) if, in the
// order given, each is exactly one more than the previous.
function isSequential(values) {
  return values.every((v, i) => v === values[0] + i);
}

// Builds a local, unexported `<base>Kind` integer type plus a `const (...)`
// block enumerating its values - mirroring the `Enum_VARIANT_NAME` style
// used by protobuf-generated Go, just with an unexported underlying type.
// Returns the type name to use for struct fields plus the Go source for the
// type + const block (to be appended to the codeblock's output once).
function buildGoEnum(baseName, values, description) {
  const kindName = `${lowerFirst(baseName)}Kind`;
  const thingSnake = pascalToSnakeUpper(baseName);
  const labels = parseEnumLabels(description, values);
  const sequential = isSequential(values);
  const offset = values[0];
  const entries = values.map((v) => {
    const label = labels && labels.has(v) ? labelToSnakeUpper(labels.get(v)) : v < 0 ? `NEG_${Math.abs(v)}` : String(v);
    const rhs = sequential
      ? offset === 0
        ? `${kindName}(iota)`
        : `${kindName}(iota + ${offset})`
      : `${kindName}(${v})`;
    return { name: `${thingSnake}_${label}`, rhs };
  });
  const width = Math.max(...entries.map((e) => e.name.length));
  const constLines = entries.map((e) => `\t${e.name.padEnd(width)} = ${e.rhs}`);
  const code = `type ${kindName} int\n\nconst (\n${constLines.join('\n')}\n)`;
  return { kindName, code };
}

function goType(node, goCtx) {
  switch (node.kind) {
    case 'ref':
      return (goCtx && goCtx.refKindOverride.get(node.name)) || node.name;
    case 'array':
      return `[]${goType(node.items, goCtx)}`;
    case 'oneOf':
      return node.variants.map((v) => goType(v, goCtx)).join(' /* or */ ');
    case 'string':
      return 'string';
    case 'integer':
      return 'int';
    case 'number':
      return 'float64';
    case 'boolean':
      return 'bool';
    default:
      return 'interface{}';
  }
}

function goFieldType(p, ownerName, goCtx) {
  // Anonymous inline enum (e.g. a property with its own `enum` and no $ref):
  // synthesize a Kind type scoped to this property, same naming convention
  // used for anonymous nested objects elsewhere in this file.
  if (isIntEnumIR(p.node)) {
    const baseName = `${ownerName}${pascalCase(p.name)}`;
    const { kindName, code } = buildGoEnum(baseName, p.node.enum, p.description);
    if (goCtx && !goCtx.enumBlocks.has(kindName)) goCtx.enumBlocks.set(kindName, code);
    return p.required ? kindName : `*${kindName}`;
  }
  const isEnumRef = p.node.kind === 'ref' && !!goCtx && goCtx.refKindOverride.has(p.node.name);
  const base = goType(p.node, goCtx);
  const scalar = isEnumRef || ['string', 'integer', 'number', 'boolean'].includes(p.node.kind);
  return !p.required && scalar ? `*${base}` : base;
}

// Default Go struct-tag convention: `json:"name[,omitempty]"`, used for
// request/response bodies. Query/header parameter blocks pass a different
// tagKey (`query`/`header`) and tagName mapping (e.g. HTTP header
// canonicalization) instead - see canonicalHeaderName() and the
// schemaBlock() call sites in renderOperation().
const JSON_GO_TAG = { tagKey: 'json', tagName: (n) => n };

function renderGo(name, ir, goCtx, goTag) {
  if (ir.kind !== 'object') {
    return `type ${name} ${goType(ir, goCtx)}`;
  }
  const lines = ir.properties.map((p) => {
    const tag = `\`${goTag.tagKey}:"${goTag.tagName(p.name)}${p.required ? '' : ',omitempty'}"\``;
    return `\t${pascalCase(p.name) || 'Field'} ${goFieldType(p, name, goCtx)} ${tag}`;
  });
  return `type ${name} struct {\n${lines.join('\n')}\n}`;
}

// Builds a schema's full contents (top type + all its transitive named
// types) in all three formats, each self-contained, as plain source text
// (no HTML escaping/highlighting - GitBook highlights fenced code blocks
// itself from the language tag). `goTag` controls the Go struct-tag
// convention (defaults to `json:"..."` for bodies; pass
// { tagKey: 'query' | 'header', tagName } for parameter blocks).
function buildSchemaTexts(schemaData, name, goTag) {
  goTag = goTag || JSON_GO_TAG;
  const { topIR, nested } = schemaData;
  const jsonText = [renderJSON(name, topIR), ...nested.map((n) => renderJSON(n.name, n.ir))].join('\n\n');
  const tsText = [renderTS(name, topIR), ...nested.map((n) => renderTS(n.name, n.ir))].join('\n\n');

  const goCtx = { refKindOverride: new Map(), enumBlocks: new Map() };
  const allEntries = [{ name, ir: topIR }, ...nested];

  // First pass: find every named entry that's actually an integer enum, and
  // register its `<name>Kind` type + const block up front, so any struct
  // field referencing it (a 'ref' node) resolves to the Kind type even if
  // that struct is rendered before we'd otherwise reach the enum itself.
  const enumNames = new Set();
  for (const entry of allEntries) {
    if (isIntEnumIR(entry.ir)) {
      const { kindName, code } = buildGoEnum(entry.name, entry.ir.enum, entry.ir.description);
      goCtx.refKindOverride.set(entry.name, kindName);
      goCtx.enumBlocks.set(kindName, code);
      enumNames.add(entry.name);
    }
  }

  // Second pass: render everything else, then append the Kind/const blocks
  // (including any synthesized from anonymous inline enum properties,
  // collected into goCtx.enumBlocks as a side effect of goFieldType above).
  const goParts = allEntries.filter((e) => !enumNames.has(e.name)).map((e) => renderGo(e.name, e.ir, goCtx, goTag));
  goParts.push(...goCtx.enumBlocks.values());
  const goText = goParts.join('\n\n');

  return { jsonText, tsText, goText };
}

// ---------------------------------------------------------------------------
// Operation extraction
// ---------------------------------------------------------------------------

const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

// Cute per-tag emoji for SUMMARY.md/README.md, matching the style already
// used throughout gitbook/ (e.g. 🔑 OAuth2, 🫂 Users, 😂 Content). "Chat" gets
// 📡 rather than 💬, since 💬 is already used by the hand-written WAMP
// protocol pages at gitbook/reference/chats/.
const TAG_EMOJI = {
  OAuth2: '🔑',
  Client: '🤖',
  Users: '🫂',
  Content: '😂',
  Comments: '💭',
  Chat: '📡',
  Discovery: '🧭',
  Tasks: '⏳',
};
const DEFAULT_TAG_EMOJI = '📁';

function tagEmoji(name) {
  return TAG_EMOJI[name] || DEFAULT_TAG_EMOJI;
}

// Output filename (without extension) per tag, under reference/api-reference/.
const TAG_FILE = {
  OAuth2: 'oauth2',
  Client: 'client',
  Users: 'users',
  Content: 'content',
  Comments: 'comments',
  Chat: 'chat',
  Discovery: 'discovery',
  Tasks: 'tasks',
};

function tagFile(name) {
  return TAG_FILE[name] || slugify(name);
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function collectOperationsByTag() {
  const tagMap = new Map();
  for (const t of spec.tags || []) tagMap.set(t.name, { name: t.name, description: t.description || '', operations: [] });

  for (const [routePath, pathItem] of Object.entries(spec.paths || {})) {
    for (const method of METHODS) {
      const op = pathItem[method];
      if (!op) continue;
      const tagName = (op.tags && op.tags[0]) || 'Other';
      if (!tagMap.has(tagName)) tagMap.set(tagName, { name: tagName, description: '', operations: [] });
      tagMap.get(tagName).operations.push({ method, routePath, op });
    }
  }
  return Array.from(tagMap.values()).filter((t) => t.operations.length);
}

function resolveParam(p) {
  return p.$ref ? resolveRef(p.$ref) : p;
}

function describeSecurity(op) {
  const sec = op.security !== undefined ? op.security : spec.security;
  if (!sec || sec.length === 0) return 'None';
  return sec.map((alt) => Object.keys(alt).join(' + ')).join(' or ');
}

// Flattens a request-body schema's top-level properties into a plain list,
// for one native {% swagger-parameter in="body" %} block per property -
// mirrors the hand-written convention (e.g. gitbook/reference/api-reference/
// oauth2.md's "Register Account" body params), rather than a single opaque
// body schema.
function flatBodyProps(schema) {
  if (!schema) return [];
  const flat = schema.allOf ? flattenAllOf(schema) : schema;
  if (!flat.properties) return [];
  return Object.entries(flat.properties).map(([name, propSchema]) => ({
    name,
    required: (flat.required || []).includes(name),
    schema: propSchema,
    description: propSchema.description,
  }));
}

function buildOperationData(entry) {
  const { method, routePath, op } = entry;
  const baseName = pascalCase(op.operationId || `${method}${routePath}`);

  const parameters = (op.parameters || []).map(resolveParam);
  const pathParams = parameters.filter((p) => p.in === 'path');
  const queryParams = parameters.filter((p) => p.in === 'query');
  const headerParams = parameters.filter((p) => p.in === 'header');
  const querySchemaData = queryParams.length ? renderParamsSchemaWithDeps(queryParams, `${baseName}Query`) : null;
  const headerSchemaData = headerParams.length ? renderParamsSchemaWithDeps(headerParams, `${baseName}Header`) : null;

  let requestBody = null;
  if (op.requestBody) {
    const contentTypes = Object.keys(op.requestBody.content || {});
    const ct = contentTypes[0];
    if (ct) {
      const bodySchema = op.requestBody.content[ct].schema;
      requestBody = {
        contentType: ct,
        required: !!op.requestBody.required,
        bodyProps: flatBodyProps(bodySchema),
        schemaData: renderSchemaWithDeps(bodySchema, `${baseName}Request`),
      };
    }
  }

  // Every declared response (success and error alike) gets its own
  // {% swagger-response %} block further down, each self-contained.
  const responses = Object.entries(op.responses || {}).map(([code, respRaw]) => {
    const resp = respRaw.$ref ? resolveRef(respRaw.$ref) : respRaw;
    const contentTypes = Object.keys(resp.content || {});
    const ct = contentTypes[0];
    return {
      code,
      description: resp.description || '',
      schemaData: ct ? renderSchemaWithDeps(resp.content[ct].schema, `${baseName}${code}`) : null,
    };
  });

  return {
    method,
    routePath,
    gitbookPath: routePath.replace(/\{([^}]+)\}/g, ':$1'),
    slug: slugify(op.operationId || `${method}-${routePath}`),
    operationId: op.operationId,
    summary: op.summary || op.operationId,
    description: op.description || '',
    security: describeSecurity(op),
    pathParams,
    queryParams,
    headerParams,
    querySchemaData,
    headerSchemaData,
    requestBody,
    responses,
  };
}

// ---------------------------------------------------------------------------
// Build everything
// ---------------------------------------------------------------------------

const tags = collectOperationsByTag();
const operationsByTagRendered = tags.map((tag) => ({
  ...tag,
  operations: tag.operations.map(buildOperationData),
}));

// ---------------------------------------------------------------------------
// GitBook markdown rendering
// ---------------------------------------------------------------------------

const BASE_URL = (spec.servers && spec.servers[0] && spec.servers[0].url) || '';

// Struct-tag conventions for the two parameter groups that get their own
// combined type view (see typeSection/renderOperationMarkdown below) -
// mirrors how a hand-written Go client would bind query strings vs. HTTP
// headers, as opposed to the `json:"..."` tags used for request/response
// bodies.
const QUERY_GO_TAG = { tagKey: 'query', tagName: (n) => n };
const HEADER_GO_TAG = { tagKey: 'header', tagName: canonicalHeaderName };

// Human-readable text for the status codes actually used across the spec,
// for building `status="200: OK"`-style {% swagger-response %} attributes.
const STATUS_TEXT = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  423: 'Locked',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
};

function statusLabel(code) {
  const text = STATUS_TEXT[code];
  return text ? `${code}: ${text}` : String(code);
}

// Escapes a value for embedding inside a GitBook block attribute (e.g.
// `description="..."`), which GitBook parses as a single double-quoted
// string - embedded quotes/newlines would otherwise break the block.
function mdAttr(s) {
  return String(s == null ? '' : s)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, ' ');
}

// Maps a JSON Schema node to the capitalized pseudo-type convention already
// used by the hand-written {% swagger-parameter %} blocks (String / Number /
// Boolean / String[] etc.), dereferencing $ref/allOf along the way.
function paramType(schema) {
  if (!schema) return 'String';
  if (schema.$ref) return paramType(resolveRef(schema.$ref));
  if (schema.allOf) return paramType(flattenAllOf(schema));
  if (schema.type === 'array') return `${paramType(schema.items || {})}[]`;
  switch (schema.type) {
    case 'integer':
    case 'number':
      return 'Number';
    case 'boolean':
      return 'Boolean';
    default:
      return 'String';
  }
}

// Appends enum values (if any) to a parameter's free-text description, so
// e.g. an integer-enum query param still communicates its allowed values in
// the native {% swagger-parameter %} block, which has no separate slot for
// them.
function paramDescription(schema, description) {
  const resolved = schema && schema.$ref ? resolveRef(schema.$ref) : schema;
  const flat = resolved && resolved.allOf ? flattenAllOf(resolved) : resolved;
  const parts = [];
  if (description) parts.push(description);
  if (flat && Array.isArray(flat.enum) && flat.enum.length) parts.push(`One of: ${flat.enum.join(', ')}`);
  return parts.join('\n\n');
}

function swaggerParameterBlock({ in: paramIn, name, schema, required, description }) {
  const attrs = [`in="${paramIn}"`, `name="${mdAttr(name)}"`, `type="${paramType(schema)}"`];
  if (required) attrs.push('required="true"');
  const body = paramDescription(schema, description);
  return `{% swagger-parameter ${attrs.join(' ')} %}\n${body}\n{% endswagger-parameter %}`;
}

// Nested {% tabs %} wrapping our self-contained JSON/TypeScript/Go rendering
// of one schema - GitBook syntax-highlights each fenced code block itself
// from its language tag, so this is the "our style, GitBook-native
// container" meshing point the whole refactor is built around.
function formatTabsBlock(jsonText, tsText, goText) {
  return [
    '{% tabs %}',
    '{% tab title="JSON" %}',
    '```json',
    jsonText,
    '```',
    '{% endtab %}',
    '',
    '{% tab title="TypeScript" %}',
    '```typescript',
    tsText,
    '```',
    '{% endtab %}',
    '',
    '{% tab title="Go" %}',
    '```go',
    goText,
    '```',
    '{% endtab %}',
    '{% endtabs %}',
  ].join('\n');
}

// A bold heading plus a formatTabsBlock, for embedding a combined
// Query/Header/Request-body type view inside {% swagger-description %},
// alongside (not instead of) the native per-field {% swagger-parameter %}
// blocks below it.
function typeSection(heading, schemaData, name, goTag) {
  const { jsonText, tsText, goText } = buildSchemaTexts(schemaData, name, goTag);
  return `**${heading}**\n\n${formatTabsBlock(jsonText, tsText, goText)}`;
}

function swaggerResponseBlock(o, r) {
  const attrs = `status="${mdAttr(statusLabel(r.code))}" description="${mdAttr(r.description)}"`;
  if (!r.schemaData) {
    return `{% swagger-response ${attrs} %}\nNo response body.\n{% endswagger-response %}`;
  }
  const { jsonText, tsText, goText } = buildSchemaTexts(r.schemaData, `${pascalCase(o.operationId)}${r.code}Response`);
  return `{% swagger-response ${attrs} %}\n${formatTabsBlock(jsonText, tsText, goText)}\n{% endswagger-response %}`;
}

function renderOperationMarkdown(o) {
  const parts = [];
  parts.push(
    `{% swagger method="${o.method}" path="${mdAttr(o.gitbookPath)}" baseUrl="${mdAttr(BASE_URL)}" summary="${mdAttr(o.summary)}" %}`
  );

  const descParts = [];
  if (o.description) descParts.push(o.description);
  descParts.push(`**Auth:** ${o.security}`);
  if (o.querySchemaData) {
    descParts.push(typeSection('Query Parameters', o.querySchemaData, `${pascalCase(o.operationId)}Query`, QUERY_GO_TAG));
  }
  if (o.headerSchemaData) {
    descParts.push(typeSection('Headers', o.headerSchemaData, `${pascalCase(o.operationId)}Header`, HEADER_GO_TAG));
  }
  if (o.requestBody) {
    descParts.push(typeSection(`Request Body (${o.requestBody.contentType})`, o.requestBody.schemaData, `${pascalCase(o.operationId)}Request`));
  }
  parts.push(`{% swagger-description %}\n${descParts.join('\n\n')}\n{% endswagger-description %}`);

  for (const p of o.pathParams) {
    parts.push(swaggerParameterBlock({ in: 'path', name: p.name, schema: p.schema, required: true, description: p.description }));
  }
  for (const p of o.queryParams) {
    parts.push(swaggerParameterBlock({ in: 'query', name: p.name, schema: p.schema, required: p.required, description: p.description }));
  }
  for (const p of o.headerParams) {
    parts.push(swaggerParameterBlock({ in: 'header', name: p.name, schema: p.schema, required: p.required, description: p.description }));
  }
  if (o.requestBody) {
    for (const bp of o.requestBody.bodyProps) {
      parts.push(swaggerParameterBlock({ in: 'body', name: bp.name, schema: bp.schema, required: bp.required, description: bp.description }));
    }
  }
  for (const r of o.responses) {
    parts.push(swaggerResponseBlock(o, r));
  }

  parts.push('{% endswagger %}');
  return parts.join('\n\n');
}

function renderTagMarkdown(tag) {
  const lines = [];
  const frontmatterDescription = (tag.description || `API methods in relation to ${tag.name}`).replace(/\s*\n\s*/g, ' ').trim();
  lines.push('---');
  lines.push(`description: ${frontmatterDescription}`);
  lines.push('---');
  lines.push('');
  lines.push(`# ${tagEmoji(tag.name)} ${tag.name}`);
  lines.push('');
  if (tag.description) {
    lines.push(tag.description);
    lines.push('');
  }
  for (const o of tag.operations) {
    lines.push(renderOperationMarkdown(o));
    lines.push('');
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

function renderApiReferenceReadme(tags) {
  const lines = [];
  lines.push('# 👾 API Reference');
  lines.push('');
  lines.push('Dive into the specifics of each API endpoint by checking out our complete documentation.');
  lines.push('');
  for (const tag of tags) {
    lines.push(`## ${tagEmoji(tag.name)} ${tag.name}`);
    lines.push('');
    if (tag.description) {
      lines.push(tag.description);
      lines.push('');
    }
    const file = `${tagFile(tag.name)}.md`;
    lines.push(`{% content-ref url="${file}" %}`);
    lines.push(`[${file}](${file})`);
    lines.push('{% endcontent-ref %}');
    lines.push('');
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

// Surgically replaces the API Reference sub-list in gitbook/SUMMARY.md with
// one entry per tag, leaving the rest of the file (front matter, Data Types,
// Chats, etc.) untouched. Idempotent across reruns.
function updateSummary(tags) {
  const content = fs.readFileSync(SUMMARY_PATH, 'utf8');
  const lines = content.split('\n');
  const headerIdx = lines.findIndex((l) => l.includes('reference/api-reference/README.md'));
  if (headerIdx === -1) throw new Error('Could not find API Reference entry in gitbook/SUMMARY.md');
  let endIdx = headerIdx + 1;
  while (endIdx < lines.length && /^\s{2}\* \[/.test(lines[endIdx])) endIdx++;
  const newSubItems = tags.map((tag) => `  * [${tagEmoji(tag.name)} ${tag.name}](reference/api-reference/${tagFile(tag.name)}.md)`);
  newSubItems.push('  * [📄 OpenAPI Spec](reference/api-reference/openapi.md)');
  lines.splice(headerIdx + 1, endIdx - (headerIdx + 1), ...newSubItems);
  fs.writeFileSync(SUMMARY_PATH, lines.join('\n'));
}

fs.mkdirSync(API_REFERENCE_DIR, { recursive: true });
for (const tag of operationsByTagRendered) {
  fs.writeFileSync(path.join(API_REFERENCE_DIR, `${tagFile(tag.name)}.md`), renderTagMarkdown(tag));
}
fs.writeFileSync(path.join(API_REFERENCE_DIR, 'README.md'), renderApiReferenceReadme(operationsByTagRendered));
updateSummary(operationsByTagRendered);
process.stdout.write(`Generated ${operationsByTagRendered.length} tag pages in ${API_REFERENCE_DIR}.\n`);
