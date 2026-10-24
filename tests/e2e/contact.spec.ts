import { test, expect } from "@playwright/test";
test("clipboard denial keeps a usable email and truthful feedback", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("denied")) }, configurable: true }));
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toContainText("Couldn't copy");
  await expect(page.getByRole("link", { name: "nguyendacanhkhoa2004@gmail.com" })).toHaveAttribute("href", "mailto:nguyendacanhkhoa2004@gmail.com");
});
test("mobile menu Escape restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.locator(".mobile-menu summary");
  await menu.click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Work", exact: true }).focus();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open", "");
});
