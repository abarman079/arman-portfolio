import {
  assertNoHorizontalOverflow,
  expect,
  mockTurnstile,
  test,
} from "./fixtures";

test("homepage chapters transfer one motion signal and keep WebGL demand-scoped", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await mockTurnstile(page);
  await page.goto("/");

  const root = page.locator("[data-home-motion-root]");
  await expect(page.locator("html")).toHaveAttribute(
    "data-smooth-scroll",
    "active",
  );
  await expect(root).toHaveAttribute("data-signal-chapter", "hero");
  await expect(page.locator("canvas")).toHaveCount(1);

  await page.locator("[data-capability-transfer]").scrollIntoViewIfNeeded();
  await expect(root).toHaveAttribute("data-signal-chapter", "capabilities");
  await expect(
    page.locator("[data-capability-gallery] [data-enhanced]"),
  ).toHaveAttribute("data-enhanced", "true");
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
  await expect(root).toHaveAttribute("data-signal-chapter", "lab");
  await expect(
    page.locator("[data-capability-gallery] [data-enhanced]"),
  ).toHaveAttribute("data-enhanced", "false");
  await expect(page.locator("[data-ml-lab] [data-enhanced]")).toHaveAttribute(
    "data-enhanced",
    "true",
  );

  await page.locator("[data-archive-scene]").scrollIntoViewIfNeeded();
  await expect(root).toHaveAttribute("data-signal-chapter", "archive");
  await expect(page.locator("[data-ml-lab] [data-enhanced]")).toHaveAttribute(
    "data-enhanced",
    "false",
  );
  await expect
    .poll(() =>
      page.locator("[data-archive-scene]").evaluate((section) =>
        Number.parseFloat(
          getComputedStyle(section).getPropertyValue("--archive-arrival"),
        ),
      ),
    )
    .toBeGreaterThan(0.98);

  const cluster = page.locator("[data-contact-cluster]");
  await cluster.scrollIntoViewIfNeeded();
  const bounds = await cluster.boundingBox();
  expect(bounds).not.toBeNull();
  if (!bounds) return;

  await page.mouse.move(bounds.x + bounds.width * 0.82, bounds.y + bounds.height / 2);
  await expect
    .poll(() =>
      page.locator("[data-contact-token]").first().evaluate((token) => {
        const matrix = new DOMMatrix(getComputedStyle(token).transform);
        return Math.abs(matrix.m41) + Math.abs(matrix.m42);
      }),
    )
    .toBeGreaterThan(0.2);

  await page.mouse.move(1, 1);
  await expect
    .poll(() =>
      page.locator("[data-contact-token]").first().evaluate((token) => {
        const matrix = new DOMMatrix(getComputedStyle(token).transform);
        return Math.abs(matrix.m41) + Math.abs(matrix.m42);
      }),
    )
    .toBeLessThan(0.05);

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
