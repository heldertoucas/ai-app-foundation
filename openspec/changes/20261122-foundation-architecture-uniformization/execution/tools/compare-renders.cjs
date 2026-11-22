// Compares two HTML pages from file:// with external network blocked.
// Usage: node compare-renders.cjs <repo-with-node_modules> <before.html> <after.html> [maxDiffPercent=0.5]
// Exit 0 = under threshold, no page errors and no CSP violations in the "after" page.
const path = require('path');
const [repo, before, after, max = '0.5'] = process.argv.slice(2);
const { chromium } = require(path.join(path.resolve(repo), 'node_modules/@playwright/test'));
const VIEWPORTS = [{ width: 1440, height: 900 }, { width: 390, height: 844 }];

async function shot(browser, file, viewport, theme) {
  const ctx = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && /Content Security Policy/i.test(m.text())) errors.push('csp: ' + m.text().slice(0, 140)); });
  await ctx.route('**/*', (r) => (new URL(r.request().url()).protocol === 'file:' || r.request().url().startsWith('data:') ? r.continue() : r.abort()));
  await page.goto('file://' + path.resolve(file), { waitUntil: 'load' });
  await page.waitForTimeout(350);
  await page.evaluate((t) => { document.documentElement.classList.toggle('dark', t === 'dark'); }, theme);
  await page.waitForTimeout(150);
  const png = (await page.screenshot({ fullPage: false })).toString('base64');
  await ctx.close();
  return { png, errors };
}

(async () => {
  const browser = await chromium.launch(); let failed = false;
  const cmp = await browser.newPage();
  for (const viewport of VIEWPORTS) for (const theme of ['light', 'dark']) {
    const a = await shot(browser, before, viewport, theme); const b = await shot(browser, after, viewport, theme);
    const pct = await cmp.evaluate(async ({ x, y }) => {
      const load = (s) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = 'data:image/png;base64,' + s; });
      const [p, q] = await Promise.all([load(x), load(y)]);
      const data = (im) => { const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const g = c.getContext('2d'); g.drawImage(im, 0, 0); return g.getImageData(0, 0, im.width, im.height).data; };
      const d1 = data(p), d2 = data(q); let diff = 0;
      for (let i = 0; i < d1.length; i += 4) if (Math.abs(d1[i] - d2[i]) + Math.abs(d1[i + 1] - d2[i + 1]) + Math.abs(d1[i + 2] - d2[i + 2]) > 30) diff++;
      return (diff / (d1.length / 4)) * 100;
    }, { x: a.png, y: b.png });
    const ok = pct <= Number(max) && b.errors.length === 0; failed ||= !ok;
    console.log(`${ok ? 'OK ' : 'BAD'} ${viewport.width}px ${theme} diff=${pct.toFixed(3)}% errors=${b.errors.length}${b.errors.length ? ' ' + b.errors.slice(0, 2).join(' | ') : ''}`);
  }
  await browser.close(); process.exit(failed ? 1 : 0);
})();
