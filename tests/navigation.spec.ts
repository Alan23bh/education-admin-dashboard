import { test, expect } from '@playwright/test';
import { login } from './help/auth';

test('sidebar navigation: dashboard -> students -> dashboard', async ({ page }) => {
  await login(page);

  // Go to Students
  await page.getByRole('link', { name: /^students$/i }).click();
  await expect(page).toHaveURL(/\/app\/students/);

  // "Students" page should show a page heading
  await expect(page.getByRole('heading', { name: /students/i })).toBeVisible();

  // Back to Dashboard
  await page.getByRole('link', { name: /^dashboard$/i }).click();
  await expect(page).toHaveURL(/\/app\/dashboard/);

  // Dashboard heading visible
  await expect(page.getByRole('heading', { name: /^dashboard$/i })).toBeVisible();
});
//This is a navigation / routing test.
