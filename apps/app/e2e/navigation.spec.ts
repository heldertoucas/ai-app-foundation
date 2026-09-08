import { test, expect } from "@playwright/test";

test.describe("Foundation Navigation & Smoke Flow", () => {
  test("loads main app page cleanly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Acme Inc|Foundation/i);
    await expect(page.getByText(/Welcome to your AI App Foundation/i)).toBeVisible();
  });

  test("navigates to workshop catalog and displays KPI cards", async ({ page }) => {
    await page.goto("/workshops");
    await expect(page.getByText("Workshop Management")).toBeVisible();
    await expect(page.getByText("Total Workshops")).toBeVisible();
    await expect(page.getByText("Total Seat Capacity")).toBeVisible();
    await expect(page.getByText("Intro to Agentic Engineering with Next.js")).toBeVisible();
  });
});
