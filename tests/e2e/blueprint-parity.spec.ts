import fs from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

const manifest = JSON.parse(fs.readFileSync('foundation.manifest.json', 'utf8'));
const regionsOf = (id: string) => manifest.blueprints.find((b: { id: string }) => b.id === id).regions as string[];

async function assertLayout(page: Page) {
  await expect(page.locator('main')).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  const clipped = await page.evaluate(() => {
    const docOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const view = document.querySelector('.du-view-container');
    return docOverflow + (view ? Math.max(0, view.scrollWidth - view.clientWidth) : 0);
  });
  expect(clipped).toBe(0);
}

for (const kit of manifest.kits) {
  const urls = [
    ...(kit.react?.routes ?? []).filter((u: string) => !/\/(trainer|admin)$/.test(u)),
    ...(kit.html?.entries ?? []).map((e: string) => '/' + e.replace(/^public\//, '')),
  ];
  for (const url of urls) {
    test(`${kit.id} ${url} follows ${kit.blueprint}`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator(`[data-blueprint="${kit.blueprint}"]`).first()).toBeVisible();
      const regions = kit.gateFirst ? ['gate'] : regionsOf(kit.blueprint);
      for (const region of regions) await expect(page.locator(`[data-region="${region}"]`).first()).toBeAttached();
      await assertLayout(page);
    });
  }
}

test('avaliacao trainer view follows cockpit after login', async ({ page }) => {
  await page.goto('/avaliacao-dashboard');
  for (const digit of ['1', '2', '3', '4']) await page.getByRole('button', { name: digit, exact: true }).click();
  await page.getByRole('button', { name: /Entrar no Painel do Formador/ }).click();
  await expect(page).toHaveURL(/\/avaliacao-dashboard\/trainer/);
  for (const region of regionsOf('cockpit')) await expect(page.locator(`[data-region="${region}"]`).first()).toBeAttached();
  await assertLayout(page);
});

test('avaliacao admin view follows cockpit after login', async ({ page }) => {
  await page.goto('/avaliacao-dashboard');
  await page.getByRole('button', { name: /Admin/i }).click();
  await page.getByPlaceholder('••••••••••••').fill('admin123');
  await page.getByRole('button', { name: /Aceder ao Cockpit Administrativo/i }).click();
  await expect(page).toHaveURL(/\/avaliacao-dashboard\/admin/);
  for (const region of regionsOf('cockpit')) await expect(page.locator(`[data-region="${region}"]`).first()).toBeAttached();
  await assertLayout(page);
});
