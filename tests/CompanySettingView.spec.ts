import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles.ts';

test.beforeEach(async ({ page }) => {
  await page.route('*/**/api/v1/user/3', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockUserJelle
    });
  });

  await page.route('*/**/api/v1/auth/user', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockUserJelle
    });
  });

  await page.route('*/**/api/v1/role/assignable', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockAssignableRoles
    });
  });

  await page.route('*/**/api/v1/department/1/members', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockDepartmentMembers
    });
  });

  await page.goto('http://localhost:3000/');

  await page.getByText('Debug').click();
  await page.getByRole('button', { name: 'Medewerker Jelle' }).click();
  await page.getByText('Instellingen').click();
});

test('Change roles', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Jelle Jacobs' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Eline de Groot' })).toBeVisible();
  await page.getByRole('button', { name: 'Afdeling beheerder Open' }).click();
  await page.locator('div').filter({ hasText: /^Medewerker$/ }).nth(2).click();
  await page.getByRole('button', { name: 'Medewerker Open' }).nth(1).click();
  await page.locator('div').filter({ hasText: /^Medewerker$/ }).nth(2).click();
  await page.getByRole('button', { name: 'Update Rollen' }).click();
  await expect(page.getByText('Een afdeling heeft altijd een')).toBeVisible();
  await page.getByRole('button', { name: 'Medewerker Open' }).first().click();
  await page.getByText('Afdeling beheerder', { exact: true }).click();
  await page.getByRole('button', { name: 'Update Rollen' }).click();
});
