import { assertNoHorizontalOverflow, expect, scanForWcagViolations, test } from "./fixtures";

for (const item of [
  { slug: "phishing-website-detection", scene: "research-phishing", title: "Phishing Website Detection", choice: "False-positive rate", result: "2.55%", summary: "All measured values" },
  { slug: "wall-crack-detection", scene: "research-cracks", title: "CrackSAFE-MRC", choice: "Limit clean-image false positives", result: "0.46%", summary: "Both operating policies" },
] as const) {
  test(`${item.title} links from the homepage to a source-backed case study`, async ({ page, consoleErrors }) => {
    void consoleErrors;
    await page.goto(`/#${item.scene}`);
    await page.locator(`#${item.scene}`).getByRole("link", { name: /read the full case study/i }).click();
    await expect(page).toHaveURL(new RegExp(`/work/${item.slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(item.title);
    const comparison = page.locator("[data-case-research-comparison]");
    await comparison.getByRole("radio", { name: item.choice }).check();
    await expect(comparison.getByText(item.result, { exact: false }).first()).toBeVisible();
    await comparison.getByText(item.summary, { exact: true }).click();
    await expect(comparison.getByRole("table")).toBeVisible();
    await expect(comparison.getByRole("link", { name: /original result artifact/i })).toHaveAttribute("href", /^https:\/\/github\.com\/abarman079\//);
    await scanForWcagViolations(page, "[data-case-research-comparison]");
    await assertNoHorizontalOverflow(page);
  });
}
