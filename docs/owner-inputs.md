# Owner inputs needed later

None of these items blocks Phase 1 unless its related feature is being published. Optional unknowns remain hidden.

## Identity and contact

- [x] Current public resume supplied at `public/resume/md-akibul-hasan-arman-cv.pdf`. The owner designated this PDF as the resume source of truth on 2026-08-18.
- [x] Canonical LinkedIn confirmed as `https://www.linkedin.com/in/md-akibul-hasan-arman-81857b339/` on 2026-08-18.
- [x] Public contact email confirmed as `abarmanoffice@gmail.com` on 2026-08-18.
- [x] Public location wording confirmed as `Aftabnagar, Dhaka` on 2026-08-18.
- [ ] Provide exact availability wording and an expiry/review date, or approve omitting availability.

## Flagship case-study narrative

For SlateDesk, FrameSignal, Arctic Daze, and CCTV Violence Detection:

- [ ] Confirm personal role and whether the work was solo, team, academic, recruitment, client, or business work.
- [ ] Confirm project year/timeline.
- [ ] Confirm which challenges, decisions, results, and lessons may be written in first person.

Project-specific:

- [ ] SlateDesk: confirm whether the recruitment-project context should be public. Phase 3 crops omit the demo identities/emails visible in the source screenshots.
- [x] FrameSignal: Phase 3 public-page capture was authorized by the implementation brief; retained captures exclude movie media and authenticated CMS content. Authenticated CMS imagery still requires separate later approval.
- [ ] Arctic Daze: confirm the owner/business relationship, feature-completion boundaries, and republication rights/credits for all product photography. Phase 3 retained only captures with the photography cropped out or outside the viewport.
- [ ] CCTV: confirm academic context, dataset attribution/license, and whether any sample frames are suitable for public display.

## Missing visual material

- [ ] Provide higher-resolution SlateDesk images only if the committed seven screenshots do not pass later visual QA.
- [x] Fresh public desktop/mobile captures of FrameSignal and Arctic Daze were authorized for Phase 3. Only the rights-safe frames documented in `docs/phase-3-media-provenance.md` were retained.
- [ ] If archive rows later require imagery, provide or approve safe captures for TravelEase, RoleBoard, PulseFlow, EWU FUB Energy Monitor, and EduConsult Pro.
- [ ] Confirm ownership/license for PulseFlow marks and any custom EduConsult visuals.

## Deployment and contact service

- [ ] Confirm the final production domain and deployment target before SEO/deployment work.
- [ ] Configure `RESEND_API_KEY`, an owner-verified `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` in local/deployment secret storage—not this repository.
- [ ] Configure production `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`, restrict the widget to the final hostname, and set `SITE_URL` to that production origin.

## Archive clarifications if promoted later

- [ ] Confirm final metric/evaluation context for Wall Crack Detection before showing a headline number.
- [ ] Confirm that TravelEase payment remains a demo and whether its deployment is safe to link.
- [ ] Confirm PulseFlow database/runtime details and that no public page exposes sensitive-looking demo records.
- [ ] Confirm EWU FUB Energy Monitor is presented as simulated telemetry rather than a physical IoT deployment.
- [ ] Identify which EduConsult Pro features are custom work versus Astra/vendor functionality.
