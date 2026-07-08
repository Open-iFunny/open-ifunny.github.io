#!/usr/bin/env node
'use strict';

// Custom static-site generator for the iFunny OpenAPI spec.
//
// Replaces Redoc entirely. Redoc's React bundle has no supported way to:
//   - collapse its 3-pane layout (nav / content / sample) into a single column
//   - render a schema as anything other than a JSON/YAML example
// so rather than patching Redoc's compiled output, this script reads the spec
// directly and renders exactly the layout we want: one column, grouped by
// tag, each operation showing METHOD /path with a JSON / TypeScript / Go
// schema-format switcher instead of a live example payload.
//
// Each request/response schema block is self-contained: any named types it
// transitively references (including recursive ones, e.g. Comment <-> Reply)
// are generated once and inlined into that same codeblock, rather than
// linking out to a shared appendix.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const yaml = require('js-yaml');
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
hljs.registerLanguage('go', require('highlight.js/lib/languages/go'));

const SPEC_PATH = path.join(__dirname, '..', 'gitbook', 'openapi', 'ifunny-api.yaml');
const OUT_DIR = path.join(__dirname, '..', '_site');
const OUT_FILE = path.join(OUT_DIR, 'index.html');
const HLJS_THEME_PATH = path.join(__dirname, '..', 'node_modules', 'highlight.js', 'styles', 'github-dark.css');
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

function esc(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function highlight(code, language) {
  return hljs.highlight(code, { language }).value;
}

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

// Renders a schema block's full contents (top type + all its transitive
// named types) in all three formats, each self-contained. `goTag` controls
// the Go struct-tag convention (defaults to `json:"..."` for bodies; pass
// { tagKey: 'query' | 'header', tagName } for parameter blocks).
function renderSchemaBlock(schemaData, name, goTag) {
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

  return {
    json: esc(jsonText),
    ts: highlight(tsText, 'typescript'),
    go: highlight(goText, 'go'),
  };
}

// ---------------------------------------------------------------------------
// Operation extraction
// ---------------------------------------------------------------------------

const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

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

function buildOperationData(entry) {
  const { method, routePath, op } = entry;
  const baseName = pascalCase(op.operationId || `${method}${routePath}`);

  const parameters = (op.parameters || []).map(resolveParam);
  const queryParams = parameters.filter((p) => p.in === 'query');
  const headerParams = parameters.filter((p) => p.in === 'header');
  const querySchemaData = queryParams.length ? renderParamsSchemaWithDeps(queryParams, `${baseName}Query`) : null;
  const headerSchemaData = headerParams.length ? renderParamsSchemaWithDeps(headerParams, `${baseName}Header`) : null;

  let requestBody = null;
  if (op.requestBody) {
    const contentTypes = Object.keys(op.requestBody.content || {});
    const ct = contentTypes[0];
    if (ct) {
      requestBody = {
        contentType: ct,
        required: !!op.requestBody.required,
        schemaData: renderSchemaWithDeps(op.requestBody.content[ct].schema, `${baseName}Request`),
      };
    }
  }

  const responseEntries = Object.entries(op.responses || {});
  let primaryResponse = null;
  const otherResponses = [];
  for (const [code, respRaw] of responseEntries) {
    const resp = respRaw.$ref ? resolveRef(respRaw.$ref) : respRaw;
    const isSuccess = /^2\d\d$/.test(code);
    const contentTypes = Object.keys(resp.content || {});
    const ct = contentTypes[0];
    if (isSuccess && ct && !primaryResponse) {
      primaryResponse = {
        code,
        description: resp.description,
        contentType: ct,
        schemaData: renderSchemaWithDeps(resp.content[ct].schema, `${baseName}${code}`),
      };
      continue;
    }
    otherResponses.push({ code, description: resp.description });
  }

  return {
    method,
    routePath,
    operationId: op.operationId,
    summary: op.summary || op.operationId,
    description: op.description || '',
    security: describeSecurity(op),
    parameters,
    querySchemaData,
    headerSchemaData,
    requestBody,
    primaryResponse,
    otherResponses,
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
// HTML rendering
// ---------------------------------------------------------------------------

function methodBadge(method) {
  return `<span class="method method-${method}">${method.toUpperCase()}</span>`;
}

function formatTabs() {
  return `
    <div class="format-tabs">
      <button type="button" class="format-btn active" data-format-btn="json">JSON</button>
      <button type="button" class="format-btn" data-format-btn="ts">TypeScript</button>
      <button type="button" class="format-btn" data-format-btn="go">Go</button>
    </div>`;
}

function schemaBlock(label, name, schemaData, goTag) {
  const rendered = renderSchemaBlock(schemaData, name, goTag);
  return `
    <h4>${esc(label)}</h4>
    <pre data-format-panel="json">${rendered.json}</pre>
    <pre data-format-panel="ts" hidden><code class="hljs">${rendered.ts}</code></pre>
    <pre data-format-panel="go" hidden><code class="hljs">${rendered.go}</code></pre>`;
}

// Struct-tag conventions for the two parameter groups that get their own
// schema block (see buildOperationData/renderOperation) - mirrors how a
// hand-written Go client would bind query strings vs. HTTP headers, as
// opposed to the `json:"..."` tags used for request/response bodies.
const QUERY_GO_TAG = { tagKey: 'query', tagName: (n) => n };
const HEADER_GO_TAG = { tagKey: 'header', tagName: canonicalHeaderName };

function paramsTable(parameters) {
  if (!parameters.length) return '';
  const rows = parameters
    .map(
      (p) => `
      <tr>
        <td><code>${esc(p.name)}</code></td>
        <td>${esc(p.in)}</td>
        <td>${p.required ? 'yes' : 'no'}</td>
        <td>${esc((p.schema && p.schema.type) || 'any')}</td>
        <td>${esc(p.description || '')}</td>
      </tr>`
    )
    .join('');
  return `
    <table class="params">
      <thead><tr><th>Name</th><th>In</th><th>Required</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function otherResponsesList(otherResponses) {
  if (!otherResponses.length) return '';
  const items = otherResponses.map((r) => `<li><code>${esc(r.code)}</code> — ${esc(r.description || '')}</li>`).join('');
  return `<p class="other-responses"><strong>Other responses:</strong></p><ul class="other-responses-list">${items}</ul>`;
}

function renderOperation(o) {
  return `
    <details class="operation">
      <summary>
        ${methodBadge(o.method)}
        <span class="route">${esc(o.routePath)}</span>
        <span class="op-summary">${esc(o.summary)}</span>
        ${formatTabs()}
      </summary>
      <div class="op-body">
        ${o.description ? `<p class="op-description">${esc(o.description)}</p>` : ''}
        <p class="op-security"><strong>Auth:</strong> ${esc(o.security)}</p>
        ${paramsTable(o.parameters)}
        ${o.querySchemaData ? schemaBlock('Query Parameters', `${pascalCase(o.operationId)}QueryParams`, o.querySchemaData, QUERY_GO_TAG) : ''}
        ${o.headerSchemaData ? schemaBlock('Headers', `${pascalCase(o.operationId)}Headers`, o.headerSchemaData, HEADER_GO_TAG) : ''}
        ${o.requestBody ? schemaBlock(`Request Body (${o.requestBody.contentType})`, `${pascalCase(o.operationId)}Request`, o.requestBody.schemaData) : ''}
        ${o.primaryResponse ? schemaBlock(`Response ${o.primaryResponse.code} — ${o.primaryResponse.description || ''}`, `${pascalCase(o.operationId)}Response`, o.primaryResponse.schemaData) : ''}
        ${otherResponsesList(o.otherResponses)}
      </div>
    </details>`;
}

function renderTag(tag) {
  return `
    <section class="scope">
      <h2>${esc(tag.name)}</h2>
      ${tag.description ? `<p class="scope-description">${esc(tag.description)}</p>` : ''}
      ${tag.operations.map(renderOperation).join('\n')}
    </section>`;
}

const hljsTheme = fs.readFileSync(HLJS_THEME_PATH, 'utf8');

const CSS = `
  :root {
    --bg: #0d1117;
    --bg-raised: #161b22;
    --border: #30363d;
    --border-dark: #21262d;
    --text: #c9d1d9;
    --text-secondary: #8b949e;
    --accent: #58a6ff;
    --get: #3fb950;
    --post: #58a6ff;
    --put: #d29922;
    --delete: #f85149;
    --patch: #bc8cff;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.5;
  }
  main {
    max-width: 860px;
    margin: 0 auto;
    padding: 2rem 1.5rem 6rem;
  }
  header.page-header {
    max-width: 860px;
    margin: 0 auto;
    padding: 2rem 1.5rem 0;
  }
  h1 { color: var(--text); }
  h2 {
    color: var(--text);
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
    margin-top: 3rem;
  }
  h4 { color: var(--text-secondary); margin-bottom: 0.25rem; }
  p.scope-description, p.op-description { color: var(--text-secondary); }
  a { color: var(--accent); }
  code { background: var(--bg-raised); padding: 0.1rem 0.35rem; border-radius: 4px; }
  details.operation {
    background: var(--bg-raised);
    border: 1px solid var(--border-dark);
    border-radius: 6px;
    margin: 0.75rem 0;
    padding: 0.5rem 1rem;
  }
  details.operation summary {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
    list-style: none;
    padding: 0.5rem 0;
  }
  details.operation summary::-webkit-details-marker { display: none; }
  .route { font-family: 'SFMono-Regular', Consolas, monospace; font-weight: 600; }
  .op-summary { color: var(--text-secondary); font-size: 0.9rem; }
  .method {
    font-family: monospace;
    font-weight: 700;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #010409;
  }
  .method-get { background: var(--get); }
  .method-post { background: var(--post); }
  .method-put { background: var(--put); }
  .method-delete { background: var(--delete); }
  .method-patch { background: var(--patch); }
  .op-body { margin-top: 0.5rem; border-top: 1px solid var(--border-dark); padding-top: 0.75rem; }
  table.params { width: 100%; border-collapse: collapse; margin: 0.75rem 0; font-size: 0.9rem; }
  table.params th, table.params td {
    text-align: left;
    padding: 0.35rem 0.5rem;
    border-bottom: 1px solid var(--border-dark);
  }
  table.params th { color: var(--text-secondary); font-weight: 600; }
  .format-tabs { margin-left: auto; display: flex; gap: 0.25rem; }
  .format-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    border-radius: 4px;
    padding: 0.15rem 0.5rem;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .format-btn.active { background: var(--accent); color: #010409; border-color: var(--accent); }
  pre {
    background: #010409;
    color: var(--text);
    border: 1px solid var(--border-dark);
    border-radius: 6px;
    padding: 0.75rem 1rem;
    overflow-x: auto;
    font-size: 0.85rem;
  }
  pre code.hljs { padding: 0; background: transparent; }
  .other-responses, .other-responses-list { font-size: 0.85rem; color: var(--text-secondary); }
  ${hljsTheme}
`;

const JS = `
  document.querySelectorAll('[data-format-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const format = btn.dataset.formatBtn;
      document.body.dataset.format = format;
      document.querySelectorAll('[data-format-btn]').forEach(b => b.classList.toggle('active', b.dataset.formatBtn === format));
      document.querySelectorAll('[data-format-panel]').forEach(p => { p.hidden = p.dataset.formatPanel !== format; });
    });
  });
`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(spec.info.title)}</title>
  <style>${CSS}</style>
</head>
<body data-format="json">
  <header class="page-header">
    <h1>${esc(spec.info.title)}</h1>
    <p>${esc(spec.info.description || '').split('\n')[0]}</p>
    <p><code>${esc((spec.servers && spec.servers[0] && spec.servers[0].url) || '')}</code></p>
  </header>
  <main>
    ${operationsByTagRendered.map(renderTag).join('\n')}
  </main>
  <script>${JS}</script>
</body>
</html>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, html);
process.stdout.write(`Generated ${OUT_FILE} (${(Buffer.byteLength(html) / 1024).toFixed(1)} KiB).\n`);
