#!/usr/bin/env node
// Validates foundation.manifest.json, token parity and the HTML Kit contract.
// Usage: node scripts/foundation-contract.cjs [--strict]
// Default: structural errors fail; HTML contract findings are warnings. --strict: all findings fail.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const strict = process.argv.includes('--strict');
const errors = [];
const warnings = [];
const at = (p) => path.join(root, p);
const has = (p) => fs.existsSync(at(p));
const read = (p) => fs.readFileSync(at(p), 'utf8');
const error = (m) => errors.push(m);
const finding = (m) => (strict ? errors : warnings).push(m);
const resolve = (current, legacy) => (current && has(current) ? current : legacy && has(legacy) ? legacy : null);

if (!has('foundation.manifest.json')) { console.error('Missing foundation.manifest.json'); process.exit(1); }
const manifest = JSON.parse(read('foundation.manifest.json'));
const PARITY = new Set(['full', 'partial', 'divergent', 'single-stack']);
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ASSIGNED_PORTS = new Set(['4300', '7300']);
const blueprintIds = new Set(manifest.blueprints.map((b) => b.id));

for (const group of ['blueprints', 'kits', 'modules', 'recipes']) {
  const seen = new Set();
  for (const item of manifest[group]) {
    if (!ID.test(item.id)) error(`${group}: invalid id ${item.id}`);
    if (seen.has(item.id)) error(`${group}: duplicate id ${item.id}`);
    seen.add(item.id);
  }
}
for (const b of manifest.blueprints) {
  const count = manifest.kits.filter((k) => k.blueprint === b.id).length;
  if (count < 2) error(`blueprint ${b.id}: needs at least 2 kits, has ${count}`);
  if (!has(b.spec)) finding(`blueprint ${b.id}: missing spec ${b.spec}`);
}

const htmlPages = [];
for (const k of manifest.kits) {
  if (!blueprintIds.has(k.blueprint)) error(`kit ${k.id}: unknown blueprint ${k.blueprint}`);
  if (!PARITY.has(k.parity)) error(`kit ${k.id}: invalid parity ${k.parity}`);
  if (!k.html && !k.react) error(`kit ${k.id}: no implementation`);
  if (k.parity === 'single-stack' && k.html && k.react) error(`kit ${k.id}: single-stack with two implementations`);
  if (['partial', 'divergent'].includes(k.parity) && !(k.differences || []).length) error(`kit ${k.id}: ${k.parity} parity requires differences`);
  for (const stack of ['html', 'react']) {
    if (!k[stack]) continue;
    k[stack].entries.forEach((entry, i) => {
      const found = resolve(entry, k[stack].legacyEntries?.[i]);
      if (!found) error(`kit ${k.id}: missing ${stack} entry ${entry}`);
      else if (stack === 'html') htmlPages.push({ kit: k.id, file: found });
    });
  }
}
for (const m of manifest.modules) if (!resolve(m.path, m.legacyPath)) error(`module ${m.id}: missing ${m.path}`);
for (const r of manifest.recipes) if (!resolve(r.path, r.legacyPath)) error(`recipe ${r.id}: missing ${r.path}`);

const catalogFile = resolve('public/html/index.html', 'public/html-kit/index.html');
if (catalogFile) {
  const catalog = read(catalogFile);
  for (const k of manifest.kits) if (!catalog.includes(`data-kit="${k.id}"`)) finding(`catalog: missing data-kit="${k.id}"`);
}

function tokens(css, selector) {
  const out = {};
  const escaped = selector.replace('.', '\\.');
  const re = new RegExp(`(^|[\\s,}])${escaped}\\s*\\{([^}]*)\\}`, 'g');
  for (const block of css.matchAll(re)) for (const d of block[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[d[1]] = d[2].trim().replace(/\s+/g, ' ');
  return out;
}
const tokenFile = resolve('public/html/core/tokens.css', 'public/html-kit/tokens.css');
const globals = read('app/globals.css');
const htmlTokens = read(tokenFile);
const STACK_SPECIFIC = /^--(sidebar|font-)/;
for (const selector of [':root', '.dark']) {
  const a = tokens(globals, selector); const b = tokens(htmlTokens, selector);
  for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (STACK_SPECIFIC.test(key)) continue;
    if (!(key in a) || !(key in b)) error(`tokens ${selector}: ${key} exists in only one stack`);
    else if (a[key] !== b[key]) error(`tokens ${selector}: ${key} differs (${a[key]} vs ${b[key]})`);
  }
}

const coreDir = path.dirname(tokenFile);
const coreCss = ['tokens.css', 'du-components.css', 'vendor/shadcn-html.all.css'].map((f) => fs.readFileSync(path.join(root, coreDir, f), 'utf8'));
const classNames = (css) => new Set([...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/\.((?:ui|du)-[A-Za-z0-9_-]+)/g)].map((m) => m[1]));
const coreClasses = new Set(coreCss.flatMap((c) => [...classNames(c)]));
const EMOJI = /\p{Emoji_Presentation}|\p{Extended_Pictographic}️/u;

for (const { kit, file } of htmlPages) {
  const html = read(file); const label = `${kit} (${path.basename(file)})`;
  const withoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, (s) => (/\ssrc=/.test(s) || /type=["']application\/json/.test(s) ? s : '<script></script>'));
  if (/<style\b/i.test(html)) finding(`${label}: inline <style>`);
  if ([...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)].some((m) => !/\ssrc=/.test(m[1]) && !/application\/json/.test(m[1]) && m[2].trim())) finding(`${label}: inline <script>`);
  if (/<[a-z][^>]*\sstyle\s*=/i.test(withoutScripts)) finding(`${label}: style attribute`);
  if (/<[a-z][^>]*\son[a-z]+\s*=/i.test(withoutScripts)) finding(`${label}: inline event handler`);
  if (!/http-equiv=["']Content-Security-Policy/i.test(html)) finding(`${label}: missing CSP meta`);
  if (!html.includes('tokens.css') || !html.includes('du-components.css') || !html.includes('shadcn-html.all.css') || !html.includes('du-runtime.js')) finding(`${label}: does not load the full core`);
  if (/<(?:script|img|source)\b[^>]+src=["']https?:|<link\b[^>]+href=["']https?:/i.test(html)) finding(`${label}: remote asset`);
  if (EMOJI.test(html)) finding(`${label}: emoji`);
  for (const m of html.matchAll(/(?:localhost|127\.0\.0\.1):(\d{2,5})/g)) if (!ASSIGNED_PORTS.has(m[1])) finding(`${label}: unassigned port ${m[1]}`);
  const sibling = at(file.replace(/\.html$/, '.css'));
  const local = fs.existsSync(sibling) ? classNames(fs.readFileSync(sibling, 'utf8')) : new Set();
  const inlineCss = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  const inlineClasses = classNames(inlineCss);
  const used = new Set([...html.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)).filter((c) => /^(ui|du)-/.test(c)));
  const missing = [...used].filter((c) => !coreClasses.has(c) && !local.has(c) && !inlineClasses.has(c));
  if (missing.length) finding(`${label}: undefined classes ${missing.join(', ')}`);
}

for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(`Foundation contract: ${errors.length} error(s), ${warnings.length} warning(s), mode=${strict ? 'strict' : 'default'}`);
process.exit(errors.length ? 1 : 0);
