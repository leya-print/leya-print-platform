import { test, expect } from '@playwright/test';

test('alive', async ({page}) => {
  await page.goto('/alive');
  expect(await page.textContent('body')).toEqual('Ok');
});


test.describe('designer', () => {
  test.beforeEach(({page}) => page.goto('/dev/'));

  test('template overview', async ({page}) => {
    await page.waitForLoadState('networkidle');
    expect(await page.screenshot()).toMatchSnapshot('template-overview.png');
  });

  test.describe('invoice', () => {
    test.beforeEach(async ({page}) => {
      await page.getByRole('link', { name: 'Invoice', exact: true }).click();
      await page.waitForURL(/\/invoice\?/);
    });

    test('preview', async ({page}) => {
      await page.waitForLoadState('networkidle');
      await page.getByText('Invoice 239045001').isVisible();
      expect(await page.screenshot()).toMatchSnapshot('invoice-preview.png');
    });

    test('pdf', async ({page}) => {
      const catchPdfTabPopup = page.waitForEvent('popup');
      await page.getByRole('button', { name: 'preview' }).click();
      const pdfTab = await catchPdfTabPopup;
      await pdfTab.waitForLoadState('networkidle');
      await pdfTab.waitForTimeout(500);
      await pdfTab.waitForLoadState('networkidle');
      await pdfTab.waitForTimeout(500);
      await pdfTab.waitForLoadState('networkidle');
      await pdfTab.waitForTimeout(500);
      expect(await pdfTab.screenshot()).toMatchSnapshot('invoice-pdf.png');
    });
  });
});
