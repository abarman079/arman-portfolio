import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test("new case studies remain readable with reduced motion", async ({ page, consoleErrors }) => {
  void consoleErrors;
  for (const slug of ["phishing-website-detection", "wall-crack-detection"]) {
    await page.goto(`/work/${slug}`);
    await expect(page.locator("[data-case-research-comparison]")).toBeVisible();
    await expect(page.locator("[data-case-block]").first()).toBeVisible();
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator("[data-case-research-comparison] canvas")).toHaveCount(0);
    await assertNoHorizontalOverflow(page);
  }
});
