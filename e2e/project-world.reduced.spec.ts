import { expect, test } from "./fixtures";

test("project worlds remain static and readable with reduced motion", async ({ page, consoleErrors }) => {
  void consoleErrors;
  await page.goto("/work/framesignal");
  const world = page.locator("[data-project-world]");
  await world.scrollIntoViewIfNeeded();
  await expect(world.locator("[data-case-world-light]")).toHaveCSS("transform", "none");
  await expect(world.locator("[data-case-world-secondary]")).toHaveCSS("transform", "none");
  await expect(world.locator("figure img")).toHaveCount(2);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.getByRole("navigation", { name: "Case study chapters" }).getByRole("link", { name: "Project overview" }).click();
  await expect(page).toHaveURL(/#overview-title$/);
});
