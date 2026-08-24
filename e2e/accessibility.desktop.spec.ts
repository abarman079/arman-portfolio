import {
  mockTurnstile,
  publicRoutes,
  scanForWcagViolations,
  test,
} from "./fixtures";

for (const route of publicRoutes) {
  test(`${route} has no automated WCAG A/AA violations`, async ({
    page,
    consoleErrors,
  }) => {
    void consoleErrors;
    await page.goto(route);
    await scanForWcagViolations(page);
  });
}

test("the expected 404 state has no automated WCAG A/AA violations", async ({
  page,
}) => {
  const response = await page.goto("/work/not-a-project");
  if (response?.status() !== 404) {
    throw new Error(`Expected a 404 response, received ${response?.status()}.`);
  }
  await scanForWcagViolations(page);
});

test("contact validation error state has no automated violations", async ({
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
  await page.locator("#contact-name-error").waitFor();
  await scanForWcagViolations(page, "#contact");
});
