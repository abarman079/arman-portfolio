"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollRuntime() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const hasMountedPathnameRef = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      autoRaf: false,
      lerp: 0.14,
      overscroll: true,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      prevent: (node) =>
        Boolean(node.closest("dialog, [data-lenis-prevent]")),
    });

    lenisRef.current = lenis;
    document.documentElement.dataset.smoothScroll = "active";

    const clampVelocity = gsap.utils.clamp(-1, 1);
    const velocityState = { value: 0 };

    const renderVelocity = () => {
      document.documentElement.style.setProperty(
        "--scroll-velocity",
        velocityState.value.toFixed(4),
      );
    };

    const velocityTo = gsap.quickTo(velocityState, "value", {
      duration: 0.38,
      ease: "power3.out",
      onUpdate: renderVelocity,
    });

    const settleVelocity = gsap
      .delayedCall(0.08, () => velocityTo(0))
      .pause();

    const updateScrollTrigger = (instance: Lenis) => {
      const targetVelocity = clampVelocity(instance.velocity / 28);

      velocityTo(targetVelocity);
      settleVelocity.restart(true);

      ScrollTrigger.update();
    };

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    const syncInteractionState = () => {
      if (
        document.body.dataset.menuOpen === "true" ||
        document.body.dataset.projectTransition === "active"
      ) {
        lenis.stop();

        gsap.killTweensOf(velocityState);

        velocityState.value = 0;
        renderVelocity();
      } else {
        lenis.start();
      }
    };

    const syncTransitionRoute = () => {
      lenis.scrollTo(0, {
        immediate: true,
        force: true,
      });

      lenis.resize();
    };

    lenis.on("scroll", updateScrollTrigger);

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const menuObserver = new MutationObserver(syncInteractionState);

    menuObserver.observe(document.body, {
      attributes: true,
      attributeFilter: [
        "data-menu-open",
        "data-project-transition",
      ],
    });

    window.addEventListener(
      "project-transition:route",
      syncTransitionRoute,
    );

    return () => {
      menuObserver.disconnect();

      window.removeEventListener(
        "project-transition:route",
        syncTransitionRoute,
      );

      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(500, 33);

      settleVelocity.kill();
      gsap.killTweensOf(velocityState);

      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();

      lenisRef.current = null;

      document.documentElement.style.removeProperty(
        "--scroll-velocity",
      );

      delete document.documentElement.dataset.smoothScroll;
    };
  }, []);

  useEffect(() => {
    // Do not globally refresh ScrollTrigger during the initial React/GSAP mount.
    // Each trigger measures itself during creation, and GSAP performs its own
    // normal load/resize lifecycle. This effect is only for actual route changes.
    if (!hasMountedPathnameRef.current) {
      hasMountedPathnameRef.current = true;
      return;
    }

    let firstFrame = 0;
    let secondFrame = 0;

    const refresh = () => {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          lenisRef.current?.resize();
          ScrollTrigger.refresh(true);
        });
      });
    };

    if (
      document.body.dataset.projectTransition === "active"
    ) {
      window.addEventListener(
        "project-transition:complete",
        refresh,
        {
          once: true,
        },
      );
    } else {
      refresh();
    }

    return () => {
      window.removeEventListener(
        "project-transition:complete",
        refresh,
      );

      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [pathname]);

  return null;
}