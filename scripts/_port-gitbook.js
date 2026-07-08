#!/usr/bin/env node
'use strict';

// One-shot porter: reads hand-written GitBook markdown from gitbook/ and
// writes MkDocs Material equivalents into docs/. Not wired into the build;
// invoke manually: `node scripts/_port-gitbook.js`. Delete after the
// migration lands.

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const SRC = path.join(REPO, 'gitbook');
const DST = path.join(REPO, 'docs');

// GitBook hint style -> Material admonition kind. GitBook has: info,
// warning, danger, success. Material admonitions of those names all render
// as expected.
const HINT_MAP = { info: 'note', warning: 'warning', danger: 'danger', success: 'success' };

function indent4(text) {
  return text
    .split('\n')
    .map((l) => (l.length ? `    ${l}` : ''))
    .join('\n');
}

function stripYamlFrontmatter(md) {
  // Preserve frontmatter but drop the GitBook `description:` since MkDocs
  // uses page_title / meta.description differently. Keep it as-is - Material
  // ignores unknown frontmatter, so no harm.
  return md;
}

function translate(md) {
  let s = md;

  // {% hint style="X" %} ... {% endhint %}
  s = s.replace(/\{%\s*hint\s+style="(\w+)"\s*%\}\s*([\s\S]*?)\s*\{%\s*endhint\s*%\}/g, (_, style, body) => {
    const kind = HINT_MAP[style] || 'note';
    return `!!! ${kind}\n${indent4(body.trim())}`;
  });

  // {% tabs %} ... {% endtabs %} (may contain multiple {% tab title="..." %})
  s = s.replace(/\{%\s*tabs\s*%\}([\s\S]*?)\{%\s*endtabs\s*%\}/g, (_, inner) => {
    const tabs = [];
    const re = /\{%\s*tab\s+title="([^"]+)"\s*%\}([\s\S]*?)\{%\s*endtab\s*%\}/g;
    let m;
    while ((m = re.exec(inner))) {
      const title = m[1];
      const body = m[2].trim();
      tabs.push(`=== "${title}"\n\n${indent4(body)}`);
    }
    return tabs.join('\n\n');
  });

  // {% code title="X" %} ```lang ... ``` {% endcode %} - preserve the inner
  // fenced block, drop the wrapper. GitBook's title becomes a comment we
  // just discard; Material has no exact equivalent.
  s = s.replace(/\{%\s*code[^%]*%\}\s*([\s\S]*?)\s*\{%\s*endcode\s*%\}/g, (_, body) => body.trim());

  // {% content-ref url="X" %} [label](X) {% endcontent-ref %}
  s = s.replace(/\{%\s*content-ref\s+url="([^"]+)"\s*%\}\s*\[([^\]]+)\]\([^)]+\)\s*\{%\s*endcontent-ref\s*%\}/g, (_, url, label) => `[More: ${label} →](${url})`);
  // Any stray content-refs without inner links
  s = s.replace(/\{%\s*content-ref\s+url="([^"]+)"\s*%\}[\s\S]*?\{%\s*endcontent-ref\s*%\}/g, (_, url) => `[More →](${url})`);

  // GitBook's &#x20; workaround for trailing spaces - just drop it, Material
  // preserves blank lines correctly.
  s = s.replace(/&#x20;\s*$/gm, '');

  return s;
}

function copyPorted(srcRel, dstRel) {
  const from = path.join(SRC, srcRel);
  const to = path.join(DST, dstRel);
  const md = fs.readFileSync(from, 'utf8');
  const out = translate(stripYamlFrontmatter(md));
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, out);
  process.stdout.write(`  ${srcRel} -> ${dstRel}\n`);
}

// docs/index.md is a lightly-rewritten version of gitbook/README.md, since
// MkDocs' landing page conventionally lives at docs/index.md.
copyPorted('README.md', 'index.md');
copyPorted('quick-start.md', 'quick-start.md');
copyPorted('reference/basic-token-generation.md', 'reference/basic-token-generation.md');

copyPorted('reference/chats/README.md', 'reference/chats/index.md');
copyPorted('reference/chats/wamp.md', 'reference/chats/wamp.md');
copyPorted('reference/chats/connection.md', 'reference/chats/connection.md');
copyPorted('reference/chats/routing.md', 'reference/chats/routing.md');
copyPorted('reference/chats/events.md', 'reference/chats/events.md');

copyPorted('reference/data-types/README.md', 'reference/data-types/index.md');
copyPorted('reference/data-types/client-types.md', 'reference/data-types/client-types.md');
copyPorted('reference/data-types/user-types.md', 'reference/data-types/user-types.md');
copyPorted('reference/data-types/chat-types.md', 'reference/data-types/chat-types.md');
copyPorted('reference/data-types/content-types.md', 'reference/data-types/content-types.md');

process.stdout.write('Ported.\n');
