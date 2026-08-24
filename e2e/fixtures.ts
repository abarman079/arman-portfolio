import AxeBuilder from "@axe-core/playwright";
import { expect, test as base, type Page } from "@playwright/test";

interface QualityFixtures {
  consoleErrors: string[];
}

export const test = base.extend<QualityFixtures>({
  consoleErrors: async ({ page }, provide) => {
    const errors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await provide(errors);

    expect(errors, "Unexpected browser console or page errors").toEqual([]);
  },
});

export { expect } from "@playwright/test";

export const publicRoutes = [
  "/",
  "/work",
  "/resume",
  "/work/slatedesk",
  "/work/framesignal",
  "/work/arctic-daze",
  "/work/cctv-violence-detection",
] as const;

export async function settlePage(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

export async function assertNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
}

export async function mockTurnstile(page: Page) {
  await page.route("https://challenges.cloudflare.com/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: `window.turnstile={render:function(host){host.textContent='Security verification test fixture';return 'phase9-widget'},reset:function(){},remove:function(){}};`,
    });
  });
}

export async function scanForWcagViolations(page: Page, include?: string) {
  let builder = new AxeBuilder({ page }).withTags([
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
    "wcag22aa",
  ]);

  if (include) builder = builder.include(include);

  const results = await builder.analyze();
  const summary = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    targets: violation.nodes.map((node) => node.target),
  }));

  expect(summary, "Automated WCAG A/AA violations").toEqual([]);
}
