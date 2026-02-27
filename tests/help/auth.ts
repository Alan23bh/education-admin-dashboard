import { expect, Page } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('/login');

  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  //   await page.getByLabel('Email').fill('alan23bh@gmail.com');
  //   await page.getByLabel('Password').fill('123456');
  //   await page.getByLabel('Email').fill(process.env.E2E_EMAIL ?? 'test@example.com');
  //   await page.getByLabel('Password').fill(process.env.E2E_PASSWORD ?? 'password123');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/app\/dashboard/);
}
