import { test, expect } from '@playwright/test';

test('user can login and reach dashboard', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  // Fill form
  await page.getByLabel('Email').fill('alan23bh@gmail.com');
  await page.getByLabel('Password').fill('123456');

  // Click login
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Assert navigation away from login

  await expect(page).toHaveURL(/\/app\/dashboard/);
});
