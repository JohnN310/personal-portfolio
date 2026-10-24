import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e", fullyParallel: true, workers: 3,
  timeout: 30000, expect: { timeout: 7000 },
  use: { baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3107", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.BASE_URL ? undefined : { command: process.env.TEST_PRODUCTION ? "npm run start -- --port 3107" : "npm run dev -- --port 3107", url: "http://127.0.0.1:3107", reuseExistingServer: false, timeout: 120000 }
});
