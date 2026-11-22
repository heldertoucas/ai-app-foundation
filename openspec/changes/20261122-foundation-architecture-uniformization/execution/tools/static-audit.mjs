// Read-only static audit. Usage: node static-audit.mjs <repo> <out.json>
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [repo, out] = process.argv.slice(2);
const read = (f) => fs.readFileSync(path.join(repo, f), 'utf8');
const tracked = execFileSync('git', ['-C', repo, 'ls-files'], { encoding: 'utf8', maxBuffer: 1e8 })
  .split('\n').filter(Boolean).filter((f) => { try { return fs.lstatSync(path.join(repo, f)).isFile(); } catch { return false; } });

const MOVED = fs.existsSync(path.join(repo, 'public/html/core/tokens.css'));
const CORE = MOVED ? 'public/html/core' : 'public/html-kit';
const count = (s, re) => (s.match(re) || []).length;
const uniq = (a) => [...new Set(a)].sort();
const EMOJI = /\p{Emoji_Presentation}|\p{Extended_Pictographic}️/gu;
const PALETTE = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|divide|outline|shadow|accent|caret|decoration)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(?:-\d{2,3})?\b/g;
const ARB_COLOR = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|shadow)-\[(?:#|rgb|hsl|oklch)/g;
const ARB_ANY = /\b[a-z]+(?:-[a-z]+)*-\[[^\]\s]+\]/g;
const ARB_TEXT = /\btext-\[\d[^\]]*\]/g;
const LITERAL_COLOR = /(?:#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\((?!var))/g;
const PORT = /(?:localhost|127\.0\.0\.1):(\d{2,5})/g;
const manifestFile = path.join(repo, 'foundation.manifest.json');
const ASSIGNED = new Set(fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')).assignedPorts.map(String) : ['4300', '7300']);
const ports = (s) => uniq([...s.matchAll(PORT)].map((m) => m[1]));
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '$1');

// ---------- tokens ----------
function blocks(css, selector) {
  const out = {};
  const re = new RegExp(`(^|[\\s,}])${selector.replace('.', '\\.')}\\s*\\{([^}]*)\\}`, 'g');
  for (const m of css.matchAll(re)) for (const d of m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[d[1]] = d[2].trim().replace(/\s+/g, ' ');
  return out;
}
const g = read('app/globals.css'); const t = read(`${CORE}/tokens.css`);
const tokenReport = {};
for (const sel of [':root', '.dark']) {
  const a = blocks(g, sel), b = blocks(t, sel);
  const common = Object.keys(a).filter((k) => k in b);
  tokenReport[sel] = {
    react: Object.keys(a).length, html: Object.keys(b).length, common: common.length,
    different: common.filter((k) => a[k] !== b[k]).map((k) => ({ k, react: a[k], html: b[k] })),
    reactOnly: Object.keys(a).filter((k) => !(k in b)), htmlOnly: Object.keys(b).filter((k) => !(k in a)),
  };
}

// ---------- CSS class definitions ----------
const coreCss = [`${CORE}/du-components.css`, `${CORE}/vendor/shadcn-html.all.css`, `${CORE}/tokens.css`];
const defined = new Set();
const classDefs = {};
for (const f of coreCss) {
  const c = stripComments(read(f));
  for (const m of c.matchAll(/\.((?:ui|du)-[A-Za-z0-9_-]+)/g)) { defined.add(m[1]); (classDefs[f] ||= new Set()).add(m[1]); }
}
const families = {};
for (const c of defined) { const p = c.split('-').slice(0, 2).join('-'); families[p] = (families[p] || 0) + 1; }

// ---------- HTML pages ----------
const htmlFiles = MOVED
  ? tracked.filter((f) => /^public\/html\/kits\/.*\.html$/.test(f) || /^public\/blueprints\/[^/]+\/mockups\/.*\.html$/.test(f) || f === 'public/html/index.html')
  : tracked.filter((f) => /^public\/html-kit\/(templates|examples)\/.*\.html$/.test(f) || f === 'public/html-kit/index.html');
const html = htmlFiles.map((f) => {
  const s = read(f);
  const sibling = (ext) => { const p = path.join(repo, f.replace(/\.html$/, `.${ext}`)); return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : ''; };
  const siblingCss = sibling('css'); const siblingJs = sibling('js');
  const styleBlocks = [...s.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).concat(siblingCss).join('\n');
  const styleAttrs = [...s.matchAll(/\sstyle="([^"]*)"/gi)].map((m) => m[1]);
  const scripts = [...s.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]).join('\n');
  const used = uniq([...s.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)).filter((c) => /^(ui|du)-/.test(c)));
  const local = new Set([...styleBlocks.matchAll(/\.((?:ui|du)-[A-Za-z0-9_-]+)/g)].map((m) => m[1]));
  const undefinedClasses = used.filter((c) => !defined.has(c) && !local.has(c));
  const localOverrides = [...local].filter((c) => defined.has(c));
  const p = ports(`${s}\n${siblingCss}\n${siblingJs}`);
  return {
    file: f, lines: s.split('\n').length, bytes: s.length,
    styleAttr: styleAttrs.length, styleBlockLines: styleBlocks.split('\n').length, inlineHandlers: count(s, /\son[a-z]+="/gi),
    inlineScriptLines: scripts ? scripts.split('\n').length : 0, innerHTML: count(`${s}\n${siblingJs}`, /\.innerHTML\s*[+=]/g), emoji: count(`${s}\n${siblingCss}\n${siblingJs}`, EMOJI),
    externalAssets: uniq([...s.matchAll(/<(?:script|link)[^>]+(?:src|href)="(https?:[^"]+)"/gi)].map((m) => new URL(m[1]).host)),
    literalColors: count(stripComments(styleBlocks), LITERAL_COLOR) + count(styleAttrs.join(';'), LITERAL_COLOR),
    usesTokens: /tokens\.css/.test(s.replace(/\/\*[\s\S]*?\*\//g, '')), usesComponents: /du-components\.css/.test(s), usesVendor: /shadcn-html/.test(s), usesRuntime: /du-runtime\.js/.test(s),
    tokenCopies: count(styleBlocks, /--[\w-]+\s*:/g), ports: p, badPorts: p.filter((x) => !ASSIGNED.has(x)),
    usedClasses: used.length, undefinedClasses, localOverrides: localOverrides.length,
    tailwind: /cdn\.tailwindcss/.test(s), main: count(s, /<main[\s>]/g), lang: (s.match(/<html[^>]*lang="([^"]+)"/) || [])[1] || null,
    title: (s.match(/<title>([^<]*)/) || [])[1] || null,
    blueprintSignals: { aside: count(s, /<aside/g), hero: count(s, /hero/gi), bento: count(s, /bento/gi), dialog: count(s, /<dialog/g), table: count(s, /<table/g), footer: count(s, /<footer/g) },
  };
});

// ---------- React files ----------
const reactFiles = tracked.filter((f) => /^(components|app)\/.*\.tsx$/.test(f) && !/__tests__|\.test\./.test(f));
const testFiles = tracked.filter((f) => /\.test\.tsx?$/.test(f));
const testText = testFiles.map(read).join('\n');
const registry = read('lib/library/component-registry.ts');
const layerOf = (f) => {
  if (f.startsWith('components/ui/')) return 'primitive';
  if (f.startsWith('components/web/')) return 'web';
  if (f.startsWith('components/dashboard/library/')) return 'catalog';
  if (f.startsWith('components/dashboard/')) return 'dashboard';
  if (f.startsWith('components/avaliacao-dashboard/') || f.startsWith('components/kits/avaliacao/')) return 'kit:avaliacao';
  if (f.startsWith('components/futuro-digital/') || f.startsWith('components/kits/futuro-digital/')) return 'kit:futuro-digital';
  if (f.startsWith('components/')) return 'shell';
  return 'route';
};
const FORBIDDEN = {
  primitive: [/^@\/components\/(?!ui\/)/, /^@\/app/, /^@\/lib\/(?!utils)/],
  web: [/^@\/components\/(dashboard|avaliacao|futuro|kits)/, /^@\/app/],
  dashboard: [/^@\/components\/(avaliacao|futuro|kits)/, /^@\/app/],
  catalog: [/^@\/components\/(avaliacao|futuro|kits)/, /^@\/app/],
  shell: [/^@\/components\/(dashboard|avaliacao|futuro|kits)/, /^@\/app/],
  'kit:avaliacao': [/^@\/components\/(kits\/)?futuro/, /^@\/app/],
  'kit:futuro-digital': [/^@\/components\/(kits\/)?avaliacao/, /^@\/app/],
  route: [],
};
const react = reactFiles.map((f) => {
  const raw = read(f); const s = stripComments(raw); const layer = layerOf(f);
  const imports = uniq([...s.matchAll(/from\s+['"]([^'"]+)['"]/g)].map((m) => m[1]));
  const base = path.basename(f, '.tsx');
  const exportsNamed = uniq([...s.matchAll(/export\s+(?:default\s+)?(?:async\s+)?(?:function|const)\s+([A-Z]\w+)/g)].map((m) => m[1]));
  const p = ports(s);
  return {
    file: f, layer, lines: raw.split('\n').length, client: /^\s*['"]use client['"]/m.test(raw),
    palette: count(s, PALETTE), paletteSample: uniq(s.match(PALETTE) || []).slice(0, 6), arbColor: count(s, ARB_COLOR), arbitrary: count(s, ARB_ANY), arbText: count(s, ARB_TEXT),
    literalColors: count(s, LITERAL_COLOR), styleProp: count(s, /\bstyle=\{/g), emoji: count(s, EMOJI), lucide: count(s, /lucide-react/g),
    phosphor: /@phosphor-icons\/react/.test(s), rawImg: count(s, /<img\s/g), dangerousHtml: count(s, /dangerouslySetInnerHTML/g),
    rawButton: layer === 'primitive' ? 0 : count(s, /<button[\s>]/g), rawInput: layer === 'primitive' ? 0 : count(s, /<input[\s>]/g), rawTable: layer === 'primitive' ? 0 : count(s, /<table[\s>]/g),
    badPorts: p.filter((x) => !ASSIGNED.has(x)), kebab: /^[a-z0-9]+(-[a-z0-9]+)*$/.test(base),
    exportsNamed, tested: testText.includes(base) , inRegistry: registry.includes(base) || exportsNamed.some((e) => registry.includes(e)),
    layerViolations: imports.filter((i) => (FORBIDDEN[layer] || []).some((r) => r.test(i))),
    domainWords: count(s, /\b(avaliacao|trainer|formador|formando|trainee|cmlisboa|futuro.?digital)\b/gi),
  };
});

// ---------- modules & recipes ----------
const recipeDirs = uniq(tracked.filter((f) => /^(recipes|public\/html-kit\/recipes|public\/html\/modules)\/[^/]+\//.test(f)).map((f) => f.split('/').slice(0, f.startsWith('recipes') ? 2 : 4).join('/')));
const allCode = tracked.filter((f) => /\.(html|tsx?|js)$/.test(f) && !f.includes('/recipes/') && !f.includes('/modules/'));
const recipes = recipeDirs.map((d) => {
  const files = tracked.filter((f) => f.startsWith(d + '/'));
  const name = path.basename(d);
  const code = files.filter((f) => /\.(js|ts|tsx)$/.test(f));
  const readme = files.find((f) => /README/.test(f)); const checklist = files.find((f) => /checklist/.test(f));
  const manifest = JSON.parse(read(files.find((f) => f.endsWith('recipe.json') || f.endsWith('module.json'))));
  const codeText = code.map(read).join('\n');
  return {
    dir: d, stack: d.startsWith('recipes') ? 'react' : 'html', files: files.length, codeFiles: code.length, codeLines: codeText ? codeText.split('\n').length : 0,
    readmeLines: readme ? read(readme).split('\n').length : 0, checklistItems: checklist ? count(read(checklist), /^\s*-\s*\[/gm) : 0,
    manifest: { name: manifest.name, version: manifest.version, deps: Object.keys(manifest.dependencies || {}).length, env: Array.isArray(manifest.env) ? manifest.env.length : Object.keys(manifest.env || {}).length },
    usedBy: allCode.filter((f) => code.some((c) => read(f).includes(path.basename(c)))).filter((f) => !f.endsWith('index.html')),
    innerHTML: count(codeText, /\.innerHTML\s*[+=]/g), emoji: count(codeText, EMOJI), name,
  };
});

// ---------- core runtime ----------
const rt = read(`${CORE}/du-runtime.js`);
const runtime = { lines: rt.split('\n').length, innerHTML: count(rt, /\.innerHTML\s*[+=]/g), globals: uniq([...rt.matchAll(/window\.(du[A-Z]\w+)\s*=/g)].map((m) => m[1])), dataApi: uniq([...rt.matchAll(/data-du-[a-z-]+/g)].map((m) => m[0])), shortcuts: count(rt, /e\.key|event\.key/g) };

// ---------- docs / vocabulary ----------
const docsFiles = tracked.filter((f) => /\.md$/.test(f) && !f.startsWith('openspec/changes/archive') && !f.startsWith('.agents') && !f.startsWith('skills/'));
const vocab = {};
for (const term of ['blueprint', 'template', 'vertical', 'recipe', 'kit', 'mockup', 'starter', 'module', 'scaffold', 'cockpit', 'modelo', 'receita']) {
  const re = new RegExp(`\\b${term}s?\\b`, 'gi');
  vocab[term] = {
    docs: docsFiles.reduce((n, f) => n + count(read(f), re), 0),
    ui: [...reactFiles, ...htmlFiles].reduce((n, f) => n + count(read(f), re), 0),
  };
}

const result = { tokenReport, families, definedClasses: defined.size, html, react, recipes, runtime, vocab, testFiles: testFiles.length };
fs.writeFileSync(out, JSON.stringify(result, null, 1));

// ---------- compact summary ----------
console.log('TOKENS', JSON.stringify(Object.fromEntries(Object.entries(tokenReport).map(([k, v]) => [k, { react: v.react, html: v.html, common: v.common, different: v.different.length, reactOnly: v.reactOnly.length, htmlOnly: v.htmlOnly }]))));
console.log('CLASS FAMILIES', definedClasses(), JSON.stringify(Object.entries(families).sort((a, b) => b[1] - a[1]).slice(0, 16)));
function definedClasses() { return defined.size; }
console.log('\nHTML file|lines|style|handlers|innerHTML|emoji|colors|core(T/C/V/R)|tokenCopies|undefined|badPorts|external');
for (const h of html) console.log([path.basename(h.file), h.lines, h.styleAttr, h.inlineHandlers, h.innerHTML, h.emoji, h.literalColors, `${+h.usesTokens}${+h.usesComponents}${+h.usesVendor}${+h.usesRuntime}`, h.tokenCopies, h.undefinedClasses.length, h.badPorts.join(',') || '-', h.externalAssets.join(',') || '-'].join('|'));
console.log('\nREACT layer|files|lines|client|palette|arbColor|arbitrary|arbText|literal|style|emoji|lucide|img|dangerous|rawBtn|rawInput|rawTable|violations|badPorts|tested|registry|domain');
for (const l of uniq(react.map((r) => r.layer))) {
  const a = react.filter((r) => r.layer === l); const sum = (k) => a.reduce((n, r) => n + (typeof r[k] === 'number' ? r[k] : r[k]?.length || 0), 0);
  console.log([l, a.length, sum('lines'), a.filter((r) => r.client).length, ...['palette', 'arbColor', 'arbitrary', 'arbText', 'literalColors', 'styleProp', 'emoji', 'lucide', 'rawImg', 'dangerousHtml', 'rawButton', 'rawInput', 'rawTable', 'layerViolations', 'badPorts'].map(sum), a.filter((r) => r.tested).length, a.filter((r) => r.inRegistry).length, sum('domainWords')].join('|'));
}
console.log('\nnon-kebab:', react.filter((r) => !r.kebab && !/\/(page|layout)\.tsx$/.test(r.file)).map((r) => r.file).join(', ') || '-');
console.log('layer violations:', react.filter((r) => r.layerViolations.length).map((r) => `${r.file} -> ${r.layerViolations.join(',')}`).join('; ') || '-');
console.log('dangerous/bad ports:', react.filter((r) => r.dangerousHtml || r.badPorts.length).map((r) => `${r.file}(d=${r.dangerousHtml},p=${r.badPorts})`).join('; ') || '-');
console.log('top token offenders:', [...react].sort((a, b) => (b.palette + b.arbColor + b.literalColors) - (a.palette + a.arbColor + a.literalColors)).slice(0, 12).map((r) => `${r.file.replace('components/', '')}:${r.palette + r.arbColor + r.literalColors}`).join(', '));
console.log('\nRECIPES dir|stack|code|lines|readme|checklist|deps|env|usedBy|innerHTML');
for (const r of recipes) console.log([r.dir, r.stack, r.codeFiles, r.codeLines, r.readmeLines, r.checklistItems, r.manifest.deps, r.manifest.env, r.usedBy.length, r.innerHTML].join('|'));
console.log('\nRUNTIME', JSON.stringify(runtime));
console.log('VOCAB', JSON.stringify(vocab));
