import { test, expect } from "@playwright/test";

for (const slug of ["remeli", "agentic-migration", "fraud-detection", "malware-research"]) {
  test(`${slug} opens directly with the complete case study`, async ({ page }) => {
    const response = await page.goto(`/work/${slug}`);
    expect(response?.status()).toBe(200);
    for (const title of ["The problem", "What I built", "The interesting part", "Outcome & evidence", "Built with"]) {
      await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
    }
    await expect(page.getByRole("link", { name: /Back to work/ })).toBeVisible();
  });
}
test("unknown work has a real 404", async ({ page }) => {
  const response = await page.goto("/work/not-a-project");
  expect(response?.status()).toBe(404);
});
test("diagram explanations work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/work/agentic-migration");
  await page.locator(".pipeline-controls summary").filter({ hasText: "Translation" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".pipeline-controls details[open] p")).toContainText("Smalltalk-to-Java and SQL-to-Java conversion");
  await context.close();
});
test("reduced motion preserves open figure explanation", async ({ page }) => {
  await page.goto("/work/agentic-migration");
  await page.locator(".pipeline-controls summary").filter({ hasText: "Translation" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pipeline-controls details[open] p")).toContainText("Smalltalk-to-Java and SQL-to-Java conversion");
});
