import {
  assertNoHorizontalOverflow,
  expect,
  mockTurnstile,
  publicRoutes,
  scanForWcagViolations,
  test,
} from "./fixtures";

test("mobile dialog manages focus, Escape, scroll lock, and Axe state", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu" });

  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /arman/i });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: /close/i })).toBeFocused();
  await expect(page.locator("body")).toHaveAttribute("data-menu-open", "true");
  await scanForWcagViolations(page, "#mobile-navigation");

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveAttribute(
    "data-menu-open",
    "true",
  );
});

test("mobile routes reflow without horizontal page overflow", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;

  for (const route of publicRoutes) {
    await page.goto(route);
    await assertNoHorizontalOverflow(page);
  }
});

test("touch layout keeps flagship actions visible and skips WebGL enhancement", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/#work");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Md. Akibul Hasan Arman.",
    }),
  ).toBeAttached();
  await expect(
    page.locator('[data-flagship-mode="story"] article'),
  ).toHaveCount(4);
  const firstCaseStudy = page
    .locator('#project-slatedesk a[href="/work/slatedesk"]')
    .first();
  await page.locator("#project-slatedesk").evaluate((project) => {
    project.scrollIntoView({ block: "start" });
  });
  await expect(firstCaseStudy).toBeVisible();
  await page.locator("#expertise").scrollIntoViewIfNeeded();
  await expect(page.locator("#expertise canvas")).toHaveCount(0);
  await page.locator("[data-ml-lab]").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-ml-lab] canvas")).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-smooth-scroll",
    "active",
  );
  await expect(page.getByText("It is a graphics study—not a trained model"))
    .toBeVisible();

  await page.locator("#contact").scrollIntoViewIfNeeded();
  const mobileMotionState = await page.evaluate(() => ({
    velocity: getComputedStyle(document.documentElement).getPropertyValue(
      "--scroll-velocity",
    ),
  }));
  expect(mobileMotionState).toEqual({
    velocity: "",
  });
});

test("mobile project navigation uses the compact continuity fallback", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/work");
  await page
    .locator('[data-project-transition-link="arctic-daze"]')
    .last()
    .click();

  await expect(page).toHaveURL(/\/work\/arctic-daze$/);
  await expect(page.locator('[aria-hidden="true"][data-project]')).toHaveCount(
    0,
  );
  await expect(page.locator("body")).not.toHaveAttribute(
    "data-project-transition",
    "active",
  );
  await assertNoHorizontalOverflow(page);
});

test("mobile resume uses the explicit PDF fallback without loading an inline plugin", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/resume");

  await expect(page.locator('object[type="application/pdf"]')).toHaveCount(0);
  await expect(
    page.getByText("Inline PDF viewing is reserved for larger screens."),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /open resume pdf/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /download resume pdf/i }),
  ).toBeVisible();
});

test("contact validation remains labelled and accessible on touch", async ({
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

  await expect(page.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");
  await scanForWcagViolations(page, "#contact");
});

test("640 CSS pixels remains usable as a 1280px layout at 200% zoom equivalent", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.setViewportSize({ width: 640, height: 800 });

  for (const route of [
    "/",
    "/work",
    "/work/cctv-violence-detection",
    "/resume",
  ]) {
    await page.goto(route);
    await assertNoHorizontalOverflow(page);
  }
});
