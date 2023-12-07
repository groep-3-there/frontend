import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles.ts';
import { assert } from 'console';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
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

    await page.goto('http://localhost:3000/');
    await page.locator('div').filter({ hasText: /^Zoeken$/ }).first().click();
    await page.locator('div').filter({ hasText: /^Zoeken$/ }).first().click();
    await page.getByText('LogiTech Solutions BV zoekt').click({delay: 1000});
    await expect(page.getByRole('heading', { name: 'Optimalisatie van Logistieke' })).toBeVisible();
});