"use client";

import { useCallback, useRef } from "react";

import { gsapEase, scrollMotion } from "@/lib/motion";
import { gsap, useGSAP } from "@/lib/gsap";

interface CapabilityPointerDetail {
  index: number;
  x: number;
  y: number;
}

const signalCoordinates = {
  hero: "H—00 / 07",
  work: "W—01 / 07",
  capabilities: "C—02 / 07",
  lab: "L—03 / 07",
  archive: "A—04 / 07",
  about: "A—05 / 07",
  contact: "C—06 / 07",
} as const;

type SignalChapter = keyof typeof signalCoordinates;

function publishCapabilityFocus(index: number) {
  window.dispatchEvent(
    new CustomEvent<CapabilityPointerDetail>("capability:pointer", {
      detail: { index, x: 0, y: 0 },
    }),
  );
}

export function HomepageMotionRuntime() {
  const scope = useRef<HTMLElement | null>(null);

  const setMarker = useCallback((node: HTMLSpanElement | null) => {
    scope.current =
      node?.closest<HTMLElement>("[data-home-motion-root]") ?? null;
  }, []);

  useGSAP(
    () => {
      if (!scope.current) return;

      const root = scope.current;

      const ambientSignal = root.querySelector<HTMLElement>(
        "[data-ambient-signal]",
      );

      const ambientCoordinate =
        ambientSignal?.querySelector<HTMLElement>("[data-coordinate]");

      const chapterSections = gsap.utils.toArray<HTMLElement>(
        "[data-motion-section], [data-contact-scene]",
        root,
      );

      const chapterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const chapter =
              entry.target.getAttribute("data-motion-section") ?? "contact";

            if (!(chapter in signalCoordinates)) return;

            root.dataset.signalChapter = chapter;

            if (ambientCoordinate) {
              ambientCoordinate.dataset.coordinate =
                signalCoordinates[chapter as SignalChapter];
            }
          });
        },
        {
          rootMargin: "-42% 0px -48% 0px",
        },
      );

      chapterSections.forEach((section) => {
        chapterObserver.observe(section);
      });

      const driftX = ambientSignal
        ? gsap.quickTo(ambientSignal, "x", {
            duration: 0.65,
            ease: gsapEase.settle,
          })
        : null;

      const driftY = ambientSignal
        ? gsap.quickTo(ambientSignal, "y", {
            duration: 0.65,
            ease: gsapEase.settle,
          })
        : null;

      const handleAmbientPointer = (event: PointerEvent) => {
        if (!driftX || !driftY || event.pointerType !== "mouse") {
          return;
        }

        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        driftX(x * 4);
        driftY(y * 3);
      };

      window.addEventListener("pointermove", handleAmbientPointer, {
        passive: true,
      });

      const hero = root.querySelector<HTMLElement>(
        '[data-motion-section="hero"]',
      );

      const heroCopy =
        hero?.querySelector<HTMLElement>("[data-hero-copy]");

      const heroField =
        hero?.querySelector<HTMLElement>("[data-hero-field]");

      const heroTransfer = hero?.querySelector<HTMLElement>(
        "[data-hero-transfer]",
      );

      const work =
        root.querySelector<HTMLElement>("[data-work-scene]");

      if (hero && heroCopy && heroField) {
        const heroTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: scrollMotion.scrubSoft,
            },
          })
          .to(
            heroCopy,
            {
              y: -38,
              ease: gsapEase.linear,
            },
            0,
          )
          .to(
            heroField,
            {
              y: 54,
              ease: gsapEase.linear,
            },
            0,
          );

        if (heroTransfer) {
          heroTimeline.fromTo(
            heroTransfer,
            {
              "--hero-transfer": 0,
            },
            {
              "--hero-transfer": 1,
              ease: gsapEase.linear,
            },
            0,
          );
        }

        if (work) {
          heroTimeline.fromTo(
            work,
            {
              "--work-arrival": 0,
            },
            {
              "--work-arrival": 1,
              ease: gsapEase.linear,
            },
            0,
          );
        }
      }

      const headings = gsap.utils.toArray<HTMLElement>(
        "[data-motion-heading]",
        root,
      );

      headings.forEach((heading) => {
        gsap.from(heading, {
          y: scrollMotion.revealDistance,
          clipPath: "inset(0 0 10% 0)",
          duration: scrollMotion.revealDuration,
          ease: gsapEase.reveal,
          clearProps: "transform,clipPath",
          scrollTrigger: {
            trigger: heading,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      });

      const capabilityCards = gsap.utils.toArray<HTMLElement>(
        "[data-capability-card]",
        root,
      );

      capabilityCards.forEach((card, index) => {
        const body =
          card.querySelector<HTMLElement>("[data-capability-body]");

        const visuals = gsap.utils.toArray<HTMLElement>(
          "[data-capability-visual]",
          card,
        );

        if (!body) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 79%",
              toggleActions: "play none none none",
              onEnter: () => publishCapabilityFocus(index),
              onEnterBack: () => publishCapabilityFocus(index),
              onLeave: () => publishCapabilityFocus(-1),
              onLeaveBack: () => publishCapabilityFocus(-1),
            },
          })
          .from(body, {
            y: 22,
            duration: 0.72,
            ease: gsapEase.reveal,
            clearProps: "transform",
          })
          .fromTo(
            visuals,
            {
              clipPath:
                index % 2 === 0
                  ? "inset(0 0 5% 0)"
                  : "inset(0 4% 0 0)",
            },
            {
              clipPath: "inset(0 0 0 0)",
              duration: 0.82,
              ease: gsapEase.reveal,
              clearProps: "clipPath",
            },
            0,
          );
      });

      const lab =
        root.querySelector<HTMLElement>("[data-ml-lab]");

      const capabilityTransfer = root.querySelector<HTMLElement>(
        "[data-capability-transfer]",
      );

      const archive =
        root.querySelector<HTMLElement>("[data-archive-scene]");

      if (lab) {
        const labStage =
          lab.querySelector<HTMLElement>("[data-ml-lab-stage]");

        const labState = {
          progress: 0,
        };

        let activePhase = "";

        const publishLabProgress = () => {
          const progress = Math.min(
            1,
            Math.max(0, labState.progress),
          );

          const phase =
            progress < 0.34
              ? "input"
              : progress < 0.68
                ? "features"
                : "signal";

          const transferProgress = Math.min(
            1,
            progress / 0.34,
          );

          const calmProgress = Math.min(
            1,
            Math.max(0, (progress - 0.7) / 0.3),
          );

          lab.style.setProperty(
            "--lab-progress",
            progress.toFixed(4),
          );

          lab.style.setProperty(
            "--lab-calm",
            calmProgress.toFixed(4),
          );

          capabilityTransfer?.style.setProperty(
            "--capability-transfer",
            transferProgress.toFixed(4),
          );

          archive?.style.setProperty(
            "--archive-arrival",
            calmProgress.toFixed(4),
          );

          if (phase !== activePhase) {
            activePhase = phase;
            lab.dataset.signalPhase = phase;
          }

          window.dispatchEvent(
            new CustomEvent("lab:progress", {
              detail: {
                progress,
              },
            }),
          );
        };

        const labTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: lab,
            start: "top 82%",
            end: "bottom 28%",
            scrub: scrollMotion.scrubResponsive,
          },
        });

        if (labStage) {
          labTimeline.fromTo(
            labStage,
            {
              clipPath: "inset(2.5% 0 0 0)",
            },
            {
              clipPath: "inset(0 0 0 0)",
              duration: 0.34,
              ease: gsapEase.linear,
              clearProps: "clipPath",
            },
            0,
          );
        }

        labTimeline.to(
          labState,
          {
            progress: 1,
            duration: 1,
            ease: gsapEase.linear,
            onUpdate: publishLabProgress,
          },
          0,
        );
      }

      const archiveGroups = gsap.utils.toArray<HTMLElement>(
        "[data-archive-group]",
        root,
      );

      archiveGroups.forEach((group) => {
        gsap.fromTo(
          group,
          {
            "--scan-progress": 0,
          },
          {
            "--scan-progress": 1,
            ease: gsapEase.linear,
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              end: "top 45%",
              scrub: scrollMotion.scrubResponsive,
            },
          },
        );
      });

      const aboutLead =
        root.querySelector<HTMLElement>("[data-about-lead]");

      const aboutFigures = gsap.utils.toArray<HTMLElement>(
        "[data-about-figure]",
        root,
      );

      const aboutMosaic =
        root.querySelector<HTMLElement>("[data-about-mosaic]");

      if (aboutLead) {
        gsap.from(aboutLead, {
          y: 34,
          clipPath: "inset(0 0 12% 0)",
          duration: 0.95,
          ease: gsapEase.reveal,
          clearProps: "transform,clipPath",
          scrollTrigger: {
            trigger: aboutLead,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }

      if (aboutMosaic && aboutFigures.length > 0) {
        gsap.from(aboutFigures, {
          y: (index) => (index === 1 ? 42 : 24),
          clipPath: "inset(8% 0 0 0)",
          duration: 0.9,
          stagger: 0.07,
          ease: gsapEase.reveal,
          clearProps: "transform,clipPath",
          scrollTrigger: {
            trigger: aboutMosaic,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        });
      }

      const contact =
        root.querySelector<HTMLElement>("[data-contact-scene]");

      const contactHeading =
        contact?.querySelector<HTMLElement>("[data-contact-heading]");

      const contactRail =
        contact?.querySelector<HTMLElement>("[data-contact-rail]");

      const contactForm =
        contact?.querySelector<HTMLElement>("[data-contact-form-stage]");

      const contactGrid =
        contact?.querySelector<HTMLElement>("[data-contact-grid]");

      const contactTokens = gsap.utils.toArray<HTMLElement>(
        "[data-contact-token]",
        contact ?? undefined,
      );

      const routeLines = gsap.utils.toArray<HTMLElement>(
        "[data-contact-route] i",
        contact ?? undefined,
      );

      if (
        contact &&
        contactHeading &&
        contactRail &&
        contactForm
      ) {
        const contactTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: contact,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        });

        if (contactGrid) {
          contactTimeline.fromTo(
            contactGrid,
            {
              opacity: 0.2,
              scaleX: 0.94,
            },
            {
              opacity: 0.42,
              scaleX: 1,
              duration: 0.95,
              ease: gsapEase.reveal,
              clearProps: "transform,opacity",
            },
          );
        }

        contactTimeline
          .from(
            contactHeading,
            {
              y: 34,
              clipPath: "inset(0 0 12% 0)",
              duration: 0.9,
              ease: gsapEase.reveal,
              clearProps: "transform,clipPath",
            },
            contactGrid ? "-=0.62" : 0,
          )
          .from(
            contactRail,
            {
              x: -20,
              duration: 0.7,
              ease: gsapEase.settle,
              clearProps: "transform",
            },
            "-=0.48",
          )
          .from(
            contactForm,
            {
              x: 24,
              duration: 0.75,
              ease: gsapEase.settle,
              clearProps: "transform",
            },
            "<",
          )
          .from(
            routeLines,
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.5,
              stagger: 0.08,
              ease: gsapEase.settle,
              clearProps: "transform",
            },
            "-=0.28",
          );

        if (contactTokens.length > 0) {
          contactTimeline.from(
            contactTokens,
            {
              y: 10,
              scale: 0.97,
              duration: 0.48,
              stagger: 0.045,
              ease: gsapEase.settle,
              clearProps: "transform",
            },
            "-=0.34",
          );
        }
      }

      const tokenFactors = [
        -0.74,
        0.48,
        -0.34,
        0.58,
        -0.46,
      ];

      const tokenSetters = contactTokens.map(
        (token, index) => ({
          factor: tokenFactors[index] ?? 0.4,

          x: gsap.quickTo(token, "x", {
            duration: 0.48,
            ease: gsapEase.settle,
            overwrite: "auto",
          }),

          y: gsap.quickTo(token, "y", {
            duration: 0.54,
            ease: gsapEase.settle,
            overwrite: "auto",
          }),
        }),
      );

      let contactBounds: DOMRect | null = null;

      const resetContactTokens = () => {
        contactBounds = null;

        tokenSetters.forEach(({ x, y }) => {
          x(0);
          y(0);
        });
      };

      const cacheContactBounds = () => {
        contactBounds =
          contact?.getBoundingClientRect() ?? null;
      };

      const handleContactPointer = (
        event: PointerEvent,
      ) => {
        if (
          !contactBounds ||
          event.pointerType !== "mouse"
        ) {
          return;
        }

        const x =
          (event.clientX - contactBounds.left) /
            contactBounds.width -
          0.5;

        const y =
          (event.clientY - contactBounds.top) /
            contactBounds.height -
          0.5;

        tokenSetters.forEach((setter) => {
          setter.x(x * setter.factor * 7);
          setter.y(y * setter.factor * 5);
        });
      };

      contact?.addEventListener(
        "pointerenter",
        cacheContactBounds,
      );

      contact?.addEventListener(
        "pointermove",
        handleContactPointer,
        {
          passive: true,
        },
      );

      contact?.addEventListener(
        "pointerleave",
        resetContactTokens,
      );

      let active = true;
      let initialHashSynced = false;

      const initialHash = window.location.hash;

      const syncInitialHash = () => {
        if (
          !active ||
          initialHashSynced ||
          !initialHash
        ) {
          return;
        }

        initialHashSynced = true;

        const targetId = initialHash.slice(1);

        const target = targetId
          ? document.getElementById(targetId)
          : null;

        if (!target) return;

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (!active) return;

            target.scrollIntoView({
              block: "start",
            });
          });
        });
      };

      window.addEventListener(
        "load",
        syncInitialHash,
        {
          once: true,
        },
      );

      void document.fonts.ready.then(
        syncInitialHash,
      );

      return () => {
        active = false;

        chapterObserver.disconnect();

        window.removeEventListener(
          "pointermove",
          handleAmbientPointer,
        );

        contact?.removeEventListener(
          "pointerenter",
          cacheContactBounds,
        );

        contact?.removeEventListener(
          "pointermove",
          handleContactPointer,
        );

        contact?.removeEventListener(
          "pointerleave",
          resetContactTokens,
        );

        window.removeEventListener(
          "load",
          syncInitialHash,
        );
      };
    },
    {
      scope,
    },
  );

  return (
    <span
      hidden
      aria-hidden="true"
      ref={setMarker}
    />
  );
}