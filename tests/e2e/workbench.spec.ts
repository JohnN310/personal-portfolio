import { test, expect } from "@playwright/test";

test("reduced-motion first load hydrates without errors or nested tab stops", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("link", { name: /Build products/ }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: /Connect systems/ })).toBeFocused();
  expect(errors.filter(error => /hydrat/i.test(error))).toEqual([]);
});

test("workbench objects are keyboard-operable project links", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1000);
  const object = page.getByRole("link", { name: /Build products/ });
  await object.focus();
  await expect(object).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#remeli$/);
  await expect(page.locator("#remeli")).toBeInViewport();
});

test("changing to reduced motion resets an active object", async ({ page }) => {
  await page.goto("/");
  const object = page.getByRole("link", { name: /Build products/ });
  await object.hover();
  const art = object.locator(".object-motion");
  await expect.poll(() => art.evaluate(el => getComputedStyle(el).transform)).not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => art.evaluate(el => getComputedStyle(el).transform)).toBe("none");
  await expect(object).toBeVisible();
});

test("touch viewport preserves normal page scrolling", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/");
  const object = page.getByRole("link", { name: /Build products/ });
  await expect(object).toBeVisible();
  const session = await context.newCDPSession(page);
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 160, y: 640 }] });
  for (let y = 610; y >= 250; y -= 30) await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 160, y }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await context.close();
});
