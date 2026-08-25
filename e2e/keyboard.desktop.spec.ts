import { expect, test } from "./fixtures";

test("the skip link moves keyboard focus to main content", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});
