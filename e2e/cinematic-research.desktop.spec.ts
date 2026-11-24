import { assertNoHorizontalOverflow, expect, scanForWcagViolations, test } from "./fixtures";

test("3D request falls back gracefully without WebGL2", async ({ page, consoleErrors }) => {
  void consoleErrors;
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      configurable: true,
      writable: true,
      value: function (this: HTMLCanvasElement, ...args: unknown[]) {
        if (args[0] === "webgl2") return null;
        return Reflect.apply(original, this, args);
      },
    });
  });
  await page.goto("/");
  const scene = page.locator("[data-signature-status]");
  await expect(scene.locator("canvas")).toHaveCount(0);
  await scene.getByRole("button", { name: "Explore 3D" }).click();
  await expect(scene).toHaveAttribute("data-signature-status", "unavailable");
  await expect(scene.locator("[data-signature-scene]")).toBeVisible();
  await expect(scene.locator("canvas")).toHaveCount(0);
  await expect(scene.getByRole("button", { name: "Explore 3D" })).toBeEnabled();
});

test("3D is optional and restores the illustration after being turned off", async ({ page }) => {
  await page.goto("/");
  const scene = page.locator("[data-signature-status]");
  await expect(scene).toHaveAttribute("data-signature-status", "still");
  await scene.getByRole("button", { name: "Explore 3D" }).click();
  // CI may deliberately reject a software-only GPU. Do not require GPU support.
  await expect(scene).toHaveAttribute("data-signature-status", /^(ready|unavailable)$/, { timeout: 20000 });
  if ((await scene.getAttribute("data-signature-status")) === "ready") {
    await expect(scene.locator("canvas")).toHaveCount(1);
    await scene.getByRole("button", { name: "Use illustration" }).click();
    await expect(scene).toHaveAttribute("data-signature-status", "still");
    await expect(scene.locator("canvas")).toHaveCount(0);
  } else {
    await expect(scene.locator("canvas")).toHaveCount(0);
  }
  await expect(scene.locator("[data-signature-scene]")).toBeVisible();
});

test("research comparisons show verified values, limitations and accessible tables", async ({ page, consoleErrors }) => {
  void consoleErrors;
  await page.goto("/#research");
  const phishing = page.locator("#research-phishing");
  await expect(phishing.getByText("91.31%", { exact: false }).first()).toBeVisible();
  await phishing.getByRole("radio", { name: "False-positive rate" }).check();
  await expect(phishing.getByText("2.55%", { exact: false }).first()).toBeVisible();
  await phishing.getByText("All measured values", { exact: true }).click();
  await expect(phishing.getByRole("table")).toBeVisible();
  await expect(phishing.getByRole("table").getByText("97.80%", { exact: true })).toBeVisible();
  const crack = page.locator("#research-cracks");
  await crack.getByRole("radio", { name: "Limit clean-image false positives" }).check();
  await expect(crack.getByText("0.46%", { exact: false }).first()).toBeVisible();
  await crack.getByText("Both operating policies", { exact: true }).click();
  await expect(crack.getByRole("table")).toBeVisible();
  await expect(crack.getByText(/not independent test or structural-inspection certification/)).toBeVisible();
  await scanForWcagViolations(page, "#research");
  await assertNoHorizontalOverflow(page);
});
