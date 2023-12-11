import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles';

test.beforeEach(async ({ page }) => {
  await page.route('*/**/api/v1/user/2', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockProfileEline
    });
  });

  await page.route('*/**/api/v1/auth/user', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockProfileEline
    });
  });

  await page.route('*/**/api/v1/tags', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockTags
    });
  });

  await page.goto('http://localhost:3000/');

  await page.getByText('Debug').click();
  await page.getByRole('button', { name: 'Challenger Eline' }).click();
  await page.getByText('Eline de Groot').click();
});

test('View profile', async ({ page }) => {
  await page.getByText('Eline de GrootChallenger bij Kapper ElineHomeDebugZoekenUw bedrijfKapper ElineChallenge makenLog uitPersoonsprofielEline de Groot 1 januari 2020kappertechnologieinnovatieHoiii ik ben Eline, enthousiaste kapster.BedrijfManagement | Kapper ElineContact challenger@kapper.nl').click();
    await expect(page.getByRole('heading', { name: 'Eline de Groot' })).toBeVisible();
    await page.locator('div').filter({ hasText: /^PersoonsprofielEline de Groot$/ }).first().click();
    await expect(page.getByRole('heading', { name: 'Persoonsprofiel' })).toBeVisible();
  });

test('Edit profile', async ({ page }) => {
  await page.getByRole('button', { name: '󰇘' }).click();
  await page.locator('.mdi-pencil').click();
  await page.getByLabel('Naam').click();
  await page.getByLabel('Naam').fill('Eline de Aangepaste');
  await page.getByRole('button', { name: 'Profiel bewerken' }).click();
  await expect(page.getByText('Uw profiel is succesvol')).toBeVisible();
});
