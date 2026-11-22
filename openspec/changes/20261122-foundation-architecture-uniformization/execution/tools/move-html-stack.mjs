#!/usr/bin/env node
// Atomically moves public/html-kit to public/html and public/blueprints, rewrites every known reference,
// writes redirect pages and stages exactly what it touched. Rolls back on any error.
// Usage: node move-html-stack.mjs <repo> [--dry-run]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const repo = path.resolve(process.argv[2] || '.');
const dry = process.argv.includes('--dry-run');
const OLD = 'public/html-kit';
const KITS = {
  'template-app-shell': ['html/kits/dashboard-starter', 'index'],
  'du-dashboard': ['html/kits/mission-control', 'index'],
  'starter-cockpit': ['html/kits/cockpit-starter', 'index'],
  'du-avaliacao-dashboard': ['html/kits/avaliacao', 'index'],
  'du-futuro-digital': ['html/kits/futuro-digital', 'index'],
  'du-futuro-digital-galeria': ['html/kits/futuro-digital', 'galeria'],
  'du-html-app-template': ['blueprints/dashboard/mockups', 'reference'],
};
const MOCKUPS = {
  'du-clean-dashboard-mockup': ['blueprints/dashboard/mockups', 'clean'],
  'du-cockpit-mockup': ['blueprints/cockpit/mockups', 'mission-control'],
};
const MODULES = { 'auth-pin-lock': 'auth-pin', 'datatable-fetch': 'data-table', 'localstorage-state': 'state-sync', 'sse-telemetry': 'live-telemetry' };
const CORE = ['tokens.css', 'du-components.css', 'du-runtime.js', 'vendor', 'fonts'];
const CHECK = 'scripts/foundation-check.js';
const ROUTE = 'app/api/open-terminal/route.ts';
const HEADER = 'components/avaliacao-dashboard/session-header.tsx';
const CAPTURE = 'scripts/capture-all-screenshots.js';
const MANIFEST = 'foundation.manifest.json';

const exists = (p) => fs.existsSync(path.join(repo, p));
const read = (p) => fs.readFileSync(path.join(repo, p), 'utf8');
const git = (...a) => execFileSync('git', ['-C', repo, ...a], { encoding: 'utf8', stdio: 'pipe' });
const stop = (m) => { console.error(`STOP ${m}`); process.exit(1); };
const rel = (file, target) => path.relative(path.dirname(file), target).split(path.sep).join('/');
const touched = new Set();
const write = (p, s) => { fs.mkdirSync(path.dirname(path.join(repo, p)), { recursive: true }); fs.writeFileSync(path.join(repo, p), s); touched.add(p); };
const edit = (p, fn) => { const before = read(p); const after = fn(before); if (after !== before) write(p, after); };

const headFile = () => path.resolve(repo, git('rev-parse', '--git-path', 'foundation-move-head').trim());
function rollback(head) {
  git('reset', '-q', '--hard', head);
  git('clean', '-fdq', '--', 'public/html', 'public/blueprints', 'public/html-kit', 'public/templates-index.html');
}
if (process.argv.includes('--rollback')) {
  if (!fs.existsSync(headFile())) stop('no recorded move');
  const recorded = fs.readFileSync(headFile(), 'utf8').trim();
  if (git('rev-parse', 'HEAD').trim() !== recorded) stop('HEAD changed since the move; use git revert');
  const allowed = ['public/html/', 'public/blueprints/', 'public/html-kit/', 'public/templates-index.html', CHECK, ROUTE, HEADER, CAPTURE, MANIFEST];
  const changed = git('status', '--porcelain', '--untracked-files=all').split('\n').filter(Boolean)
    .flatMap((line) => line.slice(3).split(' -> ')).map((p) => p.replace(/^"|"$/g, ''));
  const foreign = changed.filter((p) => !allowed.some((a) => (a.endsWith('/') ? p.startsWith(a) : p === a)));
  if (foreign.length) stop(`changes outside the move: ${foreign.join(', ')}`);
  rollback(recorded);
  fs.rmSync(headFile());
  console.log(`ROLLED BACK to ${recorded}`);
  process.exit(0);
}
if (git('branch', '--show-current').trim() === 'main') stop('run on a feature branch, never main');
if (git('status', '--porcelain', '--untracked-files=all').trim()) stop('working tree must be clean');
let portBusy = false;
try { execFileSync('lsof', ['-nP', '-iTCP:4300', '-sTCP:LISTEN'], { stdio: 'pipe' }); portBusy = true; } catch { portBusy = false; }
if (portBusy && !dry) stop('port 4300 is in use: stop the server you started, or ask the human');
for (const f of [CHECK, ROUTE, HEADER, CAPTURE, MANIFEST]) if (!exists(f)) stop(`missing ${f}`);
if (!exists(`${OLD}/fonts`)) stop('fonts directory missing: run WP-32 first');

const moves = [];
for (const c of CORE) moves.push([`${OLD}/${c}`, `public/html/core/${c}`]);
moves.push([`${OLD}/index.html`, 'public/html/index.html']);
for (const ext of ['css', 'js']) if (exists(`${OLD}/index.${ext}`)) moves.push([`${OLD}/index.${ext}`, `public/html/index.${ext}`]);
if (exists(`${OLD}/run-dev.command`)) moves.push([`${OLD}/run-dev.command`, 'public/html/run-dev.command']);
for (const [from, to] of Object.entries(MODULES)) moves.push([`${OLD}/recipes/${from}`, `public/html/modules/${to}`]);
for (const [from, [dir, name]] of Object.entries(KITS)) for (const ext of ['html', 'css', 'js']) if (exists(`${OLD}/templates/${from}.${ext}`)) moves.push([`${OLD}/templates/${from}.${ext}`, `public/${dir}/${name}.${ext}`]);
for (const [from, [dir, name]] of Object.entries(MOCKUPS)) for (const ext of ['html', 'css', 'js']) if (exists(`${OLD}/examples/${from}.${ext}`)) moves.push([`${OLD}/examples/${from}.${ext}`, `public/${dir}/${name}.${ext}`]);

const dupes = (list) => list.filter((x, i) => list.indexOf(x) !== i);
const problems = {
  missing: moves.filter(([a]) => !exists(a)).map(([a]) => a),
  taken: moves.filter(([, b]) => exists(b)).map(([, b]) => b),
  duplicateSources: dupes(moves.map(([a]) => a)),
  duplicateTargets: dupes(moves.map(([, b]) => b)),
};
if (Object.values(problems).some((l) => l.length)) stop(JSON.stringify(problems));
if (dry) { moves.forEach(([a, b]) => console.log(`${a} -> ${b}`)); console.log(`DRY-RUN OK moves=${moves.length}`); process.exit(0); }

const startHead = git('rev-parse', 'HEAD').trim();
fs.writeFileSync(headFile(), `${startHead}\n`);

function kitUrl([dir, name]) { return `/${dir}/${name}.html`; }
const stub = (target, title) => `<!doctype html>\n<html lang="pt-PT">\n<head>\n  <meta charset="utf-8">\n  <meta http-equiv="refresh" content="0; url=${target}">\n  <link rel="canonical" href="${target}">\n  <title>${title} mudou de endereço</title>\n</head>\n<body>\n  <main>\n    <h1>${title} mudou de endereço</h1>\n    <p><a href="${target}">Abrir a nova página</a></p>\n  </main>\n</body>\n</html>\n`;
const writeStub = (file, target, title) => write(file, stub(rel(file, target), title));

try {
  for (const [a, b] of moves) { fs.mkdirSync(path.dirname(path.join(repo, b)), { recursive: true }); git('mv', a, b); }

  const coreRe = /(["'(])(?:\.\.\/|\.\/)(tokens\.css|du-components\.css|du-runtime\.js|vendor\/shadcn-html\.all\.css)/g;
  for (const [from, [dir, name]] of Object.entries(KITS)) {
    const file = `public/${dir}/${name}.html`;
    edit(file, (s) => s
      .replace(coreRe, (_, q, asset) => `${q}${rel(file, `public/html/core/${asset}`)}`)
      .replaceAll(`href="${from}.css"`, `href="${name}.css"`)
      .replaceAll(`src="${from}.js"`, `src="${name}.js"`)
      .replace(/(href=")du-futuro-digital-galeria\.html/g, '$1galeria.html')
      .replace(/(href=")du-futuro-digital\.html/g, '$1index.html')
      .replaceAll('public/html-kit/', 'public/html/'));
    for (const ext of ['html', 'css', 'js']) {
      const f = `public/${dir}/${name}.${ext}`;
      if (dir.startsWith('html/kits/') && exists(f)) edit(f, (s) => s.replace(/(["'(])\.\.\/\.\.\/assets\//g, '$1../../../assets/'));
    }
  }
  for (const [from, [dir, name]] of Object.entries(MOCKUPS)) edit(`public/${dir}/${name}.html`, (s) => s.replaceAll(`href="${from}.css"`, `href="${name}.css"`).replaceAll(`src="${from}.js"`, `src="${name}.js"`));

  for (const f of ['public/html/index.html', 'public/html/index.js', 'public/html/index.css']) {
    if (!exists(f)) continue;
    edit(f, (input) => {
      let s = input.replace(/(["'(])\.\/(tokens\.css|du-components\.css|du-runtime\.js|vendor\/shadcn-html\.all\.css)/g, '$1./core/$2').replace(/(["'(])\.\/screenshots\//g, '$1../screenshots/');
      for (const [from, target] of Object.entries(KITS)) {
        s = s.replaceAll(`public/html-kit/templates/${from}.html`, `public${kitUrl(target)}`).replaceAll(`/html-kit/templates/${from}.html`, kitUrl(target));
      }
      for (const [from, to] of Object.entries(MODULES)) s = s.replaceAll(`/html-kit/recipes/${from}/`, `/html/modules/${to}/`);
      return s.replaceAll('/html-kit/recipes/', '/html/modules/').replaceAll('/html-kit/index.html', '/html/index.html');
    });
  }

  for (const [from, to] of Object.entries(MODULES)) {
    const check = `public/html/modules/${to}/checklist.md`;
    if (exists(check)) edit(check, (s) => s.replaceAll(`../recipes/${from}/`, `../../modules/${to}/`));
  }
  if (exists('public/html/run-dev.command')) edit('public/html/run-dev.command', (s) => s.replace('cd "$(dirname "$0")"', 'cd "$(dirname "$0")/../.."'));

  edit(ROUTE, (input) => {
    let s = input;
    for (const [from, target] of Object.entries(KITS)) s = s.replaceAll(`open public/html-kit/templates/${from}.html`, `open public${kitUrl(target)}`);
    return s;
  });
  edit(HEADER, (s) => s.replaceAll('/html-kit/templates/du-avaliacao-dashboard.html', '/html/kits/avaliacao/index.html'));
  edit(CAPTURE, (input) => {
    let s = input;
    for (const [from, target] of Object.entries(KITS)) s = s.replaceAll(`/html-kit/templates/${from}.html`, kitUrl(target));
    return s;
  });
  edit(CHECK, (s) => s
    .replace("'../public/html-kit'", "'../public/html/core'")
    .replace("'templates/du-html-app-template.html'", "'../../blueprints/dashboard/mockups/reference.html'")
    .replace("'templates/template-app-shell.html'", "'../kits/dashboard-starter/index.html'")
    .replace("'recipes/sse-telemetry/recipe.json'", "'../modules/live-telemetry/recipe.json'")
    .replaceAll('public/html-kit/templates/', 'public/html/kits/')
    .replaceAll('public/html-kit/recipes/', 'public/html/modules/')
    .replaceAll('public/html-kit/', 'public/html/core/'));

  const manifest = JSON.parse(read(MANIFEST));
  manifest.coreDir = 'public/html/core';
  manifest.catalog = 'public/html/index.html';
  for (const k of manifest.kits) if (k.html) delete k.html.legacyEntries;
  for (const m of manifest.modules) delete m.legacyPath;
  write(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  for (const [from, [dir, name]] of Object.entries(KITS)) writeStub(`${OLD}/templates/${from}.html`, `public/${dir}/${name}.html`, from);
  for (const [from, [dir, name]] of Object.entries(MOCKUPS)) writeStub(`${OLD}/examples/${from}.html`, `public/${dir}/${name}.html`, from);
  writeStub(`${OLD}/index.html`, 'public/html/index.html', 'Catálogo');
  const legacy = path.join(repo, 'public/templates-index.html');
  if (fs.lstatSync(legacy).isSymbolicLink()) {
    git('rm', '-q', '--cached', 'public/templates-index.html');
    fs.unlinkSync(legacy);
    writeStub('public/templates-index.html', 'public/html/index.html', 'Catálogo');
  }

  for (const [dir, target] of Object.entries(KITS).map(([, v]) => [`public/${v[0]}`, v[1]])) {
    const page = `${dir}/${target}.html`;
    for (const m of read(page).matchAll(/(?:src|href)="(\.\.\/\.\.\/\.\.\/assets\/[^"]+)"/g)) {
      if (!fs.existsSync(path.resolve(repo, dir, m[1]))) throw new Error(`missing local asset ${m[1]} in ${page}`);
    }
  }

  git('add', '--', ...touched);
  console.log(`OK moved=${moves.length} rewritten=${touched.size}. Everything is staged. Review with: git status --short`);
} catch (e) {
  console.error(`FAILED: ${e.message}`);
  rollback(startHead);
  fs.rmSync(headFile(), { force: true });
  console.error('ROLLED BACK to HEAD. Report BLOCKED.');
  process.exit(1);
}
