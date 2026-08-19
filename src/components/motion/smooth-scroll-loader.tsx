"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SmoothScrollRuntime = dynamic(
  () =>
    import("./smooth-scroll-runtime").then(
      (module) => module.SmoothScrollRuntime,
    ),
  { ssr: false },
);

const SMOOTH_SCROLL_QUERY =
  "(min-width: 64.01rem) and (min-height: 40rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function SmoothScrollLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SMOOTH_SCROLL_QUERY);
    const sync = () => setEnabled(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return enabled ? <SmoothScrollRuntime /> : null;
}
