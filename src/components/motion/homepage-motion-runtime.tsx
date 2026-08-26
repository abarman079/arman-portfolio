"use client";

import { useCallback, useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { gsapEase, scrollMotion } from "@/lib/motion";

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
      const hero = root.querySelector<HTMLElement>('[data-motion-section="hero"]');
      const heroCopy = hero?.querySelector<HTMLElement>("[data-hero-copy]");
      const heroEvidence = hero?.querySelector<HTMLElement>("[data-hero-evidence]");

      if (hero && heroCopy && heroEvidence) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: scrollMotion.scrubSoft,
            },
          })
          .to(heroCopy, { y: -24, ease: gsapEase.linear }, 0)
          .to(heroEvidence, { y: 30, ease: gsapEase.linear }, 0);
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

      const lab = root.querySelector<HTMLElement>("[data-ml-lab]");

      if (lab) {
        const labStage = lab.querySelector<HTMLElement>("[data-ml-lab-stage]");
        const labState = { progress: 0 };
        let activePhase = "";

        const publishLabProgress = () => {
          const progress = Math.min(1, Math.max(0, labState.progress));
          const phase =
            progress < 0.34 ? "input" : progress < 0.68 ? "features" : "signal";

          lab.style.setProperty("--lab-progress", progress.toFixed(4));

          if (phase !== activePhase) {
            activePhase = phase;
            lab.dataset.signalPhase = phase;
          }

          window.dispatchEvent(
            new CustomEvent("lab:progress", { detail: { progress } }),
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
            { clipPath: "inset(2.5% 0 0 0)" },
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

      const aboutLead = root.querySelector<HTMLElement>("[data-about-lead]");

      if (aboutLead) {
        gsap.from(aboutLead, {
          y: 30,
          clipPath: "inset(0 0 10% 0)",
          duration: 0.9,
          ease: gsapEase.reveal,
          clearProps: "transform,clipPath",
          scrollTrigger: {
            trigger: aboutLead,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }

      const contact = root.querySelector<HTMLElement>("[data-contact-scene]");
      const contactHeading =
        contact?.querySelector<HTMLElement>("[data-contact-heading]");
      const contactRail =
        contact?.querySelector<HTMLElement>("[data-contact-rail]");
      const contactForm =
        contact?.querySelector<HTMLElement>("[data-contact-form-stage]");

      if (contact && contactHeading && contactRail && contactForm) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: contact,
              start: "top 72%",
              toggleActions: "play none none none",
            },
          })
          .from(contactHeading, {
            y: 32,
            clipPath: "inset(0 0 10% 0)",
            duration: 0.86,
            ease: gsapEase.reveal,
            clearProps: "transform,clipPath",
          })
          .from(
            contactRail,
            {
              x: -18,
              duration: 0.66,
              ease: gsapEase.settle,
              clearProps: "transform",
            },
            "-=0.44",
          )
          .from(
            contactForm,
            {
              x: 20,
              duration: 0.7,
              ease: gsapEase.settle,
              clearProps: "transform",
            },
            "<",
          );
      }

      let active = true;
      let initialHashSynced = false;
      const initialHash = window.location.hash;

      const syncInitialHash = () => {
        if (!active || initialHashSynced || !initialHash) return;

        initialHashSynced = true;
        const targetId = initialHash.slice(1);
        const target = targetId ? document.getElementById(targetId) : null;

        if (!target) return;

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (active) target.scrollIntoView({ block: "start" });
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
