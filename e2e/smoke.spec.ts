import { expect, test } from "./fixtures";

test("core navigation and form labels work across browser engines", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    "Md. Akibul Hasan Arman.",
  );
  await expect(page.getByText("Software Engineer", { exact: true })).toBeVisible();

  await page
    .getByRole("link", { name: "View the complete work index" })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: /view case study for slatedesk/i }).click();
  await expect(page).toHaveURL(/\/work\/slatedesk$/);

  await page.getByRole("link", { name: "Contact", exact: true }).first().click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Reason")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
});
