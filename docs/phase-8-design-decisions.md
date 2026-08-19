# Phase 8 responsive decisions

## Art direction by range

- **Large and standard desktop (1280px+)** keeps the full editorial scale; cinematic flagship pinning requires at least 736px height, while the capability canvas and Lenis wheel smoothing require at least 640px height.
- **Laptop / small desktop (1024–1279px)** uses tighter hero typography and grid proportions. The normal document flow remains complete when the cinematic height threshold is not met.
- **Tablet (768–1023px)** uses the static capability fallback, a shorter capability grid, and a reduced hero signal field. It does not inherit desktop pinning or WebGL merely because it has enough pixels.
- **Mobile (360–767px)** keeps the headline, primary actions, evidence, and domain map visible while using a two-column action/domain rhythm and shorter capability cards.
- **Short-height and landscape screens** use a wider, lower hero composition, a 64px navigation rail, a compact landscape menu, no Lenis, no flagship pinning, and no capability WebGL.

## Responsive system decisions

- The hero Canvas remains a decorative enhancement. It is static on coarse pointers and reduced-motion contexts; its semantic domain labels remain DOM content.
- The capability R3F layer now requires a fine pointer, no reduced-motion preference, at least `64.01rem` width, and at least `40rem` height. CSS fallback visuals remain present beneath the enhancement and are the complete tablet/mobile/short-height presentation.
- Mobile capability cards were reduced from 36–38rem to 33–35rem without removing project evidence, technology context, or links.
- The native PDF viewer remains the resume baseline. Mobile title sizing and wrapping were corrected without introducing a PDF dependency.
- Direct homepage hashes are reconciled after ScrollTrigger establishes pin spacing, preventing `/#work`, `/#expertise`, `/#about`, and `/#contact` from drifting after initial layout.

## Motion and scroll audit

- Large-desktop homepage ScrollTriggers were reduced from **29 to 27** by replacing three independent About mosaic triggers with one staggered mosaic trigger.
- The remaining triggers are scoped to one hero relation, section-heading reveals, four capability focus/reveals, two archive scan rules, one About lead, one About mosaic, one contact scene, and the four flagship progress/reveal/pin/handoff groups.
- Lenis remains wheel-only (`syncTouch: false`) and is disabled for touch/coarse pointers, reduced motion, viewports below `64.01rem`, and heights below `40rem`.
- No content is initialized as hidden. CSS layout, project links, fallback graphics, form controls, and case-study reading order remain complete without GSAP, Lenis, Canvas animation, or R3F.

## Visual QA outcome

- Reviewed the homepage at 360×800, 390×844, 430×932, 768×1024, 820×1180, 1024×768, 1024×600, 1280×800, 1366×768, 1440×900, 1440×600, 1920×1080, and 844×390.
- Reviewed `/work`, `/resume`, all four flagship case studies, and the invalid-project state at mobile and desktop widths.
- No horizontal overflow or loaded broken media was found in the route matrix.
- The final composition preserves the Signal & Structure hierarchy while reducing mobile vertical drag and short-height clipping.
