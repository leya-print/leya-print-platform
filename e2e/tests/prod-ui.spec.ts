import { test, expect } from "@playwright/test";

test("designer pdf preview", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://leya-print-demo.azurewebsites.net/");

  await page.getByRole("link", { name: "/dev/" }).click();
  await page.getByRole("link", { name: "Invoice", exact: true }).click();

  const pagePromise = context.waitForEvent("page");

  await page.getByRole("button", { name: "preview" }).click();
  await page.getByRole("button", { name: "preview" }).click();

  const date = new Date().toISOString();
  await page.screenshot({ path: `screenshots/${'preview-' + date}.png` });

  await page.waitForTimeout(3000);
  const newPage = await pagePromise;

  await expect(page).toHaveTitle('leya-designer');

  //   const page1Promise = page.waitForEvent("popup");
  //   const page1 = await page1Promise;
  //   await page1.goto(
  //     "https://leya-print-demo.azurewebsites.net/pdf/invoice/test.pdf?tplPackage=f162b3c5-302d-4dc1-a593-64855edf8ad2"
  //   );
});
