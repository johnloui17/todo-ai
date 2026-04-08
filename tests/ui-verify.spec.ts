import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 375, height: 812 }, // iPhone 13/14 size for mobile-first PWA check
  deviceScaleFactor: 2,
});

test('Capture Screenshots of all screens', async ({ page }) => {
  // 1. Dashboard (Home)
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/01-dashboard.png' });
  await expect(page.locator('h1')).toContainText('Dashboard');

  // 2. Task Pool
  await page.click('a[href="/pool"]');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/02-pool.png' });
  await expect(page.locator('h1')).toContainText('Task Pool');

  // 3. Not-Todos
  await page.click('a[href="/not-todos"]');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/03-not-todos.png' });
  await expect(page.locator('h1')).toContainText('Not-Todos');

  // 4. Settings
  await page.click('a[href="/settings"]');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/04-settings.png' });
  await expect(page.locator('h1')).toContainText('Settings');

  // 5. Category Detail (Mocking a category navigation)
  await page.goto('http://localhost:3000/category/work');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/05-category-detail.png' });
  // Check if it's the category page (it should have a back button or specific title)
  await expect(page.locator('header')).toBeVisible();
});
