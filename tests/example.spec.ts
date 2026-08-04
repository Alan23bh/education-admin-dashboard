import { test, expect } from '@playwright/test';

test('user can enter the demo dashboard', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByText(/portfolio demo — no account required/i)).toBeVisible();

  await page.getByRole('button', { name: /enter demo dashboard/i }).click();

  await expect(page).toHaveURL(/\/app\/dashboard/);
});
