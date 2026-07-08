#!/usr/bin/env node
'use strict';

// scripts/wamp/render.js
//
// Emits MkDocs Material markdown for the iFunny WAMP realm into
// docs/reference/wamp/, using the same schema-IR + JSON/TypeScript/Go
// renderers that generate-docs.js uses for the REST reference. The
// source of truth is wamp/ifunny-wamp.yaml; see scripts/wamp/schema.json
// for the meta-schema.
//
// Layout of the generated output mirrors the REST layout:
//   - docs/reference/wamp/index.md          - tag index
//   - docs/reference/wamp/<tag>.md          - one page per tag,
//                                             containing all procedures
//                                             and topics with that tag.

const fs = require('fs');
const path = require('path');

const { parse } = require('./parse');
const {
  pascalCase,
  slugify,
  tabsBlock,
  tabsBlockWithFields,
  buildSchemaTexts,
  JSON_GO_TAG,
  createSchemaIR,
} = require('../lib/schema-ir');

const WAMP_SPEC_PATH = path.join(__dirname, '..', '..', 'wamp', 'ifunny-wamp.yaml');
const OUT_DIR = path.join(__dirname, '..', '..', 'docs', 'reference', 'chat-types');

// Map tags to output file names (allows consolidation)
const TAG_ROUTING = {
  'channels': 'chats-dms',     // procedures: 7; topics: 1
  'messages': 'chats-dms',     // procedures: 1; topics: 1 → same file as channels
  'subscriptions': 'subscriptions-events',  // topics only: 3 topics
  'invites': 'wamp',           // procedures: 3; topics: 0 (topic moved to subscriptions)
  'moderation': 'wamp',        // procedures: 1; topics: 0 → same file as invites
};

const spec = parse(WAMP_SPEC_PATH);
const ir = createSchemaIR(spec);
const { renderSchemaWithDeps, parameterTable, resolveRef } = ir;

// ---------------------------------------------------------------------
// Tag bookkeeping
// ---------------------------------------------------------------------

const DEFAULT_TAG_EMOJI = '📁';
function tagEmoji(tag) {
  return (tag && tag.emoji) || DEFAULT_TAG_EMOJI;
}

function collectByTag() {
  // Group procedures and topics by their routed filename
  const byFile = new Map();  // filename → { file, tags: Set, procedures: [], topics: [] }

  // Initialize map with tags and their filenames
  for (const t of spec.tags || []) {
    const filename = TAG_ROUTING[t.name] || slugify(t.name);
    if (!byFile.has(filename)) {
      byFile.set(filename, { file: filename, tags: new Set(), procedures: [], topics: [] });
    }
    byFile.get(filename).tags.add(t);
  }

  // Collect procedures by routed filename
  for (const p of spec.procedures || []) {
    const tag = p.tag || 'other';
    const filename = TAG_ROUTING[tag] || slugify(tag);
    if (!byFile.has(filename)) {
      byFile.set(filename, { file: filename, tags: new Set(), procedures: [], topics: [] });
    }
    byFile.get(filename).procedures.push(p);
  }

  // Collect topics by routed filename
  for (const t of spec.topics || []) {
    const tag = t.tag || 'other';
    const filename = TAG_ROUTING[tag] || slugify(tag);
    if (!byFile.has(filename)) {
      byFile.set(filename, { file: filename, tags: new Set(), procedures: [], topics: [] });
    }
    byFile.get(filename).topics.push(t);
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
    // Tag pages live at docs/reference/wamp/<file>.md, so credential_ref
    // (authored relative to docs/) needs `../../` to climb back to docs/.
    bits.push(`credential: [${auth.credential_ref}](../../${auth.credential_ref})`);
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
  parts.push(`### CALL \`${p.uri}\` — ${p.summary}  {: #proc-${procedureSlug(p)} }`);
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
    parts.push(typeTabs_WithFields(positionalArgsToSchema(p.args, `${baseName}Args`), `${baseName}Args`, argsTable));
    parts.push('');
  }

  if (p.kwargs) {
    parts.push('#### Kwargs');
    parts.push('');
    const table = kwargsFieldsTable(p.kwargs);
    parts.push(typeTabs_WithFields(p.kwargs, `${baseName}Kwargs`, table));
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
  parts.push(`### SUBSCRIBE \`${t.uri}\` — ${t.summary}  {: #topic-${topicSlug(t)} }`);
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
    parts.push(typeTabs_WithFields(positionalArgsToSchema(t.args, `${baseName}EventArgs`), `${baseName}EventArgs`, argsTable));
    parts.push('');
  }

  if (t.kwargs) {
    parts.push('#### Event kwargs');
    parts.push('');
    const table = kwargsFieldsTable(t.kwargs);
    parts.push(typeTabs_WithFields(t.kwargs, `${baseName}EventKwargs`, table));
    parts.push('');
  }

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd();
}

// ---------------------------------------------------------------------
// Tag page + index
// ---------------------------------------------------------------------

function renderTagPage(group) {
  const { file, tags, procedures, topics } = group;
  const lines = [];

  // Use the first tag for the page heading and metadata (if multiple tags in one file)
  const primaryTag = tags[0] || { name: file };
  const frontmatterDescription = (primaryTag.description || `WAMP procedures and topics related to ${primaryTag.name}`).replace(/\s*\n\s*/g, ' ').trim();

  lines.push('---');
  lines.push(`title: ${primaryTag.name}`);
  lines.push(`description: ${JSON.stringify(frontmatterDescription)}`);
  lines.push('---');
  lines.push('');
  lines.push(`# ${tagEmoji(primaryTag)} ${primaryTag.name}`);
  lines.push('');
  if (primaryTag.description) {
    lines.push(primaryTag.description);
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
  lines.push('description: WAMP procedures and topics, grouped by tag.');
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
    // Use first tag for heading and link, or fall back to file name
    const primaryTag = g.tags[0] || { name: g.file };
    lines.push(`## ${tagEmoji(primaryTag)} [${primaryTag.name}](${g.file}.md)`);
    lines.push('');
    if (primaryTag.description) {
      lines.push(primaryTag.description);
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

const groups = collectByTag();
fs.mkdirSync(OUT_DIR, { recursive: true });
for (const g of groups) {
  fs.writeFileSync(path.join(OUT_DIR, `${g.file}.md`), renderTagPage(g));
}
fs.writeFileSync(path.join(OUT_DIR, 'index.md'), renderIndex(groups));
process.stdout.write(`Generated ${groups.length} WAMP files in ${OUT_DIR}.\n`);
