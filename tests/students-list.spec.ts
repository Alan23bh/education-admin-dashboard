import { test, expect } from '@playwright/test';
import { login } from './help/auth';

test('students list: search + filter + open profile', async ({ page }) => {
  await login(page);

  // Go to Students
  await page.getByRole('link', { name: /^students$/i }).click();
  await expect(page).toHaveURL(/\/app\/students/);

  // Page header
  await expect(page.getByRole('heading', { name: /^students$/i })).toBeVisible();

  // Search (aria-label="Search students" is PERFECT)
  const search = page.getByLabel('Search students');
  await search.fill('Ava');

  // Expect at least one result card
  const cards = page.locator('a.student-card');
  await expect(cards.first()).toBeVisible();

  // Optional: assert the visible card contains the searched name
  await expect(page.getByRole('heading', { level: 3 })).toContainText(/ava/i);

  // Filter tablist (role="tablist" + aria-label="Filter students" is PERFECT)
  await page
    .getByRole('tablist', { name: /filter students/i })
    .getByRole('button', { name: /at risk/i })
    .click();

  // Still should show cards OR empty state (both are valid depending on your mock data)
  const emptyState = page.getByRole('heading', { name: /no results found/i });
  if (await emptyState.isVisible()) {
    // If no results under that filter, clear search and ensure it recovers
    await page.getByRole('button', { name: /clear$/i }).click();
    await expect(cards.first()).toBeVisible();
  } else {
    await expect(cards.first()).toBeVisible();
  }

  // Open first student profile via routerLink
  // await cards.first().click();
  // await expect(page).toHaveURL(/\/app\/students\/\w+/);
  // Capture the href first (from a stable snapshot), then navigate
  const firstCard = page.locator('a.student-card').first();
  await expect(firstCard).toBeVisible();

  const href = await firstCard.getAttribute('href');
  if (!href) throw new Error('Student card href not found');

  await page.goto(href);
  await expect(page).toHaveURL(/\/app\/students\/\d+/);
});
