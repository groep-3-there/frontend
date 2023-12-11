import { test, expect } from '@playwright/test';
import * as jsonFiles from './jsonFiles';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.route('*/**/api/v1/auth/user', async (route) => {
    await route.fulfill({
      json: jsonFiles.mockUserAdminline
    });
  });
});

test('login test', async ({ page }) => {
    await page.getByText('Login/Registreer').click();
    await page.getByPlaceholder('naam@email.com').click();
    await page.getByPlaceholder('naam@email.com').fill('admin@kapper.nl');
    await page.getByPlaceholder('naam@email.com').press('Tab');
    await page.getByLabel('Wachtwoord', { exact: true }).fill('kapper123123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Adminline')).toBeVisible();
    await expect(page.getByRole('heading', { name: '⭐Nieuwste challenges van' })).toBeVisible();
  });
