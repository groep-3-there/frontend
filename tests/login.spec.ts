import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://161.35.84.133/');
  });

test('login as admin', async ({ page }) => {
    await page.getByText('Login/Registreer').click();
    await page.getByPlaceholder('naam@email.com').click();
    await page.getByPlaceholder('naam@email.com').fill('Admin@kapper.nl');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('kapper123123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Hallo Adminline' })).toBeVisible();
    await expect(page.getByText('Adminline', { exact: true })).toBeVisible();
});