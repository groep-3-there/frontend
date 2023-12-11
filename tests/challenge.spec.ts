import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test('get a challenge', async ({ page }) => {
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

  await page.locator('div').filter({ hasText: /^Zoeken$/ }).first().click();
  console.log(await page.content())
  await page.getByRole('heading', { name: 'Optimalisatie van Logistieke' }).click();
  await expect(page.getByRole('heading', { name: 'Optimalisatie van Logistieke' })).toBeVisible();
  await expect(page.getByText('LogiTech Solutions BV staat')).toBeVisible();
  
});