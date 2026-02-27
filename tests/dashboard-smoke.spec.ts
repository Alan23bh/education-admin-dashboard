import { test, expect } from '@playwright/test';
import { login } from './help/auth';

test('dashboard smoke: key widgets render', async ({ page }) => {
  await login(page);

  // Heading
  await expect(page.getByRole('heading', { name: /^dashboard$/i })).toBeVisible();

  // KPI labels (text-based, stable)
  await expect(page.getByText('Total Students')).toBeVisible();
  await expect(page.getByText('Average Grade', { exact: true })).toBeVisible();
  await expect(page.getByText('Attendance Rate')).toBeVisible();

  // Sections (also stable)
  await expect(page.getByText('Attendance Trend')).toBeVisible();
  await expect(page.getByText('Grade Distribution')).toBeVisible();
  await expect(page.getByText('Recent Activity')).toBeVisible();
});
