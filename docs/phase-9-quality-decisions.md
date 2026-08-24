# Phase 9 quality decisions

## Automated quality gate

- Playwright `1.62.1` runs against a production Next.js server in Chromium desktop/mobile, reduced-motion Chromium, Firefox, and WebKit. The suite covers every public route, expected 404s, navigation, the mobile dialog, contact validation, resume behavior, metadata, structured data, security headers, responsive overflow, and four visual baselines.
- `@axe-core/playwright` `4.13.0` scans every public route, the 404 page, the open mobile menu, and contact error states with WCAG 2.0/2.1/2.2 A/AA tags. Axe has no exclusions.
- Vitest remains responsible for content/schema and contact-security unit tests. Playwright files are excluded through `vitest.config.mts`.
- The test-only contact environment uses Cloudflare's public test key and non-secret placeholder values. It never sends email or contains production credentials.

## Accessibility decisions

- Text scroll reveals use transform/clip movement, not reduced opacity. This avoids transient contrast failures while retaining the Phase 7 motion language.
- The Arctic Daze case-study accent was lightened on the night surface after automated contrast testing.
- Visible external-link wording and accessible names now agree; the header wordmark has a complete descriptive name.
- Mobile uses an explicit native-PDF fallback instead of loading an inline browser plug-in. Desktop retains the same-origin native PDF object and separate open/download actions.
- Reduced motion disables smooth scrolling, pins, continuous 3D, pointer physics, and movement-led reveals. The full semantic document remains visible.
- Automated results complement, but do not replace, manual keyboard, screen-reader, zoom, and contrast review.

## Performance findings

Lighthouse `12.8.2` was used because it is the newest release compatible with the repository's Node `22.17.1`; Lighthouse 13 currently requires Node `22.19+`. Results are local production-build lab measurements and are not field Core Web Vitals.

| Route/profile | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home / mobile | 91 | 100 | 100 | 100 | 3.42 s | 68 ms | 0 |
| Home / desktop | 100 | 100 | 100 | 100 | 0.74 s | 11 ms | 0 |
| Work / mobile | 96 | 100 | 100 | 100 | 2.73 s | 49 ms | 0 |
| SlateDesk / mobile | 94 | 100 | 100 | 100 | 2.84 s | 128 ms | 0 |
| Resume / mobile, representative median | 94 | 100 | 100 | 100 | ~2.8 s | ~140 ms | 0 |

The resume repeat ranged from 82–96 Performance under local CPU variance; the clean follow-up was 96 with 2.70 s LCP, 43 ms TBT, and 0 CLS. No field INP data exists yet. Production monitoring is a Phase 10/deployment concern.

- Local project WebP assets are 22–77 KB each. `next/image` supplies explicit geometry and responsive candidates; only the justified leading media receives priority.
- Geist and Instrument Serif are self-hosted through `next/font`; only the used variable sans and serif weight are loaded.
- GSAP/ScrollTrigger and Lenis remain desktop, motion-preference, route, and visibility scoped. The Three/R3F capability scene remains a lazy desktop enhancement and is absent from touch/reduced-motion startup.
- The native mobile PDF fallback avoids loading the browser PDF plug-in. No third-party script is requested on initial mobile load; Turnstile loads only when configured and near the contact form.

## SEO and security architecture

- `SITE_URL` is the sole canonical origin. When absent, canonical/absolute social URLs are omitted, robots metadata is `noindex`, `robots.txt` disallows crawling, and the sitemap is empty. A production launch must set a verified origin-only HTTPS value.
- Route metadata includes title templates, descriptions, Open Graph, and Twitter cards. `/social-card` provides a deterministic 1200×630 root/project image using verified content only.
- The root emits conservative Person JSON-LD; flagship pages emit evidence-backed SoftwareSourceCode JSON-LD. JSON is escaped before insertion.
- `sitemap.ts`, `robots.ts`, and `icon.svg` use Next.js metadata-file conventions. A web-app manifest was intentionally omitted because the portfolio is not an installable application.
- Baseline headers disable framework disclosure, MIME sniffing, camera/microphone/geolocation, and permissive referrers. CSP is deferred until the final deployment origin and Turnstile behavior can be tested with a production-appropriate policy.

## Production inputs still required

- Final production HTTPS origin for `SITE_URL`.
- Production Resend API key, verified sender/from address, destination address, and Cloudflare Turnstile site/secret keys.
- Deployment-host verification, real-device/assistive-technology checks, and post-launch field Core Web Vitals.

References: [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing), [Next.js metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), [Core Web Vitals thresholds](https://web.dev/articles/vitals), and [Lighthouse documentation](https://developer.chrome.com/docs/lighthouse/overview).
