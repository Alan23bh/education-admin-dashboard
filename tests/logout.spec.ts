import { test, expect } from '@playwright/test';
import { login } from './help/auth';

test('logout returns to login and prevents accessing protected pages', async ({ page }) => {
  await login(page);

  // Click Logout (top-right)
  await page.getByRole('button', { name: /logout/i }).click();

  // Back to login
  await expect(page).toHaveURL(/\/login/);

  // Try to go directly to dashboard; should bounce back to login (guard works)
  await page.goto('/app/dashboard');
  await expect(page).toHaveURL(/\/login/);

  // Login form still visible
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});
