"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollRuntime() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

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
      prevent: (node) => Boolean(node.closest("dialog, [data-lenis-prevent]")),
    });

    lenisRef.current = lenis;
    document.documentElement.dataset.smoothScroll = "active";

    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    const syncMenuState = () => {
      if (document.body.dataset.menuOpen === "true") lenis.stop();
      else lenis.start();
    };

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const menuObserver = new MutationObserver(syncMenuState);
    menuObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-menu-open"],
    });

    return () => {
      menuObserver.disconnect();
      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
      lenisRef.current = null;
      delete document.documentElement.dataset.smoothScroll;
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
