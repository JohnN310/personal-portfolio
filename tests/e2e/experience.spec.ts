import { test, expect } from "@playwright/test";
test("experience entries open independently without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/#experience");
  const entries = page.locator("#experience details");
  await entries.nth(0).locator("summary").focus();
  await page.keyboard.press("Enter");
  await entries.nth(1).locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(entries.nth(0)).toHaveAttribute("open", "");
  await expect(entries.nth(1)).toHaveAttribute("open", "");
  await context.close();
});
