import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test("touch chapter passages preserve readable content and direct navigation", async ({ page }) => {
  await page.goto("/");
  const passages = page.locator("[data-cinematic-passage]");
  await expect(passages).toHaveCount(2);
  await expect(passages.locator("[data-passage-camera][style]")).toHaveCount(0);
  await expect(passages.locator("canvas")).toHaveCount(0);
  await assertNoHorizontalOverflow(page);
  await passages.last().getByRole("link").click();
  await expect(page).toHaveURL(/#research$/);
});
