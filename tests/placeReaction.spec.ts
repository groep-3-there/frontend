import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.route('*/**/api/v1/auth/user', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockChallengerEline
    });
  });

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

  await page.route('*/**/api/v1/reaction/create/1', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockReaction
    });
  });

  await page.route('*/**/api/v1/reaction/challenge/1', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockReaction
    });
  });
});

test('place reaction on challenge', async ({ page }) => {
    await page.getByText('Debug').click();
    await page.getByRole('button', { name: 'Challenger Eline' }).click();
    await page.getByText('Zoeken').click();
    await page.getByText('LogiTech Solutions BV zoekt').click();
    await page.locator('div').filter({ hasText: /^Uw reactie$/ }).nth(3).click();
    await page.locator('.tiptap').fill('Yo dit is een nieuw idee');
    await page.getByRole('button', { name: 'Plaatsen' }).click();
    await expect(page.locator('span').filter({ hasText: 'Idee' }).nth(1)).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Yo dit is een nieuw idee' }).getByRole('paragraph')).toBeVisible();
  });
