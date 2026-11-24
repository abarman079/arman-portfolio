/** Pure frame-rate-independent motion math, shared by the optional 3D scene. */
export function clampUnit(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function approach(current: number, target: number, elapsedSeconds: number, rate = 9): number {
  return target + (current - target) * Math.exp(-rate * Math.max(0, elapsedSeconds));
}

export function signaturePose(progress: number, pointerX: number, pointerY: number) {
  const p = clampUnit(progress);
  const x = Math.max(-1, Math.min(1, pointerX));
  const y = Math.max(-1, Math.min(1, pointerY));
  return {
    separation: 1.03 + p * 0.54,
    rotationY: -0.13 + p * 0.62 + x * 0.16,
    rotationX: y * 0.085,
    cameraScale: 1 - p * 0.065,
    middleOffset: p * 0.25,
  };
}
