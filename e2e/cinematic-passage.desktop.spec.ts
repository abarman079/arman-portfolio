import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test("chapter passages scrub in both directions and retain native anchors", async ({ page, consoleErrors }) => {
  void consoleErrors;
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-smooth-scroll", "active");
  const work = page.locator('[data-cinematic-passage="work"]');
  const plane = work.locator('[data-passage-plane="front"]');
  await expect.poll(() => plane.getAttribute("style")).toContain("transform");
  const scrollToProgress = async (progress: number) => {
    await work.evaluate((element, value) => {
      const rect = element.getBoundingClientRect();
      const start = rect.top + window.scrollY - window.innerHeight * .9;
      const span = rect.height + window.innerHeight * .8;
      window.scrollTo({ top: start + span * value, behavior: "instant" });
    }, progress);
  };
  const scale = () => work.locator("[data-passage-progress]").evaluate((element) => {
    const transform = getComputedStyle(element).transform;
    return transform === "none" ? 1 : new DOMMatrixReadOnly(transform).a;
  });
  await scrollToProgress(.2);
  await expect.poll(scale).toBeLessThan(.35);
  await scrollToProgress(.8);
  await expect.poll(scale).toBeGreaterThan(.65);
  await scrollToProgress(.2);
  await expect.poll(scale).toBeLessThan(.35);
  await expect(work.locator("canvas")).toHaveCount(0);
  await work.getByRole("link", { name: "Continue to selected work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeVisible();
  const research = page.locator('[data-cinematic-passage="research"]');
  await research.getByRole("link", { name: "Continue to research" }).click();
  await expect(page).toHaveURL(/#research$/);
  await expect(page.locator("#research")).toBeVisible();
  await assertNoHorizontalOverflow(page);
});
