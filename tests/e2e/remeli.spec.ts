import { test, expect } from "@playwright/test";

test("Remeli preview advances with reduced motion without navigating away", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const preview = page.getByRole("figure", { name: "Remeli marketplace walkthrough" });
  await expect(preview.getByRole("heading", { name: "List the surplus." })).toBeVisible();
  await expect(preview.getByRole("button", { name: "Buyer", exact: true })).toHaveCount(0);
  await preview.getByRole("button", { name: "Scene 4: Pick up. Enjoy.", exact: true }).click();
  await expect(preview.getByRole("heading", { name: "Pick up. Enjoy." })).toBeVisible();
  await preview.getByRole("button", { name: "Scene 2: Find a good deal.", exact: true }).press("Enter");
  await expect(preview.getByRole("heading", { name: "Find a good deal." })).toBeVisible();
  await expect(preview.getByRole("link")).toHaveCount(0);
  await expect(page).toHaveURL(/\/$/);
});
