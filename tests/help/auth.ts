import { expect, Page } from '@playwright/test';

export async function login(page: Page): Promise<void> {
  await page.goto('/login');

  await page.getByRole('button', { name: /enter demo dashboard/i }).click();

  await expect(page).toHaveURL(/\/app\/dashboard/);
}
