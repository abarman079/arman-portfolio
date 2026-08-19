"use client";

import { useCallback, useRef } from "react";

import { gsapEase, scrollMotion } from "@/lib/motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface CapabilityPointerDetail {
  index: number;
  x: number;
  y: number;
}

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
    scope.current = node?.closest<HTMLElement>("[data-home-motion-root]") ?? null;
  }, []);

  useGSAP(
    () => {
      if (!scope.current) return;

      const hero = scope.current.querySelector<HTMLElement>(
        '[data-motion-section="hero"]',
      );
      const heroCopy = hero?.querySelector<HTMLElement>("[data-hero-copy]");
      const heroField = hero?.querySelector<HTMLElement>("[data-hero-field]");

      if (hero && heroCopy && heroField) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: scrollMotion.scrubSoft,
            },
          })
          .to(heroCopy, { y: -38, ease: gsapEase.linear }, 0)
          .to(heroField, { y: 54, ease: gsapEase.linear }, 0);
      }

      const headings = gsap.utils.toArray<HTMLElement>(
        "[data-motion-heading]",
        scope.current,
      );

      headings.forEach((heading) => {
        gsap.from(heading, {
          y: scrollMotion.revealDistance,
          autoAlpha: 0.78,
          clipPath: "inset(0 0 10% 0)",
          duration: scrollMotion.revealDuration,
          ease: gsapEase.reveal,
          clearProps: "transform,opacity,visibility,clipPath",
          scrollTrigger: {
            trigger: heading,
            start: "top 86%",
            once: true,
          },
        });
      });

      const capabilityCards = gsap.utils.toArray<HTMLElement>(
        "[data-capability-card]",
        scope.current,
      );

      capabilityCards.forEach((card, index) => {
        const body = card.querySelector<HTMLElement>("[data-capability-body]");
        if (!body) return;

        gsap.from(body, {
          y: 22,
          autoAlpha: 0.82,
          duration: 0.72,
          ease: gsapEase.reveal,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: card,
            start: "top 79%",
            once: true,
            onEnter: () => publishCapabilityFocus(index),
            onEnterBack: () => publishCapabilityFocus(index),
            onLeave: () => publishCapabilityFocus(-1),
            onLeaveBack: () => publishCapabilityFocus(-1),
          },
        });
      });

      const archiveGroups = gsap.utils.toArray<HTMLElement>(
        "[data-archive-group]",
        scope.current,
      );

      archiveGroups.forEach((group) => {
        gsap.fromTo(
          group,
          { "--scan-progress": 0 },
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

      const aboutLead = scope.current.querySelector<HTMLElement>("[data-about-lead]");
      const aboutFigures = gsap.utils.toArray<HTMLElement>(
        "[data-about-figure]",
        scope.current,
      );
      const aboutMosaic = scope.current.querySelector<HTMLElement>(
        "[data-about-mosaic]",
      );

      if (aboutLead) {
        gsap.from(aboutLead, {
          y: 34,
          autoAlpha: 0.76,
          clipPath: "inset(0 0 12% 0)",
          duration: 0.95,
          ease: gsapEase.reveal,
          clearProps: "transform,opacity,visibility,clipPath",
          scrollTrigger: { trigger: aboutLead, start: "top 82%", once: true },
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
          scrollTrigger: { trigger: aboutMosaic, start: "top 84%", once: true },
        });
      }

      const contact = scope.current.querySelector<HTMLElement>("[data-contact-scene]");
      const contactHeading = contact?.querySelector<HTMLElement>("[data-contact-heading]");
      const contactRail = contact?.querySelector<HTMLElement>("[data-contact-rail]");
      const contactForm = contact?.querySelector<HTMLElement>("[data-contact-form-stage]");
      const routeLines = gsap.utils.toArray<HTMLElement>(
        "[data-contact-route] i",
        contact ?? undefined,
      );

      if (contact && contactHeading && contactRail && contactForm) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: contact,
              start: "top 72%",
              once: true,
            },
          })
          .from(contactHeading, {
            y: 34,
            autoAlpha: 0.78,
            clipPath: "inset(0 0 12% 0)",
            duration: 0.9,
            ease: gsapEase.reveal,
            clearProps: "transform,opacity,visibility,clipPath",
          })
          .from(
            contactRail,
            {
              x: -20,
              autoAlpha: 0.84,
              duration: 0.7,
              ease: gsapEase.settle,
              clearProps: "transform,opacity,visibility",
            },
            "-=0.48",
          )
          .from(
            contactForm,
            {
              x: 24,
              autoAlpha: 0.86,
              duration: 0.75,
              ease: gsapEase.settle,
              clearProps: "transform,opacity,visibility",
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
      }

      let active = true;
      const refresh = () => {
        if (active) ScrollTrigger.refresh();
      };
      const syncInitialHash = () => {
        refresh();

        const targetId = window.location.hash.slice(1);
        const target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (!active) return;
            target.scrollIntoView({ block: "start" });
            ScrollTrigger.update();
          });
        });
      };

      window.addEventListener("load", syncInitialHash, { once: true });
      void document.fonts.ready.then(syncInitialHash);

      return () => {
        active = false;
        window.removeEventListener("load", syncInitialHash);
      };
    },
    { scope },
  );

  return <span hidden aria-hidden="true" ref={setMarker} />;
}
