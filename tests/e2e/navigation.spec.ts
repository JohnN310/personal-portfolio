import { test, expect } from "@playwright/test";

test("essential portfolio content works without JavaScript; resume is unavailable", async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("I solve problems.");
  for (const slug of ["remeli", "agentic-migration", "fraud-detection", "malware-research"]) {
    await expect(page.locator(`a[href='/work/${slug}']`).first()).toBeVisible();
  }
  for (const id of ["work", "research", "experience", "about", "contact"]) await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.getByText("A food-waste marketplace", { exact: false }).first()).toBeVisible();
  const pdf = await request.get("/resume-khoa-nguyen.pdf");
  expect(pdf.status()).toBe(404);
  await expect(page.getByRole("link", { name: /resume/i })).toHaveCount(0);
  await context.close();
});
