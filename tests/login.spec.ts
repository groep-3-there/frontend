import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles.ts';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Add the following lines to wait for different load states
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  await page.waitForLoadState('load', { timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 5000 });
});

test('get a challenge', async ({ page }) => {
  await page.route('*/**/api/v1/challenge/search?', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockSearchResult
    });
  });

  await page.route('*/**/api/v1/reaction/challenge/1', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockChallenge
    });
  });

  // You don't need to call page.goto again since it's done in beforeEach

  // Continue with your test steps
  await page.locator('div').filter({ hasText: /^Zoeken$/ }).first().click();
  await page.locator('div').filter({ hasText: /^Zoeken$/ }).first().click();
  await page.getByText('LogiTech Solutions BV zoekt').click({ delay: 1000 });
  await expect(page.getByRole('heading', { name: 'aaaaaaaaaaaaaaa' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Optimalisatie van Logistieke' })).toBeVisible();
});