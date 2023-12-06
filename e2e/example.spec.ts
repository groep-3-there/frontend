import { test, expect } from "@playwright/test";

test('Login als admin', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByText('Login/Registreer').click();
  await page.getByPlaceholder('naam@email.com').click();
  await page.getByPlaceholder('naam@email.com').fill('admin@kapper.nl');
  await page.getByPlaceholder('naam@email.com').press('Tab');
  await page.getByLabel('Wachtwoord', { exact: true }).click();
  await page.getByLabel('Wachtwoord', { exact: true }).fill('kapper123123');
  await page.getByRole('button', { name: 'Login' }).click();
});