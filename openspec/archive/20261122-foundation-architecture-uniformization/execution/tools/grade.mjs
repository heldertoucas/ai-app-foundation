// Deterministic grading from static.json + render.json. Usage: node grade.mjs <auditDir>
import fs from 'node:fs';
import path from 'node:path';
const A = process.argv[2];
const S = JSON.parse(fs.readFileSync(path.join(A, 'static.json')));
const R = JSON.parse(fs.readFileSync(path.join(A, 'render.json')));

const band = (v, warn) => (v === 0 ? 'P' : v <= warn ? 'W' : 'F');
const grade = (c, dFrom = 5) => { const v = Object.values(c); const f = v.filter((x) => x === 'F').length; const w = v.filter((x) => x === 'W').length; return f >= dFrom ? 'D' : f ? 'C' : w ? 'B' : 'A'; };
const renders = (id) => R.filter((r) => r.id === id);
const worst = (id, k) => Math.max(0, ...renders(id).flatMap((r) => Object.values(r.themes).map((t) => t[k] ?? 0)));
const offlineExternal = (id) => renders(id).some((r) => r.external.length > 0);
const hydration = (id) => renders(id).some((r) => [...r.pageErrors, ...r.consoleErrors].some((e) => /Hydration|hydrated/.test(e)));
const realErrors = (id) => renders(id).flatMap((r) => r.pageErrors).filter((e) => !/tailwind is not defined/.test(e)).length;

const html = S.html.map((h) => {
  const id = 'html:' + h.file.replace('public/html-kit/', '').replace(/^public\//, '');
  const base = path.basename(h.file);
  const isMockup = h.file.includes('/examples/') || h.file.includes('/mockups/');
  const c = {
    offline: h.externalAssets.length || offlineExternal(id) ? 'F' : 'P',
    core: h.usesTokens && h.usesComponents && h.usesVendor && h.usesRuntime ? 'P' : 'F',
    tokens: band(h.literalColors, 10),
    csp: h.styleAttr + h.inlineHandlers + h.innerHTML === 0 ? 'P' : 'F',
    classes: h.undefinedClasses.length ? 'F' : 'P',
    icons: h.emoji ? 'F' : 'P',
    ports: h.badPorts.length ? 'F' : 'P',
    contrast: band(worst(id, 'contrastFailCount'), 10),
    names: band(worst(id, 'unnamed'), 3),
    responsive: worst(id, 'docOverflow') > 0 || worst(id, 'sidebarBlocks') > 0 ? 'F' : 'P',
    runtime: realErrors(id) ? 'F' : 'P',
  };
  return { id, base, isMockup, grade: isMockup ? 'REF' : grade(c), fails: Object.values(c).filter((x) => x === 'F').length, c, m: { style: h.styleAttr, handlers: h.inlineHandlers, innerHTML: h.innerHTML, emoji: h.emoji, colors: h.literalColors, undefined: h.undefinedClasses.length, contrast: worst(id, 'contrastFailCount'), overflow: worst(id, 'docOverflow'), unnamed: worst(id, 'unnamed') } };
});

const routeFile = (route) => {
  const r = route === '/' ? '' : route;
  const groups = route.startsWith('/dashboard') ? ['(dashboard)'] : route.startsWith('/avaliacao') ? ['(cockpit)', '(site)'] : route.startsWith('/futuro') ? ['(brand)', '(site)'] : ['(site)'];
  const candidates = groups.map((g) => `app/${g}${r}/page.tsx`);
  return candidates.find((c) => S.react.some((x) => x.file === c)) || candidates[0];
};
const routes = R.filter((r) => r.id.startsWith('react:') && r.viewport === 'desktop').map((r) => {
  const route = r.id.slice(6); const f = S.react.find((x) => x.file === routeFile(route)) || {};
  const id = r.id;
  const colors = (f.palette || 0) + (f.arbColor || 0) + (f.literalColors || 0);
  const c = {
    tokens: band(colors, 5), type: band(f.arbText || 0, 3),
    landmark: worst(id, 'main') > 1 ? 'F' : 'P',
    contrast: band(worst(id, 'contrastFailCount'), 10),
    names: band(worst(id, 'unnamed'), 3),
    responsive: worst(id, 'docOverflow') > 0 ? 'F' : 'P',
    hydration: hydration(id) ? 'F' : 'P',
  };
  return { id: route, grade: grade(c), fails: Object.values(c).filter((x) => x === 'F').length, c, m: { colors, arbText: f.arbText || 0, contrast: worst(id, 'contrastFailCount'), overflow: worst(id, 'docOverflow'), unnamed: worst(id, 'unnamed'), main: worst(id, 'main') } };
});

const comps = S.react.filter((r) => r.layer !== 'route').map((r) => {
  const colors = r.palette + r.arbColor + r.literalColors;
  const raw = r.rawButton + r.rawInput + r.rawTable;
  const shared = !r.layer.startsWith('kit:');
  const c = {
    tokens: r.layer === 'primitive' && colors <= 5 ? (colors ? 'W' : 'P') : band(colors, 5),
    type: band(r.arbText, 3), compose: band(raw, 3), inline: band(r.styleProp + r.emoji, 2),
    decoupled: shared && r.domainWords ? 'F' : 'P', layers: r.layerViolations.length ? 'F' : 'P',
    safety: r.dangerousHtml ? 'W' : 'P',
  };
  return { file: r.file, layer: r.layer, grade: grade(c, 2), c, m: { colors, arbText: r.arbText, raw, inline: r.styleProp + r.emoji, lines: r.lines, client: r.client, tested: r.tested, inRegistry: r.inRegistry } };
});

const tally = (a) => a.reduce((o, x) => ((o[x.grade] = (o[x.grade] || 0) + 1), o), {});
const out = { html, routes, comps, tallies: { html: tally(html), routes: tally(routes), comps: tally(comps) } };
fs.writeFileSync(path.join(A, 'grades.json'), JSON.stringify(out, null, 1));

const cell = (c) => Object.entries(c).filter(([, v]) => v !== 'P').map(([k, v]) => (v === 'F' ? k.toUpperCase() : k)).join(' ') || '-';
console.log('TALLIES', JSON.stringify(out.tallies));
console.log('\nHTML'); for (const h of html) console.log(h.grade, h.base, 'fails=' + h.fails, cell(h.c));
console.log('\nROUTES'); for (const r of routes) console.log(r.grade, r.id, cell(r.c), JSON.stringify(r.m));
console.log('\nCOMPONENTS by layer');
for (const l of [...new Set(comps.map((c) => c.layer))]) { const a = comps.filter((c) => c.layer === l); console.log(l, a.length, JSON.stringify(tally(a))); }
console.log('\nNON-A COMPONENTS'); for (const c of comps.filter((x) => x.grade !== 'A').sort((a, b) => a.grade.localeCompare(b.grade) || a.file.localeCompare(b.file)).reverse()) console.log(c.grade, c.file.replace('components/', ''), cell(c.c), `colors=${c.m.colors} text=${c.m.arbText} raw=${c.m.raw}`);
