import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.route('*/**/api/v1/challenge', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockCreateChallenge
    });
  });

  await page.route('*/**/api/v1/challenge/5', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockCreateChallenge
    });
  });

  await page.route('*/**/api/v1/auth/user', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockChallengerEline
    });
  });
});

test('create a challenge', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^Debug$/ }).first().click();
    await page.getByRole('button', { name: 'Challenger Eline' }).click();
    await page.getByText('Challenge maken').click();
    await page.locator('div').filter({ hasText: /^Challenge maken$/ }).first().click();
    await page.getByLabel('Titel').click();
    await page.getByLabel('Titel').fill('Test Challenge');
    await page.getByLabel('Samenvatting').click();
    await page.getByLabel('Samenvatting').fill('test beschrijving');
    await page.locator('.tiptap').first().click();
    await page.locator('.tiptap').first().fill('test beschrijving');
    await page.locator('div:nth-child(4) > .v-col > div > .edit-box > .editing > .tiptap').click();
    await page.locator('div:nth-child(4) > .v-col > div > .edit-box > .editing > .tiptap').fill('contact');
    await page.getByRole('button', { name: 'Zichtbaarheid Open' }).click();
    await page.getByText('Publiek').click();
    await page.getByLabel('Einddatum').fill('2023-12-10');
    await page.getByRole('button', { name: 'Aanmaken' }).click();
    await page.waitForTimeout(60000); // Wait for 60 seconds
    await expect(page.getByRole('heading', { name: 'Test Challenge' })).toBeVisible();
    await expect(page.locator('section').filter({ hasText: 'Samenvattingtest beschrijving' }).getByRole('paragraph')).toBeVisible();
  });
