#!/usr/bin/env node
// Validates foundation.manifest.json, token parity and the HTML Kit contract.
// Usage: node scripts/foundation-contract.cjs [--strict-html | --strict]
//   default        structural errors fail; other findings are warnings
//   --strict-html  HTML Kit contract findings also fail (from WP-37)
//   --strict       specs, catalog entries and markers also fail (from WP-61)
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const strictAll = process.argv.includes('--strict');
const strictHtml = strictAll || process.argv.includes('--strict-html');
const errors = [];
const warnings = [];
const at = (p) => path.join(root, p);
const has = (p) => fs.existsSync(at(p));
const read = (p) => fs.readFileSync(at(p), 'utf8');
const error = (m) => errors.push(m);
const htmlFinding = (m) => (strictHtml ? errors : warnings).push(m);
const structureFinding = (m) => (strictAll ? errors : warnings).push(m);
const resolve = (current, legacy) => (current && has(current) ? current : legacy && has(legacy) ? legacy : null);

if (!has('foundation.manifest.json')) { console.error('Missing foundation.manifest.json'); process.exit(1); }
const manifest = JSON.parse(read('foundation.manifest.json'));
const CSP = "default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; object-src 'none'";
const PARITY = new Set(['full', 'partial', 'divergent', 'single-stack']);
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ASSIGNED_PORTS = new Set((manifest.assignedPorts || []).map(String));
const blueprints = new Map(manifest.blueprints.map((b) => [b.id, b]));

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
  if (!has(b.spec)) structureFinding(`blueprint ${b.id}: missing spec ${b.spec}`);
}

const moduleIds = new Set(manifest.modules.map((m) => m.id));
const htmlPages = [];
for (const k of manifest.kits) {
  if (!blueprints.has(k.blueprint)) error(`kit ${k.id}: unknown blueprint ${k.blueprint}`);
  if (!PARITY.has(k.parity)) error(`kit ${k.id}: invalid parity ${k.parity}`);
  if (!k.html && !k.react) error(`kit ${k.id}: no implementation`);
  if (k.parity === 'single-stack' && k.html && k.react) error(`kit ${k.id}: single-stack with two implementations`);
  if (['partial', 'divergent'].includes(k.parity) && !(k.differences || []).length) error(`kit ${k.id}: ${k.parity} parity requires differences`);
  for (const ex of k.moduleExceptions || []) {
    if (!moduleIds.has(ex.module)) error(`kit ${k.id}: unknown moduleException ${ex.module}`);
    if (!String(ex.reason || '').trim()) error(`kit ${k.id}: moduleException ${ex.module} missing reason`);
  }
  for (const stack of ['html', 'react']) {
    if (!k[stack]) continue;
    k[stack].entries.forEach((entry, i) => {
      const found = resolve(entry, k[stack].legacyEntries?.[i]);
      if (!found) error(`kit ${k.id}: missing ${stack} entry ${entry}`);
      else if (stack === 'html') htmlPages.push({ kit: k, file: found });
    });
  }
}
for (const m of manifest.modules) if (!resolve(m.path, m.legacyPath)) error(`module ${m.id}: missing ${m.path}`);
for (const r of manifest.recipes) if (!resolve(r.path, r.legacyPath)) error(`recipe ${r.id}: missing ${r.path}`);

if (!has(manifest.catalog)) error(`missing catalog ${manifest.catalog}`);
else {
  const catalog = read(manifest.catalog);
  for (const k of manifest.kits) if (!catalog.includes(`data-kit="${k.id}"`)) structureFinding(`catalog: missing data-kit="${k.id}"`);
}

function tokens(css, selector) {
  const out = {};
  const escaped = selector.replace('.', '\\.');
  const re = new RegExp(`(^|[\\s,}])${escaped}\\s*\\{([^}]*)\\}`, 'g');
  for (const block of css.matchAll(re)) for (const d of block[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[d[1]] = d[2].trim().replace(/\s+/g, ' ');
  return out;
}
const coreDir = manifest.coreDir;
const globals = read('app/globals.css');
const htmlTokens = read(`${coreDir}/tokens.css`);
const STACK_SPECIFIC = /^--(sidebar|font-)/;
for (const selector of [':root', '.dark']) {
  const a = tokens(globals, selector); const b = tokens(htmlTokens, selector);
  for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (STACK_SPECIFIC.test(key)) continue;
    if (!(key in a) || !(key in b)) error(`tokens ${selector}: ${key} exists in only one stack`);
    else if (a[key] !== b[key]) error(`tokens ${selector}: ${key} differs (${a[key]} vs ${b[key]})`);
  }
}

const coreFiles = ['tokens.css', 'du-components.css', 'vendor/shadcn-html.all.css'].map((f) => `${coreDir}/${f}`);
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const classNames = (css) => new Set([...stripComments(css).matchAll(/\.((?:ui|du)-[A-Za-z0-9_-]+)/g)].map((m) => m[1]));
const coreClasses = new Set(coreFiles.flatMap((f) => [...classNames(read(f))]));
const EMOJI = /\p{Emoji_Presentation}|\p{Extended_Pictographic}️/u;
const SINKS = /\.(?:inner|outer)HTML\s*(?:\+=|=(?!=))|insertAdjacentHTML|document\.write\s*\(/;
const TYPE_SCALE = new Set([0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.875, 2.25, 3]);
const offScaleType = (css) => [...stripComments(css).matchAll(/font-size:\s*([\d.]+)(rem|px)/g)].some((m) => {
  const rem = m[2] === 'rem' ? Number(m[1]) : Number(m[1]) / 16;
  return rem < 3 && !TYPE_SCALE.has(rem);
});

for (const f of coreFiles) if (offScaleType(read(f))) htmlFinding(`${f}: font-size outside the canonical scale`);
const catalogCss = String(manifest.catalog).replace(/\.html$/, '.css');
if (has(catalogCss) && offScaleType(read(catalogCss))) htmlFinding(`${catalogCss}: font-size outside the canonical scale`);
const catalogJs = String(manifest.catalog).replace(/\.html$/, '.js');
if (has(catalogJs) && SINKS.test(read(catalogJs))) structureFinding(`${catalogJs}: unsafe HTML sink`);
for (const f of [manifest.catalog, catalogJs]) if (has(f) && EMOJI.test(read(f))) structureFinding(`${f}: catalog emoji`);
if (SINKS.test(read(`${coreDir}/du-runtime.js`))) htmlFinding('core runtime: unsafe HTML sink');
for (const m of manifest.modules) {
  if (!m.stacks.includes('html')) continue;
  const dir = resolve(m.path, m.legacyPath);
  if (!dir) continue;
  for (const f of fs.readdirSync(at(dir)).filter((x) => x.endsWith('.js'))) if (SINKS.test(read(`${dir}/${f}`))) structureFinding(`module ${m.id}: unsafe HTML sink in ${f}`);
}

for (const { kit, file } of htmlPages) {
  const html = read(file); const label = `${kit.id} (${path.basename(file)})`;
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, (s) => (/\ssrc=/.test(s) || /type=["']application\/json/.test(s) ? s : '<script></script>')).replace(/<!--[\s\S]*?-->/g, '');
  if (/<style\b/i.test(html)) htmlFinding(`${label}: inline <style>`);
  if ([...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)].some((m) => !/\ssrc=/.test(m[1]) && !/application\/json/.test(m[1]) && m[2].trim())) htmlFinding(`${label}: inline <script>`);
  if (/<[a-z][^>]*\sstyle\s*=/i.test(markup)) htmlFinding(`${label}: style attribute`);
  if (/<[a-z][^>]*\son[a-z]+\s*=/i.test(markup)) htmlFinding(`${label}: inline event handler`);
  const cspTag = html.match(/http-equiv=["']Content-Security-Policy["']\s+content="([^"]+)"/i);
  if (!cspTag) htmlFinding(`${label}: missing CSP meta`);
  else if (cspTag[1] !== CSP) htmlFinding(`${label}: CSP differs from the contract`);
  for (const asset of ['tokens.css', 'du-components.css', 'shadcn-html.all.css', 'du-runtime.js']) if (!html.includes(asset)) htmlFinding(`${label}: does not load ${asset}`);
  if (/<(?:script|img|source)\b[^>]+src=["']https?:|<link\b[^>]+href=["']https?:/i.test(html)) htmlFinding(`${label}: remote asset`);
  if (EMOJI.test(html)) htmlFinding(`${label}: emoji`);
  const text = markup.replace(/<[^>]+>/g, ' ');
  for (const m of `${html.match(/(?:localhost|127\.0\.0\.1):\d{2,5}/g)?.join(' ') || ''} ${text}`.matchAll(/(?:localhost|127\.0\.0\.1)?:(\d{4,5})\b/g)) if (!ASSIGNED_PORTS.has(m[1])) htmlFinding(`${label}: unassigned port ${m[1]}`);

  for (const attr of html.matchAll(/data-du-on-(?:click|input)="([^"]*)"/g)) {
    for (const m of attr[1].replace(/&quot;/g, '"').matchAll(/(?:localhost|127\.0\.0\.1)?:(\d{4,5})\b/g)) if (!ASSIGNED_PORTS.has(m[1])) htmlFinding(`${label}: unassigned port ${m[1]}`);
  }
  const base = file.replace(/\.html$/, '');
  const localCss = has(`${base}.css`) ? read(`${base}.css`) : '';
  const localJs = has(`${base}.js`) ? read(`${base}.js`) : '';
  if (SINKS.test(localJs)) htmlFinding(`${label}: unsafe HTML sink in page JS`);
  if (/style\s*=\s*\\?["']/.test(localJs)) htmlFinding(`${label}: style attribute generated by page JS`);
  if (EMOJI.test(localJs) || EMOJI.test(localCss)) htmlFinding(`${label}: emoji in page assets`);
  if (offScaleType(localCss)) htmlFinding(`${label}: font-size outside the canonical scale`);
  if (/url\(\s*["']?https?:/i.test(localCss) || /fetch\(\s*["'`]https?:/i.test(localJs)) htmlFinding(`${label}: remote asset in page assets`);
  for (const m of `${localCss}\n${localJs}`.matchAll(/(?:localhost|127\.0\.0\.1):(\d{2,5})/g)) if (!ASSIGNED_PORTS.has(m[1])) htmlFinding(`${label}: unassigned port ${m[1]}`);
  if ((markup.match(/<main[\s>]/gi) || []).length !== 1) htmlFinding(`${label}: needs exactly one <main>`);
  const local = classNames(localCss);
  const used = new Set([...html.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)).filter((c) => /^(ui|du)-/.test(c)));
  const missing = [...used].filter((c) => !coreClasses.has(c) && !local.has(c));
  if (missing.length) htmlFinding(`${label}: undefined classes ${missing.join(', ')}`);

  if (!html.includes(`data-blueprint="${kit.blueprint}"`)) structureFinding(`${label}: missing data-blueprint`);
  if (!html.includes(`data-kit="${kit.id}"`)) structureFinding(`${label}: missing data-kit`);
  const baseRegions = blueprints.get(kit.blueprint)?.regions || [];
  const required = kit.gateFirst ? [...new Set(['gate', ...baseRegions])] : baseRegions;
  for (const region of required) if (!html.includes(`data-region="${region}"`)) structureFinding(`${label}: missing region ${region}`);
}

for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`Foundation contract: ${errors.length} error(s), ${warnings.length} warning(s), mode=${strictAll ? 'strict' : strictHtml ? 'strict-html' : 'default'}`);
process.exit(errors.length ? 1 : 0);
