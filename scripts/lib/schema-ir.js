'use strict';

// scripts/lib/schema-ir.js
//
// Shared schema IR + JSON/TypeScript/Go format renderers, plus the
// MkDocs Material markdown helpers (tabs block, parameter tables). Bound
// to a specific spec via createSchemaIR(spec) so both the OpenAPI
// generator (scripts/generate-docs.js) and the WAMP generator
// (scripts/wamp/render.js) can share one implementation while resolving
// their own #/components/schemas namespaces.
//
// The `spec` argument only needs a #/components/schemas branch reachable
// via JSON-Pointer $refs; it does NOT need to be a valid OpenAPI or
// WAMP-Spec document at the top level.

// ---------------------------------------------------------------------
// Pure string helpers (spec-independent)
// ---------------------------------------------------------------------

function pascalCase(s) {
  return String(s)
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

function refName(ref) {
  return ref.split('/').pop();
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function tableCell(s) {
  return String(s == null ? '' : s)
    .replace(/\r?\n+/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();
}

// pymdownx.tabbed requires tab content (including fenced code blocks
// nested inside a tab) to be indented by 4 spaces relative to the
// `=== "..."` line; this helper is what makes that reliable regardless
// of what the code text itself contains.
function indent4(text) {
  return text
    .split('\n')
    .map((line) => (line.length ? `    ${line}` : ''))
    .join('\n');
}

// Nested pymdownx.tabbed content-tabs wrapping our self-contained
// JSON/TypeScript/Go rendering of one schema.
function tabsBlock(jsonText, tsText, goText) {
  const jsonBlock = indent4(['```json', jsonText, '```'].join('\n'));
  const tsBlock = indent4(['```typescript', tsText, '```'].join('\n'));
  const goBlock = indent4(['```go', goText, '```'].join('\n'));
  return [
    '=== "JSON"',
    '',
    jsonBlock,
    '',
    '=== "TypeScript"',
    '',
    tsBlock,
    '',
    '=== "Go"',
    '',
    goBlock,
  ].join('\n');
}

// Tabbed group with a "Fields" tab containing a markdown table, followed by
// JSON/TypeScript/Go tabs. Used to merge parameter tables with type definitions
// in a single tabbed interface.
function tabsBlockWithFields(fieldsTableMarkdown, jsonText, tsText, goText) {
  const fieldsBlock = indent4(fieldsTableMarkdown);
  const jsonBlock = indent4(['```json', jsonText, '```'].join('\n'));
  const tsBlock = indent4(['```typescript', tsText, '```'].join('\n'));
  const goBlock = indent4(['```go', goText, '```'].join('\n'));
  return [
    '=== "Fields"',
    '',
    fieldsBlock,
    '',
    '=== "JSON"',
    '',
    jsonBlock,
    '',
    '=== "TypeScript"',
    '',
    tsBlock,
    '',
    '=== "Go"',
    '',
    goBlock,
  ].join('\n');
}

// ---------------------------------------------------------------------
// Format renderers: JSON pseudo-schema, TypeScript, Go
// (spec-independent - operate on IR only)
// ---------------------------------------------------------------------

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

function isIntEnumIR(ir) {
  return !!ir && ir.kind === 'integer' && Array.isArray(ir.enum) && ir.enum.length > 0 && ir.const === undefined;
}

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

function isSequential(values) {
  return values.every((v, i) => v === values[0] + i);
}

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

function buildSchemaTexts(schemaData, name, goTag) {
  goTag = goTag || JSON_GO_TAG;
  const { topIR, nested } = schemaData;
  const jsonText = [renderJSON(name, topIR), ...nested.map((n) => renderJSON(n.name, n.ir))].join('\n\n');
  const tsText = [renderTS(name, topIR), ...nested.map((n) => renderTS(n.name, n.ir))].join('\n\n');

  const goCtx = { refKindOverride: new Map(), enumBlocks: new Map() };
  const allEntries = [{ name, ir: topIR }, ...nested];

  const enumNames = new Set();
  for (const entry of allEntries) {
    if (isIntEnumIR(entry.ir)) {
      const { kindName, code } = buildGoEnum(entry.name, entry.ir.enum, entry.ir.description);
      goCtx.refKindOverride.set(entry.name, kindName);
      goCtx.enumBlocks.set(kindName, code);
      enumNames.add(entry.name);
    }
  }

  const goParts = allEntries.filter((e) => !enumNames.has(e.name)).map((e) => renderGo(e.name, e.ir, goCtx, goTag));
  goParts.push(...goCtx.enumBlocks.values());
  const goText = goParts.join('\n\n');

  return { jsonText, tsText, goText };
}

// ---------------------------------------------------------------------
// Spec-bound helpers
//
// createSchemaIR(spec) returns closures around resolveRef so the IR
// layer can dereference #/components/schemas/Foo without importing a
// module-scope `spec`.
// ---------------------------------------------------------------------

function createSchemaIR(spec) {
  function resolveRef(ref) {
    const parts = ref.replace(/^#\//, '').split('/');
    let node = spec;
    for (const p of parts) node = node[p];
    if (!node) throw new Error(`Unresolved $ref: ${ref}`);
    return node;
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

  function registerNamed(ctx, name, schema) {
    if (!ctx.registry.has(name)) {
      ctx.registry.set(name, schema);
      ctx.queue.push(name);
    }
    return name;
  }

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

  function renderSchemaWithDeps(schema, baseName) {
    const ctx = { registry: new Map(), queue: [] };
    const topIR = renderTopLevelIR(ctx, schema, baseName);
    return { topIR, nested: drainQueue(ctx) };
  }

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

  // ---- Markdown-parameter-table helpers, also spec-bound because they
  //      have to dereference to compute the paramType/enum label. ----

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

  function paramDescription(schema, description) {
    const resolved = schema && schema.$ref ? resolveRef(schema.$ref) : schema;
    const flat = resolved && resolved.allOf ? flattenAllOf(resolved) : resolved;
    const parts = [];
    if (description) parts.push(description);
    if (flat && Array.isArray(flat.enum) && flat.enum.length) parts.push(`One of: ${flat.enum.join(', ')}`);
    return parts.join(' — ');
  }

  function parameterTable(params) {
    if (!params.length) return '';
    const rows = params.map((p) => {
      const name = `\`${p.name}\``;
      const type = `\`${paramType(p.schema)}\``;
      const req = p.required ? 'yes' : 'no';
      const desc = tableCell(paramDescription(p.schema, p.description));
      return `| ${name} | ${type} | ${req} | ${desc} |`;
    });
    return ['| Name | Type | Required | Description |', '| ---- | ---- | -------- | ----------- |', ...rows].join('\n');
  }

  return {
    resolveRef,
    flattenAllOf,
    resolveNode,
    buildNamedTypeIR,
    renderTopLevelIR,
    drainQueue,
    renderSchemaWithDeps,
    renderParamsSchemaWithDeps,
    paramType,
    paramDescription,
    parameterTable,
  };
}

module.exports = {
  // Pure helpers
  pascalCase,
  lowerFirst,
  pascalToSnakeUpper,
  labelToSnakeUpper,
  canonicalHeaderName,
  refName,
  slugify,
  tableCell,
  indent4,
  tabsBlock,
  tabsBlockWithFields,
  // Format renderers
  jsonType,
  renderJSON,
  tsType,
  renderTS,
  goType,
  renderGo,
  buildSchemaTexts,
  JSON_GO_TAG,
  isIntEnumIR,
  buildGoEnum,
  // Factory
  createSchemaIR,
};
