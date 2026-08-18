"use client";

import dynamic from "next/dynamic";

const SignalFieldCanvas = dynamic(
  () => import("./signal-field-canvas").then((module) => module.SignalFieldCanvas),
  { ssr: false },
);

export function SignalFieldLoader() {
  return <SignalFieldCanvas />;
}
