import { test, expect } from '@playwright/test';

test('homepage loads its artwork without runtime errors or horizontal overflow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle(/The Grove Baptist Church/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A place to belong.A faith to grow.');
  const image = page.locator('.art-frame img');
  await expect(image).toBeVisible();
  expect(await image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('visit call to action reaches the supplied service, location, and contact details', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Come as you are' }).click();
  await expect(page).toHaveURL(/#visit$/);
  await expect(page.locator('#service-times')).toContainText('Sunday School · 9:30 am');
  await expect(page.locator('#service-times')).toContainText('Sunday Worship · 10:30 am');
  await expect(page.locator('#church-address')).toContainText('70 West St');
  await expect(page.locator('#church-address')).toContainText('Whiteland, Indiana 46184');
  await expect(page.locator('#directions-link')).toHaveAttribute('href', /google.com\/maps/);
  await expect(page.getByRole('link', { name: '(317) 800-0515' })).toHaveAttribute('href', 'tel:3178000515');
  await expect(page.getByRole('link', { name: 'ingrovechurch@gmail.com' })).toHaveAttribute('href', 'mailto:ingrovechurch@gmail.com');
  await expect(page.locator('.visit-footnote')).toBeHidden();
  await expect(page.locator('body')).not.toContainText('once confirmed');
});

test('watch links go to Facebook without using the forwarding domain', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Watch our services' })).toHaveAttribute('href', 'https://www.facebook.com/ingrovechurch');
  await expect(page.getByRole('link', { name: 'Find us on Facebook' })).toHaveAttribute('href', 'https://www.facebook.com/ingrovechurch');
  await expect(page.locator('a[href*="thegrovebaptistchurch.net"]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://thegrovebaptistchurch.com/');
});

test('first visit guide opens, traps keyboard focus, closes with Escape, and restores focus', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'A little help for your first visit' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading')).toHaveText('Your first visit,a little easier.');
  await expect(dialog).toContainText('Sunday Worship · 10:30 am');
  await expect(dialog).toContainText('70 West St');
  await page.getByRole('button', { name: 'Back to the website' }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Close visit guide' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('visit guide also closes through its visible controls', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'A little help for your first visit' });
  await trigger.click();
  await page.getByRole('button', { name: 'Close visit guide' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await trigger.click();
  await page.getByRole('button', { name: 'Back to the website' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('frequently asked questions expand using the keyboard', async ({ page }) => {
  await page.goto('/');
  const question = page.locator('summary').filter({ hasText: 'Can I come if I’m exploring faith?' });
  await question.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details[open]')).toContainText('Bring your curiosity');
  await page.keyboard.press('Enter');
  await expect(page.locator('details[open]')).toHaveCount(0);
});

test('navigation works at the current viewport and closes the mobile menu', async ({ page, isMobile }) => {
  await page.goto('/');
  const menu = page.getByRole('button', { name: /^(Open|Close) navigation$/ });
  if (isMobile) {
    await expect(page.getByRole('navigation')).not.toBeVisible();
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Our heart' }).click();
  await expect(page).toHaveURL(/#about$/);
  if (isMobile) {
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('navigation')).not.toBeVisible();
    await menu.click();
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeFocused();
  }
});
