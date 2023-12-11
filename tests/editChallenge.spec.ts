import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.route('*/**/api/v1/challenge/2', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockKapperzaak
    });
  });

  await page.route('*/**/api/v1/auth/user', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockChallengerEline
    });
  });

  await page.route('*/**/api/v1/challenge/company/1', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockChallengeByCompany
    });
  });

  await page.route('*/**/api/v1/company/1/members', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockCompanyMembers
    });
  });

  await page.route('*/**/api/v1/company/1', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockCompany
    });
  });

  await page.route('*/**/api/v1/department/company/1', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockDepartment
    });
  });

  await page.route('*/**/api/v1/tags', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockTags
    });
  });

  await page.route('*/**/api/v1/challenge/update', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockEditKapperzaak
    });
  });
});

test('edit challenge', async ({ page }) => {
    await page.getByText('Debug').click();
    await page.getByRole('button', { name: 'Challenger Eline' }).click();
    await page.getByText('Kapper Eline', { exact: true }).click();
    await page.locator('div').filter({ hasText: /^Kapper Eline$/ }).first().press('ArrowDown');
    await page.locator('div').filter({ hasText: /^Challenge maken$/ }).first().press('ArrowDown');
    await page.getByText('BedrijfsprofielKapper ElineNetherlandsGezondheidszorg en maatschappelijke').click();
    await page.getByText('Innovatie kapperszaak').click();
    await page.getByRole('button', { name: '󰇘' }).click();
    await page.getByText('Bewerken').click();
    await page.getByLabel('Titel').click();
    await page.getByLabel('Titel').fill('Innovatie kapsalon');
    await page.getByRole('button', { name: 'Bewerken' }).click();
    await expect(page.getByText('De challenge is succesvol')).toBeVisible();
  });
