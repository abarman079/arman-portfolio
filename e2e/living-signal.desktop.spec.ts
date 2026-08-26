import {
  assertNoHorizontalOverflow,
  expect,
  mockTurnstile,
  test,
} from "./fixtures";

test("homepage identity and project stories remain clear while WebGL stays demand-scoped", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await mockTurnstile(page);
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute(
    "data-smooth-scroll",
    "active",
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Md. Akibul Hasan Arman.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Software Engineer", { exact: true })).toBeVisible();
  await expect(page.locator("[data-hero-evidence] a")).toHaveCount(3);
  await expect(page.locator("canvas")).toHaveCount(0);

  const stories = page.locator('[data-flagship-mode="story"]');
  await expect(stories).toHaveAttribute("data-cinematic", "true");

  const storyChecks = [
    ["#project-slatedesk", "One request through the system"],
    ["#project-framesignal", "Set the boundary"],
    ["#project-arctic-daze", "Responsive product discovery"],
    ["#project-cctv-violence-detection", "Balanced 5,000-image working subset"],
  ] as const;

  for (const [selector, evidence] of storyChecks) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await expect(
      page.locator(selector).getByText(evidence, { exact: false }).first(),
    ).toBeVisible();
  }

  await expect(stories.locator(".pin-spacer")).toHaveCount(0);

  await page.locator("#expertise").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-capability-row]")).toHaveCount(4);
  await expect(page.locator("#expertise canvas")).toHaveCount(0);
  await expect(page.locator("[data-ml-lab] [data-enhanced]")).toHaveAttribute(
    "data-enhanced",
    "false",
  );
  await expect
    .poll(() =>
      page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue(
          "--scroll-velocity",
        ),
      ),
    )
    .toBe("0.0000");

  await page.locator("[data-ml-lab-stage] figure").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-ml-lab] [data-enhanced]")).toHaveAttribute(
    "data-enhanced",
    "true",
  );

  await page.locator("[data-archive-scene]").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-ml-lab] [data-enhanced]")).toHaveAttribute(
    "data-enhanced",
    "false",
  );
  await expect(page.getByRole("heading", { name: "More work." }))
    .toBeVisible();

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Send a useful note." }))
    .toBeVisible();
  await expect(page.getByRole("link", { name: "abarmanoffice@gmail.com" }))
    .toBeVisible();
  await expect(page.locator("[data-contact-token]")).toHaveCount(0);

  await assertNoHorizontalOverflow(page);
});

test("large and short-laptop desktop ranges retain intentional motion eligibility", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;

  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1366, height: 768 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/#work");
    await expect(page.locator("[data-flagship-scroll-root]")).toHaveAttribute(
      "data-cinematic",
      "true",
    );
    await assertNoHorizontalOverflow(page);
  }
});
