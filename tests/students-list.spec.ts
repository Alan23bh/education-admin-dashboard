import { test, expect } from '@playwright/test';
import { login } from './help/auth';

test('students list: search + filter + open profile', async ({ page }) => {
  await login(page);

  await page.getByRole('link', { name: /^students$/i }).click();
  await expect(page).toHaveURL(/\/app\/students/);
  await expect(page.getByRole('heading', { name: /^students$/i })).toBeVisible();

  const search = page.getByLabel(/search students/i);
  await expect(search).toBeVisible();
  await search.fill('Ava');

  const cards = page.locator('a.student-card');
  await expect(cards.first()).toBeVisible();

  await page
    .getByRole('tablist', { name: /filter students/i })
    .getByRole('button', { name: /at risk/i })
    .click();

  await page.waitForTimeout(500);

  const filteredCards = page.locator('a.student-card');

  if ((await filteredCards.count()) > 0) {
    await expect(filteredCards.first()).toBeVisible();

    const href = await filteredCards.first().getAttribute('href');
    expect(href).toBeTruthy();

    await page.goto(href!);
    await expect(page).toHaveURL(/\/app\/students\/\d+/);
  } else {
    await expect(page.getByText(/no results/i)).toBeVisible();
  }
});
