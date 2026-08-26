import { expect, test } from "./fixtures";

test("reduced motion keeps content visible and disables enhanced scroll systems", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/");

  for (const section of ["#work", "#expertise", "[data-ml-lab]", "#about", "#contact"]) {
    await expect(page.locator(section)).toBeVisible();
  }

  await page.locator("#expertise").scrollIntoViewIfNeeded();
  await expect(page.locator("#expertise canvas")).toHaveCount(0);
  await page.locator("[data-ml-lab]").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-ml-lab] canvas")).toHaveCount(0);
  await expect(page.locator("[data-flagship-scroll-root]"))
    .not.toHaveAttribute("data-cinematic", "true");
  await expect(page.locator('[data-flagship-mode="story"] article')).toHaveCount(4);
  await expect(page.getByText("One request through the system")).toBeAttached();
  await expect(page.getByText("Balanced 5,000-image working subset", { exact: true }))
    .toBeAttached();
  await page.locator("#contact").scrollIntoViewIfNeeded();

  const runtimeState = await page.evaluate(() => ({
    smoothScroll: document.documentElement.dataset.smoothScroll,
    pinSpacers: document.querySelectorAll(".pin-spacer").length,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    velocity: getComputedStyle(document.documentElement).getPropertyValue(
      "--scroll-velocity",
    ),
  }));

  expect(runtimeState).toEqual({
    smoothScroll: undefined,
    pinSpacers: 0,
    scrollBehavior: "auto",
    velocity: "",
  });
});

test("case studies retain normal document flow under reduced motion", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/work/cctv-violence-detection");

  await expect(page.locator("[data-case-study]")).toBeVisible();
  await expect(page.locator("[data-case-block]").first()).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("reduced motion keeps project navigation native", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/work");
  await page
    .locator('[data-project-transition-link="cctv-violence-detection"]')
    .last()
    .click();

  await expect(page).toHaveURL(/\/work\/cctv-violence-detection$/);
  await expect(page.locator('[aria-hidden="true"][data-project]')).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveAttribute(
    "data-project-transition",
    "active",
  );
});
