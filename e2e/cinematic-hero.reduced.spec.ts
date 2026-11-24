import { expect, test } from "./fixtures";

test("cinematic opening stays readable without enhanced motion", async ({ page, consoleErrors }) => {
  void consoleErrors;
  await page.goto("/");
  const hero = page.locator('[data-motion-section="hero"]');
  await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(hero.getByRole("link", { name: "View selected work" })).toBeVisible();
  await expect(hero.getByRole("link", { name: "Resume" })).toBeVisible();
  await expect(hero.locator("[data-signature-scene]")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 400));
  await expect(hero.locator('[data-signature-layer="interface"]')).not.toHaveAttribute("transform", /.+/);
  await expect(page.locator("html")).not.toHaveAttribute("data-smooth-scroll", "active");
});
