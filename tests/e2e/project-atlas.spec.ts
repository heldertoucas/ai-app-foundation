import { test, expect } from '@playwright/test';

test.describe('Project Atlas E2E Flow', () => {
  test('should render public landing page and navigate to dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Orchestrate projects');
    
    await page.click('text=Open Dashboard');
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Project Atlas Dashboard');
  });
});
