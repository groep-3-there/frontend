import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles.ts';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.route('*/**/api/v1/auth/user', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockChallengerEline
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
});

test('view company', async ({ page }) => {
    await page.getByText('Debug').click();
    await page.getByRole('button', { name: 'Challenger Eline' }).click();
    await page.getByText('Kapper Eline', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Bedrijfsprofiel' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kapper Eline' })).toBeVisible();
  });