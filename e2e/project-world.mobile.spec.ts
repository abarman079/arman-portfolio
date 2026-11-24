import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test("portrait and chart scenes fit touch viewports and chapter links work", async ({ page, consoleErrors }) => {
  void consoleErrors;
  for (const slug of ["arctic-daze", "phishing-website-detection", "wall-crack-detection"]) {
    await page.goto(`/work/${slug}`);
    const world = page.locator("[data-project-world]");
    await expect(world.locator("figure img")).toHaveCount(2);
    await expect(world.locator("canvas")).toHaveCount(0);
    const bounds = await world.locator("figure").evaluateAll((figures) => figures.map((figure) => {
      const { left, right, top, bottom } = figure.getBoundingClientRect();
      return { left, right, top, bottom };
    }));
    expect(bounds[1].top).toBeGreaterThanOrEqual(bounds[0].bottom - 1);
    expect(bounds.every((box) => box.left >= -1 && box.right <= 391)).toBe(true);
    const chapters = page.getByRole("navigation", { name: "Case study chapters" });
    await chapters.getByRole("link", { name: "Project overview" }).click();
    await expect(page).toHaveURL(/#overview-title$/);
    await assertNoHorizontalOverflow(page);
  }
});
