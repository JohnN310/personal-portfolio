import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("landing page has no serious accessibility issues, including expanded content", async ({ page }) => {
  await page.goto("/");
  await page.locator("#research details summary").first().click();
  await page.locator("#experience details summary").first().click();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(item => ["serious", "critical"].includes(item.impact ?? ""))).toEqual([]);
});
test("case study has no serious accessibility issues", async ({ page }) => {
  await page.goto("/work/remeli");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(item => ["serious", "critical"].includes(item.impact ?? ""))).toEqual([]);
});
test("responsive layouts have no horizontal overflow", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `artifacts/home-${width}.png`, fullPage: true });
  }
});
test("project navigation preserves browser history", async ({ page }) => {
  await page.goto("/#work");
  await page.getByRole("link", { name: "Inside the build" }).click();
  await expect(page).toHaveURL(/\/work\/remeli$/);
  await page.goBack();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});
test("anchor navigation clears the sticky header", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("link", { name: /Build products/ }).click();
  const y = await page.locator("#remeli").evaluate(el => el.getBoundingClientRect().top);
  expect(y).toBeGreaterThanOrEqual(76);
});
test("long text remains reachable with enlarged text", async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto("/");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(640);
  await expect(page.getByRole("link", { name: "nguyendacanhkhoa2004@gmail.com" })).toBeVisible();
});
