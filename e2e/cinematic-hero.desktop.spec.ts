import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test("cinematic opening has direct work and resume access with a reversible layered illustration", async ({ page, consoleErrors }) => {
  void consoleErrors;
  await page.goto("/");
  const hero = page.locator('[data-motion-section="hero"]');
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Md. Akibul Hasan Arman.");
  await expect(hero.getByRole("link", { name: "View selected work" })).toHaveAttribute("href", "/#work");
  await expect(hero.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/resume");
  await expect(hero.locator("[data-signature-layer]")).toHaveCount(3);
  await expect(hero.locator("canvas")).toHaveCount(0);
  await expect(page.locator("html")).toHaveAttribute("data-smooth-scroll", "active");
  const layer = hero.locator('[data-signature-layer="interface"]');
  await expect.poll(() => layer.getAttribute("transform")).not.toBeNull();
  const initial = await layer.getAttribute("transform");
  await page.evaluate(() => window.scrollTo(0, 400));
  await expect.poll(() => layer.getAttribute("transform")).not.toBe(initial);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => layer.getAttribute("transform")).toBe(initial);
  await assertNoHorizontalOverflow(page);
});
