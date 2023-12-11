// import { test, expect } from '@playwright/test';
// import * as jsonFiles from './jsonFiles';
//
// test.beforeEach(async ({ page }) => {
//   await page.route('*/**/api/v1/user/1', async (route) => {
//     await route.fulfill({
//       json: jsonFiles.mockUserMatchmaker
//     });
//   });
//
//   await page.route('*/**/api/v1/auth/user', async (route) => {
//     await route.fulfill({
//       json: jsonFiles.mockUserMatchmaker
//     });
//   });
//
//   await page.route('*/**/api/v1/tags', async (route) => {
//     await route.fulfill({
//       json: jsonFiles.mockTags
//     });
//   });
//
//   await page.route('*/**/api/v1/company-request*', async (route) => {
//     await route.fulfill({
//       json: jsonFiles.mockCompanyRequest
//     });
//   });
//
//   await page.route('*/**/api/v1/company-request/2/acc', async (route) => {
//     await route.fulfill();
//   });
//
//   await page.route('*/**/api/v1/company-request/3/*', async (route) => {
//     await route.fulfill();
//   });
//
//   await page.goto('http://localhost:3000/');
//
//   await page.getByText('Debug').click();
//   await page.getByRole('button', { name: 'MatchMaker' }).click();
// });
//
// test('Open company pop up', async ({ page }) => {
//   await page.getByText('Bedrijfsaanvragen').click();
//   await expect(page.getByRole('heading', { name: 'Bedrijfsaanvragen' })).toBeVisible();
//   await expect(page.getByRole('heading', { name: 'Netherlands Kapper Eline' })).toBeVisible();
//   // await expect(page.getByRole('heading', { name: 'Netherlands Bakker Bart' })).toBeVisible();
//   await page.locator('.mdi-thumbs-up-down').first().click();
//   await expect(page.getByRole('button', { name: 'Afwijzen' })).toBeVisible();
//   await expect(page.getByRole('button', { name: 'Goedkeuren' })).toBeVisible();
//   await page.locator('.popup > .v-container > div > div:nth-child(2)').click();
// });
