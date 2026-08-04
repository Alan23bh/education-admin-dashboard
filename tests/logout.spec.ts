import { test, expect } from '@playwright/test';
import { login } from './help/auth';

test('logout returns to login and prevents accessing protected pages', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: /logout/i }).click();

  await expect(page).toHaveURL(/\/login/);

  await page.goto('/app/dashboard');

  await expect(page).toHaveURL(/\/login/);

  await expect(page.getByRole('button', { name: /enter demo dashboard/i })).toBeVisible();
});
