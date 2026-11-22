#!/usr/bin/env node
// Moves public/html-kit to public/html and public/blueprints with git mv, rewrites paths, and leaves redirect pages.
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
const MOCKUPS = { 'du-clean-dashboard-mockup': 'clean', 'du-cockpit-mockup': 'mission-control' };
const MODULES = { 'auth-pin-lock': 'auth-pin', 'datatable-fetch': 'data-table', 'localstorage-state': 'state-sync', 'sse-telemetry': 'live-telemetry' };
const CORE = ['tokens.css', 'du-components.css', 'du-runtime.js', 'vendor'];

const exists = (p) => fs.existsSync(path.join(repo, p));
const git = (...a) => execFileSync('git', ['-C', repo, ...a], { stdio: 'pipe' });
const moves = [];
for (const c of CORE) moves.push([`${OLD}/${c}`, `public/html/core/${c}`]);
moves.push([`${OLD}/index.html`, 'public/html/index.html']);
for (const ext of ['css', 'js']) if (exists(`${OLD}/index.${ext}`)) moves.push([`${OLD}/index.${ext}`, `public/html/index.${ext}`]);
if (exists(`${OLD}/run-dev.command`)) moves.push([`${OLD}/run-dev.command`, 'public/html/run-dev.command']);
for (const [from, to] of Object.entries(MODULES)) moves.push([`${OLD}/recipes/${from}`, `public/html/modules/${to}`]);
for (const [from, [dir, name]] of Object.entries(KITS)) for (const ext of ['html', 'css', 'js']) if (exists(`${OLD}/templates/${from}.${ext}`)) moves.push([`${OLD}/templates/${from}.${ext}`, `public/${dir}/${name}.${ext}`]);
for (const [from, name] of Object.entries(MOCKUPS)) for (const ext of ['html', 'css', 'js']) if (exists(`${OLD}/examples/${from}.${ext}`)) moves.push([`${OLD}/examples/${from}.${ext}`, `public/blueprints/dashboard/mockups/${name}.${ext}`]);

const missing = moves.filter(([a]) => !exists(a)).map(([a]) => a);
const taken = moves.filter(([, b]) => exists(b)).map(([, b]) => b);
if (missing.length || taken.length) { console.error('STOP', JSON.stringify({ missing, taken })); process.exit(1); }
if (dry) { moves.forEach(([a, b]) => console.log(`${a} -> ${b}`)); process.exit(0); }

for (const [a, b] of moves) { fs.mkdirSync(path.dirname(path.join(repo, b)), { recursive: true }); git('mv', a, b); }

const coreRe = /(["'(])(?:\.\.\/|\.\/)(tokens\.css|du-components\.css|du-runtime\.js|vendor\/shadcn-html\.all\.css)/g;
const rel = (file, target) => path.relative(path.dirname(file), target).split(path.sep).join('/');
for (const [from, [dir, name]] of Object.entries(KITS)) {
  const file = `public/${dir}/${name}.html`; const full = path.join(repo, file);
  let s = fs.readFileSync(full, 'utf8');
  s = s.replace(coreRe, (_, q, asset) => `${q}${rel(file, `public/html/core/${asset}`)}`);
  s = s.replaceAll(`href="${from}.css"`, `href="${name}.css"`).replaceAll(`src="${from}.js"`, `src="${name}.js"`);
  s = s.replace(/(href=")du-futuro-digital-galeria\.html/g, '$1galeria.html').replace(/(href=")du-futuro-digital\.html/g, '$1index.html');
  fs.writeFileSync(full, s);
}
for (const [from, name] of Object.entries(MOCKUPS)) {
  const full = path.join(repo, `public/blueprints/dashboard/mockups/${name}.html`);
  let s = fs.readFileSync(full, 'utf8');
  s = s.replaceAll(`href="${from}.css"`, `href="${name}.css"`).replaceAll(`src="${from}.js"`, `src="${name}.js"`);
  fs.writeFileSync(full, s);
}

const urlFor = ([dir, name]) => `/${dir}/${name === 'index' ? '' : name + '.html'}`.replace(/\/$/, '/index.html');
for (const f of ['public/html/index.html', 'public/html/index.js', 'public/html/index.css']) {
  if (!exists(f)) continue;
  let s = fs.readFileSync(path.join(repo, f), 'utf8');
  s = s.replace(/(["'(])\.\/(tokens\.css|du-components\.css|du-runtime\.js|vendor\/shadcn-html\.all\.css)/g, '$1./core/$2');
  s = s.replace(/(["'(])\.\/screenshots\//g, '$1../screenshots/');
  for (const [from, target] of Object.entries(KITS)) {
    s = s.replaceAll(`/html-kit/templates/${from}.html`, urlFor(target));
    s = s.replaceAll(`public/html-kit/templates/${from}.html`, `public${urlFor(target)}`);
    s = s.replaceAll(`./templates/${from}.html`, urlFor(target).replace('/html/', './'));
  }
  for (const [from, to] of Object.entries(MODULES)) s = s.replaceAll(`/html-kit/recipes/${from}/`, `/html/modules/${to}/`);
  s = s.replaceAll('/html-kit/recipes/', '/html/modules/').replaceAll('/html-kit/index.html', '/html/index.html');
  fs.writeFileSync(path.join(repo, f), s);
}

const stub = (target, title) => `<!doctype html>\n<html lang="pt-PT">\n<head>\n  <meta charset="utf-8">\n  <meta http-equiv="refresh" content="0; url=${target}">\n  <link rel="canonical" href="${target}">\n  <title>${title} mudou de endereço</title>\n</head>\n<body>\n  <main>\n    <h1>${title} mudou de endereço</h1>\n    <p><a href="${target}">Abrir a nova página</a></p>\n  </main>\n</body>\n</html>\n`;
const writeStub = (file, targetAbs, title) => {
  const full = path.join(repo, file); fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, stub(rel(file, targetAbs), title));
};
for (const [from, [dir, name]] of Object.entries(KITS)) writeStub(`${OLD}/templates/${from}.html`, `public/${dir}/${name}.html`, from);
for (const [from, name] of Object.entries(MOCKUPS)) writeStub(`${OLD}/examples/${from}.html`, `public/blueprints/dashboard/mockups/${name}.html`, from);
writeStub(`${OLD}/index.html`, 'public/html/index.html', 'Catálogo');
const legacy = path.join(repo, 'public/templates-index.html');
if (fs.lstatSync(legacy).isSymbolicLink()) { git('rm', '-q', '--cached', 'public/templates-index.html'); fs.unlinkSync(legacy); writeStub('public/templates-index.html', 'public/html/index.html', 'Catálogo'); }
console.log(`moved=${moves.length}`);
