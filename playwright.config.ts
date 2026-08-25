import { defineConfig } from "@playwright/test";

const localBaseURL = "http://127.0.0.1:4173";
const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL?.trim();
const baseURL = externalBaseURL || localBaseURL;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  timeout: 45_000,
  expect: {
    timeout: 8_000,
    toHaveScreenshot: {
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
    },
  },
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  snapshotPathTemplate:
    "{testDir}/__screenshots__/{arg}-{projectName}{ext}",
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  webServer: externalBaseURL
    ? undefined
    : {
        command:
          "npm run build && node node_modules/next/dist/bin/next start -p 4173",
        url: localBaseURL,
        reuseExistingServer: false,
        timeout: 300_000,
        env: {
          SITE_URL: localBaseURL,
          VERCEL_ENV: "production",
          NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
          TURNSTILE_SECRET_KEY:
            "1x0000000000000000000000000000000AA",
          RESEND_API_KEY: "browser-test-placeholder",
          CONTACT_FROM_EMAIL: "Portfolio QA <qa@example.com>",
          CONTACT_TO_EMAIL: "qa@example.com",
        },
      },
  projects: [
    {
      name: "chromium-desktop",
      testMatch: /.*\.desktop\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "chromium-mobile",
      testMatch: /.*\.mobile\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: "chromium-reduced-motion",
      testMatch: /.*\.reduced\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 900 },
        contextOptions: { reducedMotion: "reduce" },
      },
    },
    {
      name: "chromium-visual-desktop",
      testMatch: /visual\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 900 },
        contextOptions: { reducedMotion: "reduce" },
      },
    },
    {
      name: "chromium-visual-mobile",
      testMatch: /visual\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        contextOptions: { reducedMotion: "reduce" },
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: "firefox-smoke",
      testMatch: /smoke\.spec\.ts/,
      use: {
        browserName: "firefox",
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: "webkit-smoke",
      testMatch: /smoke\.spec\.ts/,
      use: {
        browserName: "webkit",
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
});
