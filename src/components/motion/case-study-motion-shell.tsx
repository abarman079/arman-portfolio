"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

const CaseStudyMotionRuntime = dynamic(
  () =>
    import("./case-study-motion-runtime").then(
      (module) => module.CaseStudyMotionRuntime,
    ),
  { ssr: false },
);

const CASE_STUDY_MOTION_QUERY =
  "(min-width: 64.01rem) and (min-height: 40rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function CaseStudyMotionShell({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(CASE_STUDY_MOTION_QUERY);
    const sync = () => setEnabled(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return (
    <main id="main-content" className={className} data-case-motion-root>
      {children}
      {enabled ? <CaseStudyMotionRuntime /> : null}
    </main>
  );
}
