import { test, expect } from "@playwright/test";
test("agent walkthrough supports reduced-motion stepping and restart", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/agentic-migration");
  const demo = page.getByRole("region", { name: "Animated six-agent migration walkthrough" });
  await expect(demo.getByText("Counter.st", { exact: true })).toBeVisible();
  await demo.getByRole("button", { name: "Next step" }).click();
  await expect(demo.getByText("Counter.java", { exact: true })).toBeVisible();
  await demo.getByRole("button", { name: /Evaluate again/ }).click();
  await expect(demo.getByText("Java output", { exact: true })).toBeVisible();
  await demo.getByRole("button", { name: "Restart", exact: true }).click();
  await expect(demo.getByText("Counter.st", { exact: true })).toBeVisible();
});

test("Smalltalk to Java component on home page is clickable into the framework", async ({ page }) => {
  await page.goto("/");
  const demo = page.getByRole("region", { name: "Animated six-agent migration walkthrough" });
  await expect(demo.getByText("Counter.st", { exact: true })).toBeVisible();
  const link = demo.getByRole("link", { name: "Open Agentic AI and explore the framework" });
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/\/work\/agentic-migration$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Code. Reinvented.");
});
