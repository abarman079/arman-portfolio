import { assertNoHorizontalOverflow, expect, scanForWcagViolations, test } from "./fixtures";

const slugs = ["slatedesk", "framesignal", "arctic-daze", "cctv-violence-detection", "phishing-website-detection", "wall-crack-detection"] as const;

for (const slug of slugs) {
  test(`${slug} has a source-backed scene and navigable chapters`, async ({ page, consoleErrors }) => {
    void consoleErrors;
    await page.goto(`/work/${slug}`);
    const world = page.locator(`[data-project-world="${slug}"]`);
    await expect(world).toBeVisible();
    await expect(world.locator(`[data-project-transition-target="${slug}"]`)).toHaveCount(1);
    await expect(world.locator("figure img")).toHaveCount(2);
    for (const image of await world.locator("figure img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((node) => node instanceof HTMLImageElement && node.complete && node.naturalWidth > 0)).toBe(true);
      await expect(image).toHaveAttribute("alt", /\S/);
    }
    const chapters = page.getByRole("navigation", { name: "Case study chapters" });
    await expect(chapters).toBeVisible();
    for (const link of await chapters.getByRole("link").all()) {
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^#[a-z0-9-]+$/);
      if (!href) throw new Error("Missing chapter destination");
      await expect(page.locator(href)).toHaveCount(1);
    }
    const firstChapter = chapters.getByRole("link", { name: "Project overview" });
    await firstChapter.click();
    await expect(page).toHaveURL(/#overview-title$/);
    await expect(page.locator("#overview-title")).toBeVisible();
    await scanForWcagViolations(page, "[data-project-world]");
    await scanForWcagViolations(page, "[data-case-chapters]");
    await assertNoHorizontalOverflow(page);
  });
}

test("case-study lighting follows forward and reverse scroll without pinning", async ({ page, consoleErrors }) => {
  void consoleErrors;
  await page.goto("/work/framesignal");
  const world = page.locator("[data-project-world]");
  const light = world.locator("[data-case-world-light]");
  await expect.poll(() => light.getAttribute("style")).toContain("transform");
  const scrollToProgress = (progress: number) => world.evaluate((element, value) => {
    const rect = element.getBoundingClientRect();
    const start = rect.top + window.scrollY - window.innerHeight * .95;
    const span = rect.height + window.innerHeight * .8;
    window.scrollTo({ top: start + span * value, behavior: "instant" });
  }, progress);
  const translation = () => light.evaluate((element) => {
    if (!(element instanceof HTMLElement) || !element.offsetWidth) return 0;
    const value = getComputedStyle(element).transform;
    return value === "none" ? 0 : new DOMMatrixReadOnly(value).m41 / element.offsetWidth;
  });
  await scrollToProgress(.2);
  await expect.poll(translation).toBeLessThan(0);
  await scrollToProgress(.8);
  await expect.poll(translation).toBeGreaterThan(.035);
  await scrollToProgress(.2);
  await expect.poll(translation).toBeLessThan(0);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});
