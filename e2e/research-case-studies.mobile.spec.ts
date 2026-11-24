import { assertNoHorizontalOverflow, expect, scanForWcagViolations, test } from "./fixtures";

test("new research case studies retain usable comparisons and tables on touch", async ({ page, consoleErrors }) => {
  void consoleErrors;
  for (const item of [
    { slug: "phishing-website-detection", choice: "Average precision", summary: "All measured values", result: "97.80%" },
    { slug: "wall-crack-detection", choice: "Limit clean-image false positives", summary: "Both operating policies", result: "0.46%" },
  ]) {
    await page.goto(`/work/${item.slug}`);
    const comparison = page.locator("[data-case-research-comparison]");
    await comparison.getByRole("radio", { name: item.choice }).check();
    await expect(comparison.getByText(item.result, { exact: false }).first()).toBeVisible();
    await comparison.getByText(item.summary, { exact: true }).click();
    await expect(comparison.getByRole("table")).toBeVisible();
    await assertNoHorizontalOverflow(page);
    await scanForWcagViolations(page, "[data-case-research-comparison]");
  }
});
