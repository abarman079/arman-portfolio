import { expect, test } from "./fixtures";

test("chapter passages remain complete without any enhanced motion", async ({ page }) => {
  await page.goto("/");
  const passages = page.locator("[data-cinematic-passage]");
  await expect(passages).toHaveCount(2);
  for (const passage of await passages.all()) {
    await expect(passage.getByRole("heading")).toBeVisible();
    await expect(passage.getByRole("link")).toBeVisible();
    await expect(passage.locator("[data-passage-camera][style]")).toHaveCount(0);
    await expect(passage.locator("canvas")).toHaveCount(0);
    await expect(passage.locator(".pin-spacer")).toHaveCount(0);
  }
});
