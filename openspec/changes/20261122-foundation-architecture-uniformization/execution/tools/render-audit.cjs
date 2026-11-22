// Read-only render audit. Only navigates (GET); never clicks or submits.
const path = require('path');
const fs = require('fs');
const repo = process.argv[2];
const outDir = process.argv[3];
const { chromium } = require(path.join(repo, 'node_modules/@playwright/test'));

const moved = fs.existsSync(path.join(repo, 'public/html/core/tokens.css'));
const htmlPages = (moved
  ? ['public/html/index.html', 'public/html/kits/avaliacao/index.html', 'public/html/kits/mission-control/index.html', 'public/html/kits/futuro-digital/galeria.html', 'public/html/kits/futuro-digital/index.html', 'public/blueprints/dashboard/mockups/reference.html', 'public/html/kits/cockpit-starter/index.html', 'public/html/kits/dashboard-starter/index.html', 'public/blueprints/dashboard/mockups/clean.html', 'public/blueprints/cockpit/mockups/mission-control.html']
  : ['index.html', ...['du-avaliacao-dashboard', 'du-dashboard', 'du-futuro-digital-galeria', 'du-futuro-digital', 'du-html-app-template', 'starter-cockpit', 'template-app-shell'].map((n) => `templates/${n}.html`), 'examples/du-clean-dashboard-mockup.html', 'examples/du-cockpit-mockup.html'].map((p) => `public/html-kit/${p}`))
  .map((p) => ({ id: 'html:' + p.replace(/^public\/html-kit\//, '').replace(/^public\//, ''), url: 'file://' + path.join(repo, p) }));
const routes = ['/', '/dashboard', '/dashboard/actions', '/dashboard/agents', '/dashboard/charts', '/dashboard/inspection', '/dashboard/library', '/dashboard/matrix', '/dashboard/metrics', '/dashboard/workflow', '/dashboard/workshops', '/avaliacao-dashboard', '/avaliacao-dashboard/admin', '/avaliacao-dashboard/trainer', '/futuro-digital', '/futuro-digital/galeria']
  .map((r) => ({ id: 'react:' + r, url: 'http://127.0.0.1:4300' + r }));
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };

function inspect() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1; const ctx = cv.getContext('2d', { willReadFrequently: true });
  const rgba = (c) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const over = (f, b) => { const a = f[3]; return [0, 1, 2].map((i) => f[i] * a + b[i] * (1 - a)).concat(1); };
  const lum = (c) => { const v = c.slice(0, 3).map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const visible = (e) => { const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const bgOf = (e) => { const layers = []; for (let n = e; n; n = n.parentElement) { const s = getComputedStyle(n); if (s.backgroundImage !== 'none') return null; const c = rgba(s.backgroundColor); if (c[3] > 0) { layers.push(c); if (c[3] === 1) break; } } let b = [255, 255, 255, 1]; if (layers.length && layers[layers.length - 1][3] === 1) b = layers.pop(); for (const l of layers.reverse()) b = over(l, b); return b; };
  const nameOf = (e) => (e.getAttribute('aria-label') || e.getAttribute('title') || e.innerText || e.value || (e.getAttribute('aria-labelledby') && document.getElementById(e.getAttribute('aria-labelledby'))?.innerText) || e.querySelector?.('img[alt],svg title')?.textContent || e.querySelector?.('img')?.alt || '').trim();
  const all = [...document.querySelectorAll('body *')];
  const vw = document.documentElement.clientWidth;
  let contrastChecked = 0; const contrastFails = {}; let contrastFailCount = 0;
  for (const e of all) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'OPTION'].includes(e.tagName.toUpperCase())) continue;
    if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    if (!visible(e) || e.closest('[aria-hidden="true"],[disabled]')) continue;
    const bg = bgOf(e); if (!bg) continue; const s = getComputedStyle(e); const fg = over(rgba(s.color), bg); const size = parseFloat(s.fontSize); const bold = +s.fontWeight >= 700;
    const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5; const r = ratio(fg, bg); contrastChecked++;
    if (r < need - 0.01) { contrastFailCount++; const k = (e.className && typeof e.className === 'string' ? e.className.split(/\s+/).slice(0, 2).join('.') : e.tagName.toLowerCase()) || e.tagName.toLowerCase(); contrastFails[k] = Math.min(contrastFails[k] ?? 99, +r.toFixed(2)); }
  }
  const interactive = all.filter((e) => e.matches('a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=tab],[role=switch],[role=menuitem]') && visible(e));
  const unnamed = interactive.filter((e) => { if (e.matches('input,select,textarea')) return !(e.labels?.length || e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || e.getAttribute('title')); return !nameOf(e); });
  const small = interactive.filter((e) => { if (e.matches('a') && e.closest('p,li') && getComputedStyle(e).display === 'inline') return false; const r = e.getBoundingClientRect(); return r.width < 24 || r.height < 24; });
  const beyond = all.filter((e) => { if (!visible(e)) return false; const r = e.getBoundingClientRect(); if (r.right <= vw + 1) return false; for (let p = e.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p); if (/(auto|scroll|hidden|clip)/.test(o.overflowX) && p !== document.body && p !== document.documentElement) return false; if (o.position === 'fixed') return false; } return true; });
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map((h) => +h.tagName[1]);
  let skips = 0; for (let i = 1; i < heads.length; i++) if (heads[i] > heads[i - 1] + 1) skips++;
  const fonts = {}; const sizes = {}; const radii = {};
  for (const e of all) { if (!visible(e)) continue; const s = getComputedStyle(e); if ([...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) { const fam = s.fontFamily.split(',')[0].replace(/["']/g, '').trim(); fonts[fam] = (fonts[fam] || 0) + 1; sizes[s.fontSize] = (sizes[s.fontSize] || 0) + 1; } if (s.borderTopLeftRadius !== '0px' && !s.borderTopLeftRadius.includes('%')) radii[s.borderTopLeftRadius] = (radii[s.borderTopLeftRadius] || 0) + 1; }
  const body = getComputedStyle(document.body);
  const shellSidebar = document.querySelector('.du-sidebar');
  const shellRect = shellSidebar?.getBoundingClientRect();
  const sidebarBlocks = shellSidebar && innerWidth < 768 && visible(shellSidebar) && shellRect.right > 0 && getComputedStyle(shellSidebar).position !== 'fixed' ? 1 : 0;
  return {
    sidebarBlocks,
    title: document.title, h1Text: [...document.querySelectorAll('h1')].filter(visible).map((h) => h.innerText.trim().slice(0, 50)), textLength: document.body.innerText.length,
    lang: document.documentElement.lang || null, main: document.querySelectorAll('main,[role=main]').length, h1: heads.filter((h) => h === 1).length, headingSkips: skips,
    imgNoAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length, interactive: interactive.length, unnamed: unnamed.length, unnamedSample: unnamed.slice(0, 4).map((e) => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(/\s+/)[0] : '')),
    smallTargets: small.length, docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, elementsBeyond: beyond.length,
    contrastChecked, contrastFailCount, contrastFails: Object.entries(contrastFails).sort((a, b) => a[1] - b[1]).slice(0, 6),
    fonts, sizes: Object.keys(sizes).length, radii: Object.keys(radii).length, bodyBg: body.backgroundColor,
    regions: { sidebar: document.querySelectorAll('aside,[data-sidebar=sidebar],[data-slot=sidebar]').length, header: document.querySelectorAll('header').length, nav: document.querySelectorAll('nav').length, footer: document.querySelectorAll('footer').length, table: document.querySelectorAll('table').length, dialog: document.querySelectorAll('dialog,[role=dialog]').length },
  };
}

(async () => {
  fs.mkdirSync(path.join(outDir, 'shots'), { recursive: true });
  const browser = await chromium.launch();
  const results = [];
  for (const page of [...htmlPages, ...routes]) {
    for (const [vpName, viewport] of Object.entries(viewports)) {
      const ctx = await browser.newContext({ viewport, reducedMotion: 'reduce', serviceWorkers: 'block' });
      const p = await ctx.newPage();
      const errors = [], consoleErrors = [], external = [], failed = [];
      p.on('pageerror', (e) => errors.push(String(e.message).slice(0, 120)));
      p.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 120)); });
      p.on('requestfailed', (r) => { if (!r.url().startsWith('data:') && !external.includes(new URL(r.url()).host)) failed.push(r.url().slice(-60)); });
      // Block everything that is not file:// or the local dev server; only GET is allowed through.
      await ctx.route('**/*', (r) => {
        const u = new URL(r.request().url());
        if (r.request().method() !== 'GET' && u.protocol !== 'file:') return r.abort();
        if (u.protocol === 'file:' || u.protocol === 'data:' || u.protocol === 'blob:' || u.hostname === 'localhost' || u.hostname === '127.0.0.1') return r.continue();
        if (!external.includes(u.host)) external.push(u.host);
        return r.abort();
      });
      const rec = { id: page.id, viewport: vpName, themes: {} };
      try {
        const res = await p.goto(page.url, { waitUntil: 'load', timeout: 90000 });
        rec.status = res ? res.status() : null;
        await p.waitForTimeout(page.id.startsWith('react') ? 1800 : 500);
        for (const theme of ['light', 'dark']) {
          await p.evaluate((t) => { const c = document.documentElement.classList; c.toggle('dark', t === 'dark'); c.toggle('light', t === 'light'); document.documentElement.style.colorScheme = t; }, theme);
          await p.waitForTimeout(250);
          rec.themes[theme] = await p.evaluate(inspect);
          const safe = page.id.replace(/[^a-z0-9]+/gi, '_');
          if ((vpName === 'desktop' && theme === 'light') || (vpName === 'mobile' && theme === 'dark')) await p.screenshot({ path: path.join(outDir, 'shots', `${safe}__${vpName}_${theme}.jpg`), type: 'jpeg', quality: 55 });
        }
      } catch (e) { rec.error = String(e.message).slice(0, 160); }
      rec.pageErrors = [...new Set(errors)]; rec.consoleErrors = [...new Set(consoleErrors)].slice(0, 5); rec.external = external; rec.failed = [...new Set(failed)].slice(0, 5);
      results.push(rec);
      await ctx.close();
      console.log(page.id, vpName, rec.status ?? 'ERR', rec.error ? 'FAIL' : 'ok');
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(outDir, 'render.json'), JSON.stringify(results, null, 1));
})();
