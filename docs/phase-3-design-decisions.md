# Phase 3 design decisions

## Project hierarchy

- The homepage and `/work` share one server-rendered flagship sequence, so project facts, actions, numbering, and media never diverge.
- SlateDesk uses an architecture-grid composition, FrameSignal an editorial split, Arctic Daze a responsive desktop/mobile montage, and CCTV a research board with evaluation context.
- Featured archive rows preserve summaries and technical metadata. Additional archive rows intentionally reduce to index, title, a small stack sample, and source action.

## Media and interaction

- Eight verified local WebP assets total about 410 KB before Next.js request-time optimization. None is preloaded because Selected Work is below the hero.
- `next/image` owns dimensions, responsive `sizes`, native lazy loading, and layout stability.
- Motion is limited to the media-link hover/tap spring. CSS handles small fine-pointer image shifts and archive-row response; no frame loop or pointer tracking was added.
- Touch keeps every title, summary, stack, status, and action visible. Secondary SlateDesk/FrameSignal screenshots are hidden in the smallest media stages only; they are supplementary, not required information.
- Reduced motion removes the Motion displacement and CSS image/row transitions while preserving immediate focus and hover states.

## Boundaries

- Project data, flagship/article markup, archives, and `next/image` metadata are Server Component friendly.
- `project-media-stage.tsx` is the only Phase 3 Client Component; it owns the small Motion enhancement around already-visible media.
- Project-specific styling is colocated in CSS Modules. Obsolete global project-list/archive rules and the old `project-list.tsx` component were removed.
- No dependency changed, no case-study route was added, and Phase 4 navigation/transition architecture remains uncommitted.
