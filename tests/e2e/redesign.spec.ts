import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`section links align content below the header at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const name of ["Work", "Research", "Experience"]) {
      if (width < 1024) await page.locator(".mobile-menu > summary").click();
      const nav = width < 1024 ? "Mobile navigation" : "Main navigation";
      await page.getByRole("navigation", { name: nav, exact: true }).getByRole("link", { name, exact: true }).click();
      const target = page.locator(`#${name.toLowerCase()} .section-intro`);
      await expect.poll(async () => target.evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(width < 1024 ? 64 : 76);
      const top = await target.evaluate(el => el.getBoundingClientRect().top);
      expect(top).toBeLessThanOrEqual(width < 1024 ? 104 : 124);
    }
  });
}

test("particle field stays static with reduced motion and leaves links usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const canvas = page.locator(".particle-field");
  await expect(canvas).toHaveAttribute("aria-hidden", "true");
  await expect.poll(() => canvas.evaluate(el => (el as HTMLCanvasElement).width)).toBeGreaterThan(0);
  const before = await canvas.evaluate(el => (el as HTMLCanvasElement).toDataURL());
  await page.mouse.move(600, 300);
  await page.waitForTimeout(150);
  expect(await canvas.evaluate(el => (el as HTMLCanvasElement).toDataURL())).toBe(before);
  await page.getByRole("link", { name: "Explore work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
});
