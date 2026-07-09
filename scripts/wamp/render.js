#!/usr/bin/env node
'use strict';

// scripts/wamp/render.js
//
// Emits MkDocs Material markdown for the iFunny WAMP realm into
// docs/reference/chat-types/, using the same schema-IR + JSON/TypeScript/Go
// renderers that generate-docs.js uses for the REST reference. The
// source of truth is wamp/ifunny-wamp.yaml; see scripts/wamp/schema.json
// for the meta-schema.
//
// Layout of the generated output:
//   - docs/reference/chat-types/index.md             - master index
//   - docs/reference/chat-types/<category>.md        - one page per category,
//                                                      containing all procedures
//                                                      and topics with that category.
//
// Routing is determined by the 'category' field in wamp/ifunny-wamp.yaml.
// Each procedure and topic MUST have a category field, or render.js will error.

const fs = require('fs');
const path = require('path');

const { parse } = require('./parse');
const {
  pascalCase,
  slugify,
  tabsBlock,
  tabsBlockWithFields,
  tabsBlockWithFieldsWampList,
  buildSchemaTexts,
  JSON_GO_TAG,
  createSchemaIR,
} = require('../lib/schema-ir');

const WAMP_SPEC_PATH = path.join(__dirname, '..', '..', 'wamp', 'ifunny-wamp.yaml');
const OUT_DIR = path.join(__dirname, '..', '..', 'docs', 'reference', 'api', 'wamp');

const spec = parse(WAMP_SPEC_PATH);
const ir = createSchemaIR(spec);
const { renderSchemaWithDeps, parameterTable, resolveRef } = ir;

// ---------------------------------------------------------------------
// Category bookkeeping
// ---------------------------------------------------------------------

const DEFAULT_TAG_EMOJI = '📁';
function tagEmoji(tag) {
  return (tag && tag.emoji) || DEFAULT_TAG_EMOJI;
}

function collectByCategory() {
  // Build category→metadata map from spec.categories
  const categories = spec.categories || [];
  const categoryMap = new Map();  // category name → category object
  for (const cat of categories) {
    categoryMap.set(cat.name, cat);
  }

  // Group procedures and topics by their category field
  const byFile = new Map();  // category name → { file, category, tags: Set, procedures: [], topics: [] }

  // Collect procedures by category
  for (const p of spec.procedures || []) {
    const category = p.category;
    if (!category) {
      throw new Error(`Procedure ${p.uri} is missing required 'category' field. Valid categories: ${Array.from(categoryMap.keys()).join(', ')}`);
    }
    if (!categoryMap.has(category)) {
      throw new Error(`Procedure ${p.uri} has invalid category '${category}'. Valid categories: ${Array.from(categoryMap.keys()).join(', ')}`);
    }

    if (!byFile.has(category)) {
      byFile.set(category, { file: category, category: categoryMap.get(category), tags: new Set(), procedures: [], topics: [] });
    }
    byFile.get(category).procedures.push(p);

    // Also collect tag for metadata
    const tag = p.tag ? spec.tags?.find(t => t.name === p.tag) : null;
    if (tag) byFile.get(category).tags.add(tag);
  }

  // Collect topics by category
  for (const t of spec.topics || []) {
    const category = t.category;
    if (!category) {
      throw new Error(`Topic ${t.uri} is missing required 'category' field. Valid categories: ${Array.from(categoryMap.keys()).join(', ')}`);
    }
    if (!categoryMap.has(category)) {
      throw new Error(`Topic ${t.uri} has invalid category '${category}'. Valid categories: ${Array.from(categoryMap.keys()).join(', ')}`);
    }

    if (!byFile.has(category)) {
      byFile.set(category, { file: category, category: categoryMap.get(category), tags: new Set(), procedures: [], topics: [] });
    }
    byFile.get(category).topics.push(t);

    // Also collect tag for metadata
    const tag = t.tag ? spec.tags?.find(tag => tag.name === t.tag) : null;
    if (tag) byFile.get(category).tags.add(tag);
  }

  // Convert tags Set to array and filter out empty files
  return Array.from(byFile.values())
    .map(g => ({
      ...g,
      tags: Array.from(g.tags)
    }))
    .filter((g) => g.procedures.length || g.topics.length);
}

// ---------------------------------------------------------------------
// Kwargs / result rendering
//
// Every kwargs block (procedure input, procedure result, topic payload)
// is a JSON Schema in its own right, so we hand it straight to
// renderSchemaWithDeps + buildSchemaTexts. Positional args are
// synthesized into a synthetic "object" schema first so the same
// pipeline can render them.
// ---------------------------------------------------------------------

function positionalArgsToSchema(args, name) {
  return {
    type: 'object',
    description: `Positional args for ${name}, in order.`,
    properties: Object.fromEntries(
      args.map((a) => [a.name, { ...a.schema, description: a.description }])
    ),
    required: args.filter((a) => a.required !== false).map((a) => a.name),
  };
}

function typeTabs(schema, name) {
  const data = renderSchemaWithDeps(schema, name);
  const { jsonText, tsText, goText } = buildSchemaTexts(data, name, JSON_GO_TAG);
  return tabsBlock(jsonText, tsText, goText);
}

function typeTabs_WithFields(schema, name, fieldsTable) {
  const data = renderSchemaWithDeps(schema, name);
  const { jsonText, tsText, goText } = buildSchemaTexts(data, name, JSON_GO_TAG);
  if (fieldsTable) {
    return tabsBlockWithFields(fieldsTable, jsonText, tsText, goText);
  }
  return tabsBlock(jsonText, tsText, goText);
}

// Generate WAMP-list representation: [CALL, <request_id>, {}, uri, positional_args[], kwargs{}]
// For procedures. Uses template placeholders for runtime values.
function wampListForProcedure(procedureUri, args, kwargs) {
  const argsList = args && args.length
    ? args.map((a, i) => `    // [${i}] ${a.name}`).join('\n')
    : '';

  // Build a preview of kwargs with field names from the spec
  let kwargsPreview = '{}';
  if (kwargs && typeof kwargs === 'object' && kwargs.type === 'object' && kwargs.properties && typeof kwargs.properties === 'object') {
    const kvLines = Object.keys(kwargs.properties).map((name) => `      "${name}": …`);
    if (kvLines.length > 0) {
      kwargsPreview = '{\n' + kvLines.join(',\n') + '\n    }';
    }
  } else if (kwargs) {
    kwargsPreview = '{ … }';
  }

  let result = `[CALL, <request_id>, {}, "${procedureUri}",\n  [\n`;
  if (argsList) {
    result += argsList + '\n';
  }
  result += `  ],\n  ${kwargsPreview}\n]`;
  return result;
}

// Generate WAMP-list representation for topics (events)
// For topic events: [EVENT, <subscription_id>, <publication_id>, {}, args[], kwargs{}]
// Shows only the EVENT payload, not the SUBSCRIBED handshake (that's protocol boilerplate).
function wampListForTopic(topicUri, args, kwargs) {
  const argsList = args && args.length
    ? args.map((a, i) => `    // [${i}] ${a.name}`).join('\n')
    : '';

  // Build a preview of kwargs with field names from the spec
  let kwargsPreview = '{}';
  if (kwargs && typeof kwargs === 'object' && kwargs.type === 'object' && kwargs.properties && typeof kwargs.properties === 'object') {
    const kvLines = Object.keys(kwargs.properties).map((name) => `      "${name}": …`);
    if (kvLines.length > 0) {
      kwargsPreview = '{\n' + kvLines.join(',\n') + '\n    }';
    }
  } else if (kwargs) {
    kwargsPreview = '{ … }';
  }

  let result = `[EVENT, <subscription_id>, <publication_id>, {},\n  [\n`;
  if (argsList) {
    result += argsList + '\n';
  }
  result += `  ],\n  ${kwargsPreview}\n]`;
  return result;
}

function typeTabs_WithFieldsWampList(schema, name, fieldsTable, wampListText) {
  const data = renderSchemaWithDeps(schema, name);
  const { jsonText, tsText, goText } = buildSchemaTexts(data, name, JSON_GO_TAG);
  if (fieldsTable && wampListText) {
    return tabsBlockWithFieldsWampList(fieldsTable, wampListText, jsonText, tsText, goText);
  }
  if (fieldsTable) {
    return tabsBlockWithFields(fieldsTable, jsonText, tsText, goText);
  }
  return tabsBlock(jsonText, tsText, goText);
}

// ---------------------------------------------------------------------
// Auth summary
// ---------------------------------------------------------------------

function describeServerAuth(server) {
  if (!server) return 'None';
  if (!server.auth) return 'None';
  const ref = server.auth.$ref;
  if (!ref) return 'inline auth';
  const auth = resolveRef(ref);
  const authId = ref.split('/').pop();
  const bits = [`\`${authId}\` (${auth.type})`];
  if (auth.credential_ref) {
    // WAMP pages live at docs/reference/api/wamp/<file>.md, so credential_ref
    // (authored relative to docs/) needs `../../../` to climb back to docs/.
    bits.push(`credential: [${auth.credential_ref}](../../../${auth.credential_ref})`);
  }
  return bits.join(' — ');
}

function serverForItem(item) {
  const servers = spec.servers || [];
  if (item && item.server) return servers.find((s) => s.name === item.server) || servers[0];
  return servers[0];
}

// ---------------------------------------------------------------------
// Positional-args table
// ---------------------------------------------------------------------

function positionalArgTable(args) {
  if (!args || !args.length) return '';
  const params = args.map((a, i) => ({
    name: `[${i}] ${a.name}`,
    required: a.required !== false,
    schema: a.schema,
    description: a.description,
  }));
  return parameterTable(params);
}

// URI parameters table (bindings for {name} placeholders in a topic URI)
function uriParamTable(params) {
  if (!params || !params.length) return '';
  return parameterTable(
    params.map((p) => ({
      name: p.name,
      required: true,
      schema: p.schema,
      description: p.description,
    }))
  );
}

// Named-fields table for a kwargs object schema. Only rendered if the
// schema is a plain object with declared properties; otherwise the
// combined-type tabs alone tell the story.
function kwargsFieldsTable(schema) {
  if (!schema || schema.type !== 'object' || !schema.properties) return '';
  const props = Object.entries(schema.properties).map(([name, propSchema]) => ({
    name,
    required: (schema.required || []).includes(name),
    schema: propSchema,
    description: propSchema.description,
  }));
  return parameterTable(props);
}

// ---------------------------------------------------------------------
// Procedure / topic rendering
// ---------------------------------------------------------------------

function procedureSlug(p) {
  return p.id || slugify(p.uri);
}

function topicSlug(t) {
  return t.id || slugify(t.uri);
}

function renderProcedure(p) {
  const parts = [];
  const baseName = pascalCase(p.uri.split('.').pop());
  const server = serverForItem(p);
  parts.push(`### ${p.summary}  {: #proc-${procedureSlug(p)} }`);
  parts.push('');
  parts.push(`**\`CALL ${p.uri}\`**`);
  parts.push('');
  if (p.description) {
    parts.push(p.description);
    parts.push('');
  }
  parts.push(`**URL:** \`${server ? server.url : ''}\`  `);
  parts.push(`**Realm:** \`${server ? server.realm : ''}\`  `);
  parts.push(`**Auth:** ${describeServerAuth(server)}`);
  parts.push('');

  if (p.args && p.args.length) {
    parts.push('#### Positional args');
    parts.push('');
    const argsTable = positionalArgTable(p.args);
    const wampList = wampListForProcedure(p.uri, p.args, p.kwargs);
    parts.push(typeTabs_WithFieldsWampList(positionalArgsToSchema(p.args, `${baseName}Args`), `${baseName}Args`, argsTable, wampList));
    parts.push('');
  }

  if (p.kwargs) {
    parts.push('#### Kwargs');
    parts.push('');
    const table = kwargsFieldsTable(p.kwargs);
    const wampList = wampListForProcedure(p.uri, p.args, p.kwargs);
    parts.push(typeTabs_WithFieldsWampList(p.kwargs, `${baseName}Kwargs`, table, wampList));
    parts.push('');
  }

  if (p.result) {
    parts.push('#### Result');
    parts.push('');
    if (p.result.description) {
      parts.push(p.result.description);
      parts.push('');
    }
    if (p.result.args && p.result.args.length) {
      const resultArgsTable = positionalArgTable(p.result.args);
      parts.push(typeTabs_WithFields(positionalArgsToSchema(p.result.args, `${baseName}ResultArgs`), `${baseName}ResultArgs`, resultArgsTable));
      parts.push('');
    }
    if (p.result.kwargs) {
      const table = kwargsFieldsTable(p.result.kwargs);
      parts.push(typeTabs_WithFields(p.result.kwargs, `${baseName}Result`, table));
      parts.push('');
    }
  }

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd();
}

function renderTopic(t) {
  const parts = [];
  const baseName = pascalCase(t.uri.split('.').filter((seg) => !seg.startsWith('{')).pop());
  const server = serverForItem(t);
  parts.push(`### ${t.summary}  {: #topic-${topicSlug(t)} }`);
  parts.push('');
  parts.push(`**\`SUBSCRIBE ${t.uri}\`**`);
  parts.push('');
  if (t.description) {
    parts.push(t.description);
    parts.push('');
  }
  parts.push(`**URL:** \`${server ? server.url : ''}\`  `);
  parts.push(`**Realm:** \`${server ? server.realm : ''}\`  `);
  parts.push(`**Auth:** ${describeServerAuth(server)}`);
  parts.push('');

  if (t.uri_parameters && t.uri_parameters.length) {
    parts.push('#### URI parameters');
    parts.push('');
    parts.push(uriParamTable(t.uri_parameters));
    parts.push('');
  }

  if (t.args && t.args.length) {
    parts.push('#### Event positional args');
    parts.push('');
    const argsTable = positionalArgTable(t.args);
    const wampList = wampListForTopic(t.uri, t.args, t.kwargs);
    parts.push(typeTabs_WithFieldsWampList(positionalArgsToSchema(t.args, `${baseName}EventArgs`), `${baseName}EventArgs`, argsTable, wampList));
    parts.push('');
  }

  if (t.kwargs) {
    parts.push('#### Event kwargs');
    parts.push('');
    const table = kwargsFieldsTable(t.kwargs);
    const wampList = wampListForTopic(t.uri, t.args, t.kwargs);
    parts.push(typeTabs_WithFieldsWampList(t.kwargs, `${baseName}EventKwargs`, table, wampList));
    parts.push('');
  }

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd();
}

// ---------------------------------------------------------------------
// Category page + index
// ---------------------------------------------------------------------

function renderCategoryPage(group) {
  const { file, category, tags, procedures, topics } = group;
  const lines = [];

  // Prefer category-level title/emoji/description when set; the first-tag
  // fallback is only useful for legacy specs that don't declare categories.
  const primaryTag = tags[0] || { name: file };
  const pageTitle = (category && category.title) || primaryTag.name;
  const pageEmoji = (category && category.emoji) || tagEmoji(primaryTag);
  const pageDescription = (category && category.description) || primaryTag.description || '';
  const frontmatterDescription = (pageDescription || `WAMP procedures and topics related to ${pageTitle}`).replace(/\s*\n\s*/g, ' ').trim();

  lines.push('---');
  lines.push(`title: ${pageTitle}`);
  lines.push(`description: ${JSON.stringify(frontmatterDescription)}`);
  lines.push('---');
  lines.push('');
  lines.push(`# ${pageEmoji} ${pageTitle}`);
  lines.push('');
  if (pageDescription) {
    lines.push(pageDescription);
    lines.push('');
  }

  if (procedures.length) {
    lines.push('## Procedures');
    lines.push('');
    for (const p of procedures) {
      lines.push(renderProcedure(p));
      lines.push('');
    }
  }

  if (topics.length) {
    lines.push('## Topics');
    lines.push('');
    for (const t of topics) {
      lines.push(renderTopic(t));
      lines.push('');
    }
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

function renderIndex(groups) {
  const lines = [];
  lines.push('---');
  lines.push('title: WAMP Reference');
  lines.push('description: WAMP procedures and topics, grouped by category.');
  lines.push('---');
  lines.push('');
  lines.push('# 📡 WAMP Reference');
  lines.push('');
  if (spec.info && spec.info.description) {
    lines.push(spec.info.description);
    lines.push('');
  }

  if (spec.servers && spec.servers.length) {
    lines.push('## Servers');
    lines.push('');
    for (const s of spec.servers) {
      lines.push(`- **${s.name || 'default'}** — \`${s.url}\` (realm \`${s.realm}\`)`);
      if (s.subprotocols && s.subprotocols.length) {
        lines.push(`  - Subprotocols: ${s.subprotocols.map((p) => `\`${p}\``).join(', ')}`);
      }
      lines.push(`  - Auth: ${describeServerAuth(s)}`);
    }
    lines.push('');
  }

  for (const g of groups) {
    // Prefer category-level title/emoji/description; fall back to first tag.
    const primaryTag = g.tags[0] || { name: g.file };
    const title = (g.category && g.category.title) || primaryTag.name;
    const emoji = (g.category && g.category.emoji) || tagEmoji(primaryTag);
    const desc = (g.category && g.category.description) || primaryTag.description || '';
    lines.push(`## ${emoji} [${title}](${g.file}.md)`);
    lines.push('');
    if (desc) {
      lines.push(desc);
      lines.push('');
    }
    if (g.procedures.length) {
      lines.push('**Procedures:**');
      lines.push('');
      for (const p of g.procedures) {
        lines.push(`- [\`${p.uri}\`](${g.file}.md#proc-${procedureSlug(p)}) — ${p.summary}`);
      }
      lines.push('');
    }
    if (g.topics.length) {
      lines.push('**Topics:**');
      lines.push('');
      for (const t of g.topics) {
        lines.push(`- [\`${t.uri}\`](${g.file}.md#topic-${topicSlug(t)}) — ${t.summary}`);
      }
      lines.push('');
    }
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

// ---------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------

const groups = collectByCategory();
fs.mkdirSync(OUT_DIR, { recursive: true });
for (const g of groups) {
  fs.writeFileSync(path.join(OUT_DIR, `${g.file}.md`), renderCategoryPage(g));
}
fs.writeFileSync(path.join(OUT_DIR, 'index.md'), renderIndex(groups));
process.stdout.write(`Generated ${groups.length} WAMP files in ${OUT_DIR}.\n`);
