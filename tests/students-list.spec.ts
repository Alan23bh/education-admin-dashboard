import { test, expect } from '@playwright/test';
import { login } from './help/auth';

test('students list: search, filter, and open profile', async ({ page }) => {
  await login(page);

  await page.getByRole('link', { name: /^students$/i }).click();

  await expect(page).toHaveURL(/\/app\/students/);
  await expect(page.getByRole('heading', { name: /^students$/i })).toBeVisible();

  const search = page.getByLabel(/search students/i);

  await search.fill('Ava');

  const cards = page.locator('a.student-card');

  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Ava Nguyen');

  await page.getByRole('button', { name: /clear/i }).click();

  await page
    .getByRole('tablist', { name: /filter students/i })
    .getByRole('button', { name: /^at risk$/i })
    .click();

  const filteredCards = page.locator('a.student-card');

  await expect(filteredCards.first()).toBeVisible();

  await filteredCards.first().click();

  await expect(page).toHaveURL(/\/app\/students\/\d+/);
  await expect(page.getByRole('link', { name: /back to students/i })).toBeVisible();
});
