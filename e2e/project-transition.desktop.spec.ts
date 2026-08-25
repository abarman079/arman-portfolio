import { expect, test } from "./fixtures";

test("flagship media continuity preserves history and cleans transition state", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/work");

  const link = page
    .locator('[data-project-transition-link="slatedesk"]')
    .last();
  await link.click();
  await expect(page).toHaveURL(/\/work\/slatedesk$/);
  await expect(page.locator("body")).not.toHaveAttribute(
    "data-project-transition",
    "active",
  );
  await expect(page.locator('[aria-hidden="true"][data-project]')).toHaveCount(0);
  await expect(
    page.locator('[data-project-transition-target="slatedesk"]'),
  ).toBeVisible();
  await expect(page.locator("#main-content")).toBeFocused();

  await page.goBack();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator('[aria-hidden="true"][data-project]')).toHaveCount(0);

  await page.goForward();
  await expect(page).toHaveURL(/\/work\/slatedesk$/);
  await expect(page.locator('[aria-hidden="true"][data-project]')).toHaveCount(0);
});

test("modifier-click keeps native new-tab behavior", async ({
  context,
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/work");

  const link = page
    .locator('[data-project-transition-link="framesignal"]')
    .last();
  const popupPromise = context.waitForEvent("page");
  await link.click({ modifiers: ["Control"] });
  const popup = await popupPromise;
  await popup.waitForURL(/\/work\/framesignal$/);

  expect(new URL(popup.url()).pathname).toBe("/work/framesignal");
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator("body")).not.toHaveAttribute(
    "data-project-transition",
    "active",
  );
  await popup.close();
});
