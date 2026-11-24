import { expect, test } from "./fixtures";

test("reduced motion disables 3D activation without hiding research", async ({ page, consoleErrors }) => {
  void consoleErrors;
  await page.goto("/");
  await expect(page.locator("[data-signature-status]")).toHaveAttribute("data-signature-status","still");
  await expect(page.getByRole("button", { name: "Explore 3D" })).toHaveCount(0);
  await expect(page.locator("[data-signature-webgl] canvas")).toHaveCount(0);
  await expect(page.locator("[data-signature-scene]")).toBeVisible();
  await page.locator("#research-cracks").getByRole("radio", { name: "Limit clean-image false positives" }).check();
  await expect(page.locator("#research-cracks").getByText("0.46%", { exact: false }).first()).toBeVisible();
});
