"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

const HomepageMotionRuntime = dynamic(
  () =>
    import("./homepage-motion-runtime").then(
      (module) => module.HomepageMotionRuntime,
    ),
  { ssr: false },
);

const HOMEPAGE_MOTION_QUERY =
  "(min-width: 64.01rem) and (min-height: 40rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function HomepageMotionShell({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(HOMEPAGE_MOTION_QUERY);
    const sync = () => setEnabled(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return (
    <main id="main-content" data-home-motion-root>
      {children}
      {enabled ? <HomepageMotionRuntime /> : null}
    </main>
  );
}
