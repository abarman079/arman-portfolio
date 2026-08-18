"use client";

import { useEffect, useRef } from "react";

import styles from "./hero-foundation.module.css";

interface Point {
  x: number;
  y: number;
}

const primaryTrace: readonly Point[] = [
  { x: 0.08, y: 0.7 },
  { x: 0.34, y: 0.7 },
  { x: 0.34, y: 0.43 },
  { x: 0.64, y: 0.43 },
  { x: 0.64, y: 0.2 },
  { x: 0.9, y: 0.2 },
];

const secondaryTrace: readonly Point[] = [
  { x: 0.34, y: 0.7 },
  { x: 0.73, y: 0.7 },
  { x: 0.73, y: 0.84 },
  { x: 0.92, y: 0.84 },
];

function pointAlongTrace(trace: readonly Point[], progress: number): Point {
  const lengths = trace.slice(1).map((point, index) => {
    const previous = trace[index];
    return Math.hypot(point.x - previous.x, point.y - previous.y);
  });
  const total = lengths.reduce((sum, length) => sum + length, 0);
  let remaining = progress * total;

  for (let index = 0; index < lengths.length; index += 1) {
    const length = lengths[index];
    if (remaining <= length) {
      const start = trace[index];
      const end = trace[index + 1];
      const ratio = length === 0 ? 0 : remaining / length;
      return {
        x: start.x + (end.x - start.x) * ratio,
        y: start.y + (end.y - start.y) * ratio,
      };
    }
    remaining -= length;
  }

  return trace[trace.length - 1];
}

export function SignalFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasCandidate = canvasRef.current;
    if (!canvasCandidate) return;
    const canvas: HTMLCanvasElement = canvasCandidate;

    const fieldCandidate = canvas.closest<HTMLElement>("[data-signal-field]");
    if (!fieldCandidate) return;
    const field: HTMLElement = fieldCandidate;

    const contextCandidate = canvas.getContext("2d");
    if (!contextCandidate) return;
    const context: CanvasRenderingContext2D = contextCandidate;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let width = 0;
    let height = 0;
    let deviceScale = 1;
    let frame = 0;
    let inView = true;
    let running = false;
    const pointer = { x: 0.5, y: 0.5, active: false };

    function drawTrace(trace: readonly Point[], color: string, lineWidth: number) {
      context.beginPath();
      trace.forEach((point, index) => {
        const x = point.x * width;
        const y = point.y * height;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.stroke();
    }

    function draw(time: number) {
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
      context.clearRect(0, 0, width, height);

      const columns = width < 480 ? 4 : 8;
      const rows = width < 480 ? 5 : 8;
      context.lineWidth = 1;
      context.strokeStyle = "rgba(94, 98, 105, 0.13)";

      for (let column = 1; column < columns; column += 1) {
        const x = (column / columns) * width;
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let row = 1; row < rows; row += 1) {
        const y = (row / rows) * height;
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      drawTrace(primaryTrace, "rgba(17, 19, 24, 0.62)", 1.2);
      drawTrace(secondaryTrace, "rgba(17, 19, 24, 0.34)", 1);

      const anchors = [primaryTrace[0], primaryTrace[2], primaryTrace[4], secondaryTrace[2]];
      for (const [index, anchor] of anchors.entries()) {
        const size = index === 0 ? 9 : 7;
        context.fillStyle = index === 0 ? "#ff5a36" : "#f3f0e8";
        context.strokeStyle = index === 0 ? "#8a2413" : "rgba(17, 19, 24, 0.72)";
        context.lineWidth = 1;
        context.fillRect(anchor.x * width - size / 2, anchor.y * height - size / 2, size, size);
        context.strokeRect(anchor.x * width - size / 2, anchor.y * height - size / 2, size, size);
      }

      const animated = !reducedMotion.matches && finePointer.matches && width >= 768;
      const progress = animated ? ((time / 5200) % 1) : 0.58;
      const pulse = pointAlongTrace(primaryTrace, progress);
      const pointerBiasX = pointer.active ? (pointer.x - 0.5) * 4 : 0;
      const pointerBiasY = pointer.active ? (pointer.y - 0.5) * 4 : 0;

      context.beginPath();
      context.arc(
        pulse.x * width + pointerBiasX,
        pulse.y * height + pointerBiasY,
        3.2,
        0,
        Math.PI * 2,
      );
      context.fillStyle = "#ff5a36";
      context.fill();

      if (pointer.active && animated) {
        const x = pointer.x * width;
        const y = pointer.y * height;
        context.strokeStyle = "rgba(255, 90, 54, 0.28)";
        context.beginPath();
        context.moveTo(x - 8, y);
        context.lineTo(x + 8, y);
        context.moveTo(x, y - 8);
        context.lineTo(x, y + 8);
        context.stroke();
      }
    }

    function shouldAnimate() {
      return (
        inView &&
        !document.hidden &&
        !reducedMotion.matches &&
        finePointer.matches &&
        width >= 768
      );
    }

    function tick(time: number) {
      draw(time);
      frame = window.requestAnimationFrame(tick);
    }

    function syncAnimation() {
      window.cancelAnimationFrame(frame);
      running = shouldAnimate();
      if (running) frame = window.requestAnimationFrame(tick);
      else draw(3000);
    }

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      deviceScale = Math.min(window.devicePixelRatio || 1, width < 768 ? 1 : 1.5);
      canvas.width = Math.round(width * deviceScale);
      canvas.height = Math.round(height * deviceScale);
      syncAnimation();
    }

    function handlePointerMove(event: PointerEvent) {
      if (!finePointer.matches || reducedMotion.matches) return;
      const bounds = field.getBoundingClientRect();
      pointer.x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      pointer.y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
      pointer.active = true;
      if (!running) draw(3000);
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncAnimation();
      },
      { rootMargin: "120px" },
    );

    resizeObserver.observe(canvas);
    visibilityObserver.observe(field);
    field.addEventListener("pointermove", handlePointerMove, { passive: true });
    field.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", syncAnimation);
    reducedMotion.addEventListener("change", syncAnimation);
    finePointer.addEventListener("change", syncAnimation);
    resize();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      field.removeEventListener("pointermove", handlePointerMove);
      field.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", syncAnimation);
      reducedMotion.removeEventListener("change", syncAnimation);
      finePointer.removeEventListener("change", syncAnimation);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
