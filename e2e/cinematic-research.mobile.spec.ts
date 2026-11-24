import { assertNoHorizontalOverflow, expect, scanForWcagViolations, test } from "./fixtures";

test("mobile keeps static artwork and supports research comparison controls", async ({ page, consoleErrors }) => {
  void consoleErrors;
  await page.goto("/");
  const hero = page.locator('[data-motion-section="hero"]');
  await expect(hero.locator("canvas")).toHaveCount(0);
  await expect(hero.getByRole("button", { name: "Explore 3D" })).toHaveCount(0);
  const scene = page.locator("#research-phishing");
  await scene.getByRole("radio", { name: "Average precision" }).check();
  await expect(scene.getByText("97.80%", { exact: false }).first()).toBeVisible();
  await scene.getByText("All measured values", { exact: true }).click();
  await expect(scene.getByRole("table")).toBeVisible();
  await assertNoHorizontalOverflow(page);
  await scanForWcagViolations(page,"#research");
});
