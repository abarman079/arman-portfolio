import { expect, test } from "./fixtures";

test("core navigation and form labels work across browser engines", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Software Engineer",
  );

  await page.goto("/work");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: /view case study for slatedesk/i }).click();
  await expect(page).toHaveURL(/\/work\/slatedesk$/);

  await page.goto("/#contact");
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Reason")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
});
