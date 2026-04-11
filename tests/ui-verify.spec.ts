import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 375, height: 812 }, // iPhone 13/14 size for mobile-first PWA check
  deviceScaleFactor: 2,
});

test('Capture Screenshots of all screens', async ({ page }) => {
  // 1. Dashboard (Home)
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('load');
  // Wait for h1 to be visible and contain text
  await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });
  await page.screenshot({ path: 'screenshots/01-dashboard.png' });

  // 2. Task Pool
  await page.click('a[href="/pool"]');
  await page.waitForURL('**/pool');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({ path: 'screenshots/02-pool.png' });

  // 3. Not-Todos
  await page.click('a[href="/not-todos"]');
  await page.waitForURL('**/not-todos');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({ path: 'screenshots/03-not-todos.png' });

  // 4. Settings
  await page.click('a[href="/settings"]');
  await page.waitForURL('**/settings');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({ path: 'screenshots/04-settings.png' });

  // 5. Category Detail (Mocking a category navigation)
  // Since there are no real categories in a fresh DB, we'll skip detail for automated test if it fails
  try {
    await page.goto('http://localhost:3000/category/work');
    await page.waitForLoadState('load');
    await page.screenshot({ path: 'screenshots/05-category-detail.png' });
  } catch (e) {}
});
