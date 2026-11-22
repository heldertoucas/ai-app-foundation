import { test, expect } from '@playwright/test';

test.describe('Project Atlas E2E Flow', () => {
  test('should render public landing page and navigate to dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Construa portais');
    
    await page.getByRole('link', { name: 'Abrir Dashboard' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Project Atlas');
  });
});
