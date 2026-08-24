import { expect, settlePage, test } from "./fixtures";

test("selected-work entry composition remains visually stable", async ({
  page,
  consoleErrors,
}, testInfo) => {
  void consoleErrors;
  await page.goto("/");
  await page.locator("#work").evaluate((section) => {
    section.scrollIntoView({ block: "start" });
  });
  await settlePage(page);

  const width = testInfo.project.name.endsWith("mobile") ? 390 : 1440;
  await expect(page).toHaveScreenshot(`selected-work-${width}.png`, {
    animations: "disabled",
  });
});

test("work-index opening remains visually stable", async ({
  page,
  consoleErrors,
}, testInfo) => {
  void consoleErrors;
  await page.goto("/work");
  await settlePage(page);

  const width = testInfo.project.name.endsWith("mobile") ? 390 : 1440;
  await expect(page).toHaveScreenshot(`work-index-${width}.png`, {
    animations: "disabled",
  });
});
