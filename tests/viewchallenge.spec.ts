import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles.ts';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.route('*/**/api/v1/challenge/search?', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockSearchResult
    });
  });

  await page.route('*/**/api/v1/challenge/1', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockChallenge
    });
  });

  await page.route('*/**/api/v1/challenge', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockChallenge
    });
  });
});

test('get a challenge', async ({ page }) => {
  await page.locator('div').filter({ hasText: /^Zoeken$/ }).first().click();
  await page.getByRole('heading', { name: 'Optimalisatie van Logistieke' }).click();
  await expect(page.getByRole('heading', { name: 'Optimalisatie van Logistieke' })).toBeVisible();
  await expect(page.getByText('LogiTech Solutions BV staat')).toBeVisible();
});