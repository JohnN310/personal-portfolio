import { test, expect } from "@playwright/test";

test("Remeli listing, order, support and reset share state", async ({ page }) => {
  await page.goto("/work/remeli");
  const demo = page.getByRole("region", { name: "Remeli marketplace demo" });
  const roles = demo.getByRole("group", { name: "Marketplace role" });
  await roles.getByRole("button", { name: "Seller", exact: true }).click();
  await demo.getByLabel("Food name").fill("Evening pastry box");
  await demo.getByRole("button", { name: "Publish demo listing" }).click();
  await roles.getByRole("button", { name: "Buyer", exact: true }).click();
  await demo.getByRole("button", { name: "Order Evening pastry box" }).click();
  await expect(demo.getByRole("status")).toContainText("Saved $8.00");
  await demo.getByRole("button", { name: "Ask about pickup" }).click();
  await roles.getByRole("button", { name: "Admin", exact: true }).click();
  await demo.getByRole("button", { name: "Send pickup instructions" }).click();
  await roles.getByRole("button", { name: "Buyer", exact: true }).click();
  await expect(demo.getByRole("button", { name: "Support resolved" })).toBeDisabled();
  await demo.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(demo.getByRole("button", { name: "Order Evening pastry box" })).toHaveCount(0);
});

test("fraud chart uses analysis results consistently across metrics", async ({ page }) => {
  await page.goto("/work/fraud-detection");
  const chart = page.getByRole("region", { name: "Random Forest experiment results" });
  await chart.getByRole("button", { name: "Precision", exact: true }).click();
  await expect(chart.getByText("89.00%", { exact: true })).toBeVisible();
  await chart.getByRole("button", { name: "Accuracy", exact: true }).click();
  await expect(chart.getByText("97.80%", { exact: true })).toBeVisible();
  await chart.getByRole("button", { name: "Recall", exact: true }).click();
  await expect(chart.getByText("72.00%", { exact: true })).toBeVisible();
});
