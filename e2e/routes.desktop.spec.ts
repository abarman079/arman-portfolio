import {
  expect,
  mockTurnstile,
  publicRoutes,
  settlePage,
  test,
} from "./fixtures";

for (const route of publicRoutes) {
  test(`${route} renders a single visible page heading`, async ({
    page,
    consoleErrors,
  }) => {
    void consoleErrors;
    const response = await page.goto(route);

    expect(response?.status()).toBe(200);
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });
}

test("unknown and archive slugs resolve to a 404", async ({ page }) => {

  for (const route of ["/work/not-a-project", "/work/travelease"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: /not published|not found/i }),
    ).toBeVisible();
  }
});

test("primary navigation reaches sections and preserves route-aware links", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/work");

  const primary = page.getByRole("navigation", { name: "Primary navigation" });
  await primary.getByRole("link", { name: "Expertise" }).click();
  await expect(page).toHaveURL(/\/#expertise$/);
  await expect(page.locator("#expertise")).toBeVisible();

  await primary.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(page.locator("#about")).toBeVisible();
  await expect(primary.getByRole("link", { name: "About" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("case studies retain source links and ordered next-project navigation", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/work/slatedesk");

  await expect(
    page.getByRole("link", { name: /slatedesk repository/i }).first(),
  ).toHaveAttribute("href", "https://github.com/abarman079/slatedesk");
  await page
    .getByRole("navigation", { name: "Case study navigation" })
    .getByRole("link")
    .click();
  await expect(page).toHaveURL(/\/work\/framesignal$/);
});

test("resume offers separate inline, open, and download paths", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/resume");

  await expect(page.locator('object[type="application/pdf"]')).toHaveAttribute(
    "data",
    /md-akibul-hasan-arman-cv\.pdf#view=FitH$/,
  );
  await expect(page.getByRole("link", { name: /open resume pdf/i })).toHaveAttribute(
    "target",
    "_blank",
  );
  await expect(page.getByRole("link", { name: /download resume pdf/i })).toHaveAttribute(
    "download",
    "md-akibul-hasan-arman-cv.pdf",
  );
});

test("contact validation reports errors and focuses the first invalid field", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await mockTurnstile(page);
  await page.goto("/#contact");
  await page.locator("#contact form").evaluate((form) => {
    (form as HTMLFormElement).noValidate = true;
  });
  await page.getByRole("button", { name: "Send message" }).click();

  const name = page.getByLabel("Name");
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toBeFocused();
  await expect(page.locator("#contact-name-error")).toBeVisible();
});

test("external new-tab links declare a safe rel", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;

  for (const route of ["/", "/work", "/resume", "/work/framesignal"]) {
    await page.goto(route);
    await settlePage(page);
    const links = page.locator('a[target="_blank"]');

    for (let index = 0; index < (await links.count()); index += 1) {
      await expect(links.nth(index)).toHaveAttribute("rel", /noreferrer/);
    }
  }
});
