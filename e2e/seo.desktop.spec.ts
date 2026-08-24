import { expect, test } from "./fixtures";

test("root metadata, canonical, social tags, and Person JSON-LD are coherent", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/");

  await expect(page).toHaveTitle(/Md\. Akibul Hasan Arman/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://127.0.0.1:4173",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "http://127.0.0.1:4173/social-card",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );

  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  ) as Record<string, unknown>;
  expect(structuredData["@type"]).toBe("Person");
  expect(structuredData.name).toBe("Md. Akibul Hasan Arman");
});

test("case-study metadata and Project JSON-LD match visible project content", async ({
  page,
  consoleErrors,
}) => {
  void consoleErrors;
  await page.goto("/work/slatedesk");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://127.0.0.1:4173/work/slatedesk",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "http://127.0.0.1:4173/social-card?project=slatedesk",
  );

  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  ) as Record<string, unknown>;
  expect(structuredData["@type"]).toBe("SoftwareSourceCode");
  expect(structuredData.name).toBe("SlateDesk");
  expect(structuredData.codeRepository).toBe(
    "https://github.com/abarman079/slatedesk",
  );
});

test("sitemap, robots, social card, and baseline headers are production-shaped", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapText = await sitemap.text();
  for (const path of [
    "http://127.0.0.1:4173/",
    "http://127.0.0.1:4173/work",
    "http://127.0.0.1:4173/work/slatedesk",
    "http://127.0.0.1:4173/resume",
  ]) {
    expect(sitemapText).toContain(`<loc>${path}</loc>`);
  }

  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(
    "Sitemap: http://127.0.0.1:4173/sitemap.xml",
  );

  const card = await request.get("/social-card?project=framesignal");
  expect(card.ok()).toBeTruthy();
  expect(card.headers()["content-type"]).toContain("image/png");

  const homepage = await request.get("/");
  expect(homepage.headers()["x-content-type-options"]).toBe("nosniff");
  expect(homepage.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  expect(homepage.headers()["referrer-policy"]).toBe(
    "strict-origin-when-cross-origin",
  );
  expect(homepage.headers()["x-powered-by"]).toBeUndefined();
});
