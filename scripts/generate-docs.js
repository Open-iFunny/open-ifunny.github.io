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

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SPEC_PATH = path.join(__dirname, '..', 'gitbook', 'openapi', 'ifunny-api.yaml');
const OUT_DIR = path.join(__dirname, '..', '_site');
const OUT_FILE = path.join(OUT_DIR, 'index.html');

const spec = yaml.load(fs.readFileSync(SPEC_PATH, 'utf8'));

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

// ---------------------------------------------------------------------------
// Named-type registry: every schema we render gets a name (either its
// component name, or a synthesized name for an anonymous nested object) and
// is generated exactly once. This is what lets TypeScript/Go output use
// real named types/structs instead of infinitely inlining recursive schemas
// (e.g. Comment <-> Reply).
// ---------------------------------------------------------------------------

const registry = new Map(); // name -> raw schema
const queue = [];

function registerNamed(name, schema) {
  if (!registry.has(name)) {
    registry.set(name, schema);
    queue.push(name);
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
function resolveNode(schema, namePath) {
  if (!schema) return { kind: 'any' };
  if (schema.$ref) {
    const name = refName(schema.$ref);
    registerNamed(name, resolveRef(schema.$ref));
    return { kind: 'ref', name };
  }
  if (schema.allOf) return resolveNode(flattenAllOf(schema), namePath);
  if (schema.oneOf) {
    return {
      kind: 'oneOf',
      variants: schema.oneOf.map((v, i) => resolveVariant(v, namePath, i)),
    };
  }
  const type = schema.type || (schema.properties ? 'object' : undefined);
  if (type === 'array') {
    return { kind: 'array', items: resolveNode(schema.items || {}, `${namePath}Item`) };
  }
  if (type === 'object' || schema.properties) {
    if (!schema.properties || Object.keys(schema.properties).length === 0) return { kind: 'any' };
    registerNamed(namePath, schema);
    return { kind: 'ref', name: namePath };
  }
  return { kind: type || 'any', enum: schema.enum, const: schema.const };
}

function resolveVariant(v, namePath, i) {
  if (v.$ref) {
    const name = refName(v.$ref);
    registerNamed(name, resolveRef(v.$ref));
    return { kind: 'ref', name };
  }
  const name = v.title ? pascalCase(v.title) : `${namePath}Variant${i + 1}`;
  registerNamed(name, v);
  return { kind: 'ref', name };
}

// Build the IR body for a schema that already has a name (component schema
// or a synthesized nested-object name). Handles object/array/primitive/enum.
function buildNamedTypeIR(schema, selfName) {
  const flat = schema.allOf ? flattenAllOf(schema) : schema;
  const type = flat.type || (flat.properties ? 'object' : undefined);
  if (type === 'object' || flat.properties) {
    const props = Object.entries(flat.properties || {}).map(([propName, propSchema]) => ({
      name: propName,
      required: (flat.required || []).includes(propName),
      node: resolveNode(propSchema, selfName + pascalCase(propName)),
      description: propSchema.description,
    }));
    return { kind: 'object', properties: props, description: flat.description };
  }
  if (type === 'array') {
    return { kind: 'array', items: resolveNode(flat.items || {}, `${selfName}Item`), description: flat.description };
  }
  return { kind: type || 'string', enum: flat.enum, const: flat.const, description: flat.description };
}

// Top-level entry point for a request body / response schema. Behaves like
// resolveNode, except a bare object at the root is rendered inline (it's
// only used once, so it doesn't need its own name/appendix entry).
function renderTopLevelIR(schema, baseName) {
  if (!schema) return { kind: 'any' };
  if (schema.$ref) {
    const name = refName(schema.$ref);
    registerNamed(name, resolveRef(schema.$ref));
    return { kind: 'ref', name };
  }
  if (schema.allOf) return renderTopLevelIR(flattenAllOf(schema), baseName);
  if (schema.oneOf) {
    return { kind: 'oneOf', variants: schema.oneOf.map((v, i) => resolveVariant(v, baseName, i)) };
  }
  const type = schema.type || (schema.properties ? 'object' : undefined);
  if (type === 'array') {
    return { kind: 'array', items: renderTopLevelIR(schema.items || {}, `${baseName}Item`) };
  }
  if (type === 'object' || schema.properties) {
    return buildNamedTypeIR(schema, baseName);
  }
  return { kind: type || 'any', enum: schema.enum, const: schema.const };
}

// ---------------------------------------------------------------------------
// Format renderers: JSON (pseudo-schema), TypeScript, Go
// ---------------------------------------------------------------------------

function esc(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
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
  const body = renderJSONBody(ir, 0);
  return `// ${name}\n${body}`;
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

function goType(node) {
  switch (node.kind) {
    case 'ref':
      return node.name;
    case 'array':
      return `[]${goType(node.items)}`;
    case 'oneOf':
      return node.variants.map(goType).join(' /* or */ ');
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

function goFieldType(p) {
  const base = goType(p.node);
  const scalar = ['string', 'integer', 'number', 'boolean'].includes(p.node.kind);
  return !p.required && scalar ? `*${base}` : base;
}

function renderGo(name, ir) {
  if (ir.kind !== 'object') {
    return `type ${name} ${goType(ir)}`;
  }
  const lines = ir.properties.map((p) => {
    const tag = `\`json:"${p.name}${p.required ? '' : ',omitempty'}"\``;
    return `\t${pascalCase(p.name) || 'Field'} ${goFieldType(p)} ${tag}`;
  });
  return `type ${name} struct {\n${lines.join('\n')}\n}`;
}

// ---------------------------------------------------------------------------
// Operation extraction
// ---------------------------------------------------------------------------

const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

function collectOperationsByTag() {
  const tagOrder = (spec.tags || []).map((t) => t.name);
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

  let requestBody = null;
  if (op.requestBody) {
    const contentTypes = Object.keys(op.requestBody.content || {});
    const ct = contentTypes[0];
    if (ct) {
      const schema = op.requestBody.content[ct].schema;
      requestBody = {
        contentType: ct,
        required: !!op.requestBody.required,
        ir: renderTopLevelIR(schema, `${baseName}Request`),
      };
    }
  }

  const responseEntries = Object.entries(op.responses || {});
  let primaryResponse = null;
  const otherResponses = [];
  for (const [code, respRaw] of responseEntries) {
    const resp = respRaw.$ref ? resolveRef(respRaw.$ref) : respRaw;
    const contentTypes = Object.keys(resp.content || {});
    const ct = contentTypes[0];
    const isSuccess = /^2\d\d$/.test(code);
    if (ct) {
      const ir = renderTopLevelIR(resp.content[ct].schema, `${baseName}${code}`);
      if (isSuccess && !primaryResponse) {
        primaryResponse = { code, description: resp.description, contentType: ct, ir };
        continue;
      }
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

// Drain the queue to generate every named type reachable from the above.
const generatedTypes = [];
const seen = new Set();
while (queue.length) {
  const name = queue.shift();
  if (seen.has(name)) continue;
  seen.add(name);
  const schema = registry.get(name);
  const ir = buildNamedTypeIR(schema, name);
  generatedTypes.push({ name, ir, description: schema.description });
}
generatedTypes.sort((a, b) => a.name.localeCompare(b.name));

// ---------------------------------------------------------------------------
// HTML rendering
// ---------------------------------------------------------------------------

function methodBadge(method) {
  return `<span class="method method-${method}">${method.toUpperCase()}</span>`;
}

function formatTabs(idPrefix) {
  return `
    <div class="format-tabs">
      <button type="button" class="format-btn active" data-format-btn="json">JSON</button>
      <button type="button" class="format-btn" data-format-btn="ts">TypeScript</button>
      <button type="button" class="format-btn" data-format-btn="go">Go</button>
    </div>`;
}

function schemaBlock(label, name, ir) {
  return `
    <h4>${esc(label)}</h4>
    <pre data-format-panel="json">${esc(renderJSON(name, ir))}</pre>
    <pre data-format-panel="ts" hidden>${esc(renderTS(name, ir))}</pre>
    <pre data-format-panel="go" hidden>${esc(renderGo(name, ir))}</pre>`;
}

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
        ${o.requestBody ? schemaBlock(`Request Body (${o.requestBody.contentType})`, `${pascalCase(o.operationId)}Request`, o.requestBody.ir) : ''}
        ${o.primaryResponse ? schemaBlock(`Response ${o.primaryResponse.code} — ${o.primaryResponse.description || ''}`, `${pascalCase(o.operationId)}Response`, o.primaryResponse.ir) : ''}
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

function renderAppendix() {
  const entries = generatedTypes
    .map(
      (t) => `
      <div class="type-def" id="type-${esc(t.name)}">
        <h3>${esc(t.name)}</h3>
        ${t.description ? `<p>${esc(t.description)}</p>` : ''}
        <pre data-format-panel="json">${esc(renderJSON(t.name, t.ir))}</pre>
        <pre data-format-panel="ts" hidden>${esc(renderTS(t.name, t.ir))}</pre>
        <pre data-format-panel="go" hidden>${esc(renderGo(t.name, t.ir))}</pre>
      </div>`
    )
    .join('\n');
  return `
    <section class="scope schema-appendix">
      <h2>Schema Reference</h2>
      <p class="scope-description">Every named schema referenced above, in full.</p>
      ${entries}
    </section>`;
}

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
  h3 { color: var(--accent); }
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
  .other-responses, .other-responses-list { font-size: 0.85rem; color: var(--text-secondary); }
  .schema-appendix .type-def { margin: 1.5rem 0; }
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
    ${renderAppendix()}
  </main>
  <script>${JS}</script>
</body>
</html>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, html);
process.stdout.write(`Generated ${OUT_FILE} (${(Buffer.byteLength(html) / 1024).toFixed(1)} KiB), ${generatedTypes.length} named types.\n`);
