import { test, expect } from '@playwright/test';

const boxcastScript = /^https:\/\/js\.boxcast\.com\/v3\.min\.js(?:\?.*)?$/;
const channelId = 'rs1sn7iap6fgcn3nn8as';

// Exercise the supplied provider API without fetching remote services or videos.
// This fixture is test-only; it never appears in the production website.
test.beforeEach(async ({ page }) => {
  await page.route(boxcastScript, (route) => route.fulfill({
    contentType: 'application/javascript',
    body: `
      window.boxcast = {
        noConflict() {
          return function (selector) {
            return {
              loadChannel(channel, options) {
                window.__boxcastTest = { selector, channel, options };
                const widget = document.querySelector(selector);
                if (!widget) throw new Error('The BoxCast widget container is missing');
                widget.innerHTML = '<div data-testid="boxcast-provider-fixture"><video controls aria-label="Test service video" style="display:block;width:100%;aspect-ratio:16/9"></video><p>Test-only provider playlist</p></div>';
                return Promise.resolve();
              }
            };
          };
        }
      };
    `,
  }));
});

test('homepage loads its viewing area and artwork without runtime errors or horizontal overflow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle(/The Grove Baptist Church/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Worship with us.Wherever you are.');
  await expect(page.locator('.service-viewer')).toBeVisible();
  const image = page.locator('.art-frame img');
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
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

test('watch and previous service links go to Facebook without using the forwarding domain', async ({ page }) => {
  await page.goto('/');
  const watchLink = page.getByRole('link', { name: 'Watch on Facebook', exact: true });
  await expect(watchLink).toBeVisible();
  await expect(watchLink).toHaveAttribute('href', 'https://www.facebook.com/ingrovechurch');
  await expect(page.getByRole('link', { name: 'Browse previous services', exact: true })).toHaveAttribute('href', 'https://www.facebook.com/ingrovechurch/videos/');
  await expect(page.locator('a[href*="thegrovebaptistchurch.net"]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://thegrovebaptistchurch.com/');
});

test('the supplied BoxCast channel loads with a player and previous-service playlist', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator(`#boxcast-widget-${channelId}`)).toBeVisible();
  await expect(page.getByTestId('boxcast-provider-fixture')).toBeVisible();
  await expect(page.locator('#player-loading')).toBeHidden();
  await expect(page.locator('#player-fallback')).toBeHidden();
  const call = await page.evaluate(() => (window as unknown as {
    __boxcastTest: { selector: string; channel: string; options: Record<string, unknown> };
  }).__boxcastTest);
  expect(call.selector).toBe(`#boxcast-widget-${channelId}`);
  expect(call.channel).toBe(channelId);
  expect(call.options).toMatchObject({
    layout: 'playlist-to-right',
    showRelated: true,
    defaultVideo: 'next',
  });
  await expect(page.getByRole('link', { name: 'View the service playlist', exact: true })).toHaveAttribute('href', '#watch');
});

test('a blocked BoxCast script leaves visitors a readable Facebook viewing alternative', async ({ page }) => {
  await page.route(boxcastScript, (route) => route.abort('failed'));
  await page.goto('/');
  const fallback = page.locator('#player-fallback');
  await expect(fallback).toBeVisible();
  await expect(page.locator('#player-loading')).toBeHidden();
  await expect(fallback).toContainText(/watch|Facebook/i);
  await expect(fallback.getByRole('link', { name: /Facebook/ })).toHaveAttribute('href', 'https://www.facebook.com/ingrovechurch');
});

test('the viewing screen and previous services lead the homepage', async ({ page, isMobile }) => {
  await page.goto('/');
  await expect(page.locator('main > section').nth(0)).toHaveAttribute('id', 'watch');
  await expect(page.locator('main > section').nth(1)).toHaveAttribute('id', 'episodes');
  await expect(page.locator('#episodes').getByRole('heading', { level: 2 })).toHaveText('Previous services');
  const viewer = await page.locator('.service-viewer').boundingBox();
  expect(viewer).not.toBeNull();
  expect(viewer!.y).toBeLessThan(isMobile ? 1100 : 900);
  expect(viewer!.height).toBeGreaterThan(isMobile ? 150 : 300);
  if (isMobile) await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Watch online', exact: true })).toHaveAttribute('href', '#watch');
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Previous services', exact: true })).toHaveAttribute('href', '#episodes');
});

test('the featured archive link takes visitors straight to previous services', async ({ page }) => {
  await page.goto('/');
  await page.locator('#watch').getByRole('link', { name: 'Explore previous services', exact: true }).click();
  await expect(page).toHaveURL(/#episodes$/);
  await expect(page.locator('#episodes').getByRole('heading', { name: 'Previous services', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Browse previous services', exact: true })).toBeVisible();
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
