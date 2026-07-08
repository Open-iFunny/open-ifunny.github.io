'use strict';

// scripts/wamp/parse.js
//
// Loads a wamp-spec YAML document, resolves intra-document $refs against
// #/components/*, and runs a hand-rolled shape check with error messages
// tailored to the format. The spec-level meta-schema lives in
// scripts/wamp/schema.json for documentation and IDE tooling; this
// validator enforces the same constraints without pulling in Ajv (which
// would force a yarn-offline-mirror hash rebump every time we touched a
// transitive).

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// ---------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------

function loadYaml(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  return yaml.load(text, { filename: filePath });
}

// ---------------------------------------------------------------------
// $ref resolution
//
// Only intra-document pointers of the form "#/a/b/c" are supported. We
// walk every value in the document; on encountering `{ $ref: "..." }`
// we in-place replace the object with a deep clone of the target so
// downstream code can treat it as a normal inline definition.
// ---------------------------------------------------------------------

function resolvePointer(root, pointer) {
  if (!pointer.startsWith('#/')) {
    throw new Error(`Only local pointers are supported (got: ${pointer})`);
  }
  const parts = pointer
    .slice(2)
    .split('/')
    .map((p) => p.replace(/~1/g, '/').replace(/~0/g, '~'));
  let node = root;
  for (const part of parts) {
    if (node === null || typeof node !== 'object' || !(part in node)) {
      throw new Error(`Broken $ref: ${pointer} (missing segment "${part}")`);
    }
    node = node[part];
  }
  return node;
}

function clone(value) {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(clone);
  const out = {};
  for (const k of Object.keys(value)) out[k] = clone(value[k]);
  return out;
}

// Some $refs are semantic anchors we want to KEEP (e.g. the auth pointer
// on a server; we want to know it's the ticket auth, not just its
// inlined body). Predicate: if the parent path ends in one of these
// keys, leave the ref intact.
const KEEP_REF_AT = new Set([
  'servers.*.auth',
  'procedures.*.errors.*',
]);

function pathKey(pathStack) {
  return pathStack
    .map((s) => (typeof s === 'number' ? '*' : s))
    .join('.');
}

function resolveRefs(root) {
  function walk(node, pathStack) {
    if (node === null || typeof node !== 'object') return node;
    if (Array.isArray(node)) {
      return node.map((child, i) => walk(child, [...pathStack, i]));
    }
    if (typeof node.$ref === 'string' && !KEEP_REF_AT.has(pathKey(pathStack))) {
      const target = resolvePointer(root, node.$ref);
      const inlined = clone(target);
      // If the $ref sits alongside sibling keys (JSON Schema allows
      // this), fold them in as overrides on the inlined target.
      for (const k of Object.keys(node)) {
        if (k === '$ref') continue;
        inlined[k] = walk(node[k], [...pathStack, k]);
      }
      return walk(inlined, pathStack);
    }
    const out = {};
    for (const k of Object.keys(node)) {
      out[k] = walk(node[k], [...pathStack, k]);
    }
    return out;
  }
  return walk(root, []);
}

// ---------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------

function required(errors, node, keys, where) {
  for (const key of keys) {
    if (node[key] === undefined || node[key] === null) {
      errors.push(`${where}: missing required field "${key}"`);
    }
  }
}

function assertString(errors, value, where) {
  if (typeof value !== 'string') {
    errors.push(`${where}: expected string, got ${typeof value}`);
  }
}

function assertArray(errors, value, where) {
  if (!Array.isArray(value)) {
    errors.push(`${where}: expected array, got ${typeof value}`);
  }
}

function assertObject(errors, value, where) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    errors.push(`${where}: expected object, got ${Array.isArray(value) ? 'array' : typeof value}`);
  }
}

function validateUriTemplate(errors, uri, uriParameters, where) {
  const placeholders = [...uri.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
  const declared = new Set((uriParameters || []).map((p) => p.name));
  for (const name of placeholders) {
    if (!declared.has(name)) {
      errors.push(`${where}: URI has {${name}} placeholder but no matching uri_parameters entry`);
    }
  }
  for (const p of uriParameters || []) {
    if (!placeholders.includes(p.name)) {
      errors.push(`${where}: uri_parameters[${p.name}] declared but URI has no {${p.name}} placeholder`);
    }
  }
}

function validate(doc) {
  const errors = [];

  required(errors, doc, ['wampspec', 'info', 'servers'], 'root');
  if (doc.wampspec !== '1.0') {
    errors.push(`root.wampspec: expected "1.0", got ${JSON.stringify(doc.wampspec)}`);
  }

  if (doc.info) {
    assertObject(errors, doc.info, 'info');
    required(errors, doc.info || {}, ['title', 'version'], 'info');
  }

  if (doc.servers) {
    assertArray(errors, doc.servers, 'servers');
    (doc.servers || []).forEach((s, i) => {
      const where = `servers[${i}]`;
      required(errors, s, ['url', 'realm'], where);
      if (s.url) assertString(errors, s.url, `${where}.url`);
      if (s.realm) assertString(errors, s.realm, `${where}.realm`);
    });
  }

  const tagNames = new Set((doc.tags || []).map((t) => t.name));
  const serverNames = new Set((doc.servers || []).map((s) => s.name).filter(Boolean));

  (doc.procedures || []).forEach((p, i) => {
    const where = `procedures[${i}] (${p.uri || '?'})`;
    required(errors, p, ['uri', 'summary'], where);
    if (p.tag && !tagNames.has(p.tag)) {
      errors.push(`${where}: tag "${p.tag}" not declared in root.tags`);
    }
    if (p.server && !serverNames.has(p.server)) {
      errors.push(`${where}: server "${p.server}" not declared in root.servers`);
    }
    if (p.args) assertArray(errors, p.args, `${where}.args`);
    if (p.kwargs) assertObject(errors, p.kwargs, `${where}.kwargs`);
  });

  (doc.topics || []).forEach((t, i) => {
    const where = `topics[${i}] (${t.uri || '?'})`;
    required(errors, t, ['uri', 'summary'], where);
    if (t.tag && !tagNames.has(t.tag)) {
      errors.push(`${where}: tag "${t.tag}" not declared in root.tags`);
    }
    if (t.uri) validateUriTemplate(errors, t.uri, t.uri_parameters, where);
  });

  return errors;
}

// ---------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------

function parse(filePath) {
  const raw = loadYaml(filePath);
  const resolved = resolveRefs(raw);
  const errors = validate(resolved);
  if (errors.length) {
    const msg = ['WAMP-Spec validation failed:', ...errors.map((e) => `  - ${e}`)].join('\n');
    throw new Error(msg);
  }
  return resolved;
}

module.exports = { parse, loadYaml, resolveRefs, validate };

// Allow `node scripts/wamp/parse.js path/to/spec.yaml` for smoke testing.
if (require.main === module) {
  const target = process.argv[2] || path.join(__dirname, '..', '..', 'wamp', 'ifunny-wamp.yaml');
  const doc = parse(target);
  process.stdout.write(`OK: ${doc.procedures?.length ?? 0} procedures, ${doc.topics?.length ?? 0} topics.\n`);
}
