#!/usr/bin/env node
'use strict';

// Generator that emits MkDocs Material markdown into ./docs.
//
// gitbook/openapi/ifunny-api.yaml is the single source of truth for the REST
// API surface. This script reads it and writes one markdown file per tag into
// docs/reference/api/, using MkDocs Material's own idiomatic building blocks
// (headings, parameter tables, pymdownx.tabbed content tabs), plus an
// index.md that links out to each tag page.
//
// Each request/response/query/header schema is rendered self-contained in
// JSON, TypeScript and Go: any named types it transitively references
// (including recursive ones, e.g. Comment <-> Reply) are generated once and
// inlined into that same tab set. The IR + format renderers live in
// scripts/lib/schema-ir.js and are shared with the WAMP generator under
// scripts/wamp/render.js.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const yaml = require('js-yaml');

const {
  pascalCase,
  canonicalHeaderName,
  slugify,
  indent4,
  tabsBlock,
  tabsBlockWithFields,
  buildSchemaTexts,
  JSON_GO_TAG,
  createSchemaIR,
} = require('./lib/schema-ir');

const SPEC_PATH = path.join(__dirname, '..', 'gitbook', 'openapi', 'ifunny-api.yaml');
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const API_REFERENCE_DIR = path.join(DOCS_DIR, 'reference', 'api');
const SNIPPETS_DIR = path.join(DOCS_DIR, '_snippets');
const REDOCLY_BIN = path.join(__dirname, '..', 'node_modules', '.bin', 'redocly');

// The spec is authored as multiple files (gitbook/openapi/ifunny-api.yaml plus
// ./paths/*.yaml and ./schemas/*.yaml, cross-referenced with relative $refs).
// Bundle it into a single document with `redocly bundle` first, so the rest
// of this script can resolve every $ref as a plain in-document JSON pointer.
const bundledYaml = execFileSync(REDOCLY_BIN, ['bundle', SPEC_PATH, '--ext', 'yaml'], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});
const spec = yaml.load(bundledYaml);

const ir = createSchemaIR(spec);
const {
  resolveRef,
  flattenAllOf,
  renderSchemaWithDeps,
  renderParamsSchemaWithDeps,
  parameterTable,
} = ir;

// ---------------------------------------------------------------------------
// Operation extraction
// ---------------------------------------------------------------------------

const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

// Cute per-tag emoji, matching the style used throughout the docs
// (e.g. 🔑 OAuth2, 🫂 Users, 😂 Content). "Chat" gets 📡 rather than 💬,
// since 💬 is already used by the hand-written WAMP protocol pages.
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
// for the per-field body-parameters table.
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
// MkDocs Material markdown rendering
// ---------------------------------------------------------------------------

const BASE_URL = (spec.servers && spec.servers[0] && spec.servers[0].url) || '';

// Struct-tag conventions for the two parameter groups that get their own
// combined type view - mirrors how a hand-written Go client would bind
// query strings vs. HTTP headers, as opposed to the `json:"..."` tags
// used for request/response bodies.
const QUERY_GO_TAG = { tagKey: 'query', tagName: (n) => n };
const HEADER_GO_TAG = { tagKey: 'header', tagName: canonicalHeaderName };

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
  return text ? `${code} ${text}` : String(code);
}

function typeSection(schemaData, name, goTag, fieldsTable) {
  const { jsonText, tsText, goText } = buildSchemaTexts(schemaData, name, goTag);
  if (fieldsTable) {
    return tabsBlockWithFields(fieldsTable, jsonText, tsText, goText);
  }
  return tabsBlock(jsonText, tsText, goText);
}

function responseSection(o, r) {
  const heading = `##### \`${statusLabel(r.code)}\` — ${r.description || 'No description.'}`;
  if (!r.schemaData) {
    return `${heading}\n\nNo response body.`;
  }
  const { jsonText, tsText, goText } = buildSchemaTexts(r.schemaData, `${pascalCase(o.operationId)}${r.code}Response`);
  return `${heading}\n\n${tabsBlock(jsonText, tsText, goText)}`;
}

function renderOperation(o) {
  const parts = [];
  // e.g.  ### `GET /oauth2/token` — Login  {: #op-login }
  parts.push(`### \`${o.method.toUpperCase()} ${o.routePath}\` — ${o.summary}  {: #op-${o.slug} }`);
  parts.push('');
  if (o.description) {
    parts.push(o.description);
    parts.push('');
  }
  parts.push(`**Base URL:** \`${BASE_URL}\`  `);
  parts.push(`**Auth:** ${o.security}`);
  parts.push('');

  if (o.pathParams.length) {
    parts.push('#### Path parameters');
    parts.push('');
    parts.push(parameterTable(o.pathParams.map((p) => ({ ...p, required: true }))));
    parts.push('');
  }
  if (o.queryParams.length) {
    parts.push('#### Query parameters');
    parts.push('');
    const queryTable = parameterTable(o.queryParams);
    parts.push(typeSection(o.querySchemaData, `${pascalCase(o.operationId)}Query`, QUERY_GO_TAG, queryTable));
    parts.push('');
  }
  if (o.headerParams.length) {
    parts.push('#### Headers');
    parts.push('');
    const headerTable = parameterTable(o.headerParams);
    parts.push(typeSection(o.headerSchemaData, `${pascalCase(o.operationId)}Header`, HEADER_GO_TAG, headerTable));
    parts.push('');
  }
  if (o.requestBody) {
    parts.push(`#### Request body (\`${o.requestBody.contentType}\`)`);
    parts.push('');
    const bodyTable = o.requestBody.bodyProps.length ? parameterTable(o.requestBody.bodyProps) : null;
    parts.push(typeSection(o.requestBody.schemaData, `${pascalCase(o.operationId)}Request`, JSON_GO_TAG, bodyTable));
    parts.push('');
  }
  if (o.responses.length) {
    parts.push('#### Responses');
    parts.push('');
    for (const r of o.responses) {
      parts.push(responseSection(o, r));
      parts.push('');
    }
  }
  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd();
}

function renderTagPage(tag) {
  const lines = [];
  const frontmatterDescription = (tag.description || `API methods in relation to ${tag.name}`).replace(/\s*\n\s*/g, ' ').trim();
  lines.push('---');
  lines.push(`title: ${tag.name}`);
  lines.push(`description: ${JSON.stringify(frontmatterDescription)}`);
  lines.push('---');
  lines.push('');
  lines.push(`# ${tagEmoji(tag.name)} ${tag.name}`);
  lines.push('');
  if (tag.description) {
    lines.push(tag.description);
    lines.push('');
  }
  for (const o of tag.operations) {
    lines.push(renderOperation(o));
    lines.push('');
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

function renderApiReferenceIndex(tags) {
  const lines = [];
  lines.push('---');
  lines.push('title: API Reference');
  lines.push('description: REST endpoints, grouped by tag.');
  lines.push('---');
  lines.push('');
  lines.push('# 👾 API Reference');
  lines.push('');
  lines.push('Dive into the specifics of each API endpoint by checking out our complete documentation.');
  lines.push('');
  for (const tag of tags) {
    lines.push(`## ${tagEmoji(tag.name)} [${tag.name}](${tagFile(tag.name)}.md)`);
    lines.push('');
    if (tag.description) {
      lines.push(tag.description);
      lines.push('');
    }
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

fs.mkdirSync(API_REFERENCE_DIR, { recursive: true });
for (const tag of operationsByTagRendered) {
  fs.writeFileSync(path.join(API_REFERENCE_DIR, `${tagFile(tag.name)}.md`), renderTagPage(tag));
}
fs.writeFileSync(path.join(API_REFERENCE_DIR, 'index.md'), renderApiReferenceIndex(operationsByTagRendered));
process.stdout.write(`Generated ${operationsByTagRendered.length} tag pages in ${API_REFERENCE_DIR}.\n`);

// ---------------------------------------------------------------------------
// Snippet emission
//
// For every named component schema, write a self-contained JSON/TS/Go tabs
// block to docs/_snippets/schemas/<name>.md. Narrative pages include these
// via pymdownx.snippets (--8<-- "_snippets/schemas/Foo.md") so the type
// contract stays in one place - the spec - even when it needs to appear
// inline in prose. Operations get analogous request/response fragments.
// ---------------------------------------------------------------------------

const SCHEMA_SNIPPETS_DIR = path.join(SNIPPETS_DIR, 'schemas');
const OPERATION_SNIPPETS_DIR = path.join(SNIPPETS_DIR, 'operations');

// Wipe and recreate to catch renames/deletions - snippet files are 100%
// generated and never hand-edited, so this is safe.
fs.rmSync(SNIPPETS_DIR, { recursive: true, force: true });
fs.mkdirSync(SCHEMA_SNIPPETS_DIR, { recursive: true });
fs.mkdirSync(OPERATION_SNIPPETS_DIR, { recursive: true });

function snippetTrio(schema, name) {
  const data = renderSchemaWithDeps(schema, name);
  const { jsonText, tsText, goText } = buildSchemaTexts(data, name, JSON_GO_TAG);
  return tabsBlock(jsonText, tsText, goText) + '\n';
}

const schemaSnippetsWritten = [];
for (const [name, schema] of Object.entries(spec.components?.schemas || {})) {
  const out = snippetTrio(schema, name);
  fs.writeFileSync(path.join(SCHEMA_SNIPPETS_DIR, `${name}.md`), out);
  schemaSnippetsWritten.push(name);
}
process.stdout.write(`Generated ${schemaSnippetsWritten.length} schema snippets in ${SCHEMA_SNIPPETS_DIR}.\n`);

let operationSnippetsWritten = 0;
for (const tag of operationsByTagRendered) {
  for (const o of tag.operations) {
    if (!o.operationId) continue;
    const opDir = path.join(OPERATION_SNIPPETS_DIR, o.operationId);
    fs.mkdirSync(opDir, { recursive: true });
    if (o.requestBody) {
      const name = `${pascalCase(o.operationId)}Request`;
      const { jsonText, tsText, goText } = buildSchemaTexts(o.requestBody.schemaData, name, JSON_GO_TAG);
      fs.writeFileSync(path.join(opDir, 'request.md'), tabsBlock(jsonText, tsText, goText) + '\n');
      operationSnippetsWritten++;
    }
    for (const r of o.responses) {
      if (!r.schemaData) continue;
      const name = `${pascalCase(o.operationId)}${r.code}Response`;
      const { jsonText, tsText, goText } = buildSchemaTexts(r.schemaData, name, JSON_GO_TAG);
      fs.writeFileSync(path.join(opDir, `response-${r.code}.md`), tabsBlock(jsonText, tsText, goText) + '\n');
      operationSnippetsWritten++;
    }
  }
}
process.stdout.write(`Generated ${operationSnippetsWritten} operation snippets in ${OPERATION_SNIPPETS_DIR}.\n`);
