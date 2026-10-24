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

test("homepage agent walkthrough keeps interaction on the page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const demo = page.getByRole("region", { name: "Animated six-agent migration walkthrough" });
  await expect(demo.getByRole("link")).toHaveCount(0);
  await demo.getByRole("button", { name: "Next step" }).click();
  await expect(demo.getByText("Counter.java", { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
});
