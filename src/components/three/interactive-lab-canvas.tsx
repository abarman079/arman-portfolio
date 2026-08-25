"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useEffect,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { MathUtils, ShaderMaterial, Vector2 } from "three";

import styles from "../sections/interactive-lab-section.module.css";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uMotion;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    float wave = sin((position.x * 2.8) + (uTime * 0.16));
    transformed.y += wave * 0.012 * uMotion;
    gl_Position = vec4(transformed, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;
  uniform float uAspect;
  uniform float uMotion;
  uniform vec2 uPointer;

  float hash21(vec2 value) {
    value = fract(value * vec2(123.34, 456.21));
    value += dot(value, value + 45.32);
    return fract(value.x * value.y);
  }

  float valueNoise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);

    float a = hash21(cell);
    float b = hash21(cell + vec2(1.0, 0.0));
    float c = hash21(cell + vec2(0.0, 1.0));
    float d = hash21(cell + vec2(1.0, 1.0));

    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  float fieldNoise(vec2 point) {
    float value = 0.0;
    float amplitude = 0.56;
    for (int octave = 0; octave < 4; octave++) {
      value += valueNoise(point) * amplitude;
      point = point * 2.03 + vec2(2.7, 1.9);
      amplitude *= 0.48;
    }
    return value;
  }

  float line(float value, float width) {
    return 1.0 - smoothstep(width, width + 0.012, abs(value));
  }

  void main() {
    vec2 uv = vUv;
    vec2 pointer = uPointer * vec2(uAspect, 1.0);
    vec2 centered = (uv - 0.5) * vec2(uAspect, 1.0);

    float drift = uTime * 0.018 * uMotion;
    vec2 distortion = vec2(
      valueNoise((uv * 4.0) + vec2(drift, 0.0)) - 0.5,
      valueNoise((uv * 4.0) + vec2(8.2, drift)) - 0.5
    );
    uv += distortion * (0.012 + uProgress * 0.018);
    uv += uPointer * 0.012;

    vec2 rasterCells = floor(uv * vec2(42.0, 24.0));
    float raster = hash21(rasterCells);
    float scan = 0.5 + 0.5 * sin((uv.y * 190.0) + (uTime * 0.5 * uMotion));
    float inputField = smoothstep(0.33, 0.78, (raster * 0.78) + (scan * 0.22));

    float field = fieldNoise((uv * vec2(3.4, 2.7)) + vec2(drift, -drift));
    float contour = line(fract(field * 5.4) - 0.5, 0.085);
    float fineContour = line(fract(field * 10.8) - 0.5, 0.035) * 0.42;

    vec2 grid = abs(fract(uv * vec2(16.0, 10.0)) - 0.5);
    float ruledGrid = line(grid.x - 0.5, 0.012) + line(grid.y - 0.5, 0.012);

    float decisionField = field + 0.08 * sin(uv.x * 9.0) - 0.04 * cos(uv.y * 12.0);
    float region = smoothstep(0.54, 0.59, decisionField);
    float boundary = 1.0 - smoothstep(0.012, 0.045, abs(decisionField - 0.565));

    float pointerDistance = length(centered - pointer * 0.24);
    float pointerSignal = 1.0 - smoothstep(0.08, 0.28, pointerDistance);
    float crosshair = line(centered.x - pointer.x * 0.24, 0.0025)
      + line(centered.y - pointer.y * 0.24, 0.0025);
    crosshair *= 1.0 - smoothstep(0.16, 0.42, pointerDistance);

    float inputWeight = 1.0 - smoothstep(0.18, 0.48, uProgress);
    float featureWeight = smoothstep(0.12, 0.42, uProgress)
      * (1.0 - smoothstep(0.66, 0.9, uProgress));
    float signalWeight = smoothstep(0.56, 0.88, uProgress);

    vec3 ink = vec3(0.035, 0.048, 0.067);
    vec3 graphite = vec3(0.09, 0.12, 0.15);
    vec3 paper = vec3(0.92, 0.90, 0.84);
    vec3 muted = vec3(0.43, 0.45, 0.43);
    vec3 signal = vec3(1.0, 0.353, 0.212);

    vec3 inputColor = mix(ink, mix(muted, paper, inputField), 0.72);
    vec3 featureColor = mix(ink, paper, clamp(contour + fineContour, 0.0, 1.0));
    featureColor = mix(featureColor, graphite, clamp(ruledGrid * 0.28, 0.0, 1.0));
    vec3 signalColor = mix(ink, graphite, region * 0.86);
    signalColor = mix(signalColor, signal, clamp(boundary + pointerSignal * 0.45, 0.0, 1.0));

    vec3 color = inputColor * inputWeight;
    color += featureColor * featureWeight;
    color += signalColor * signalWeight;
    color = mix(color, signal, clamp(crosshair * (0.16 + signalWeight * 0.28), 0.0, 0.5));

    float vignette = 1.0 - smoothstep(0.55, 1.05, length(centered));
    color *= 0.72 + vignette * 0.28;
    color += ruledGrid * 0.035 * paper;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface LabProgressDetail {
  progress: number;
}

interface InteractiveLabCanvasProps {
  active: boolean;
  dprMax: number;
  onReady: () => void;
}

interface SignalSurfaceProps {
  active: boolean;
  pointerTarget: React.MutableRefObject<Vector2>;
  progressTarget: React.MutableRefObject<number>;
}

function SignalSurface({ active, pointerTarget, progressTarget }: SignalSurfaceProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const elapsed = useRef(0);
  const pointer = useRef(new Vector2());
  const progress = useRef(0.5);
  const { invalidate, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0.5 },
      uAspect: { value: 1 },
      uMotion: { value: 1 },
      uPointer: { value: new Vector2() },
    }),
    [],
  );

  useEffect(() => {
    const material = materialRef.current;
    if (material) {
      material.uniforms.uAspect.value = size.width / Math.max(size.height, 1);
    }
    invalidate();
  }, [invalidate, size.height, size.width]);

  useEffect(() => {
    const material = materialRef.current;
    if (material) {
      material.uniforms.uMotion.value = active ? 1 : 0;
    }
    invalidate();
  }, [active, invalidate]);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const safeDelta = Math.min(delta, 0.05);
    if (active) elapsed.current += safeDelta;

    pointer.current.x = MathUtils.damp(
      pointer.current.x,
      pointerTarget.current.x,
      5.5,
      safeDelta,
    );
    pointer.current.y = MathUtils.damp(
      pointer.current.y,
      pointerTarget.current.y,
      5.5,
      safeDelta,
    );
    progress.current = MathUtils.damp(
      progress.current,
      progressTarget.current,
      5,
      safeDelta,
    );

    material.uniforms.uTime.value = elapsed.current;
    material.uniforms.uProgress.value = progress.current;
    material.uniforms.uPointer.value.copy(pointer.current);

    if (active) state.invalidate();
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2, 64, 40]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export function InteractiveLabCanvas({
  active,
  dprMax,
  onReady,
}: InteractiveLabCanvasProps) {
  const pointerTarget = useRef(new Vector2());
  const progressTarget = useRef(0.5);
  const invalidateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    function handleProgress(event: Event) {
      const customEvent = event as CustomEvent<LabProgressDetail>;
      progressTarget.current = MathUtils.clamp(customEvent.detail.progress, 0, 1);
      invalidateRef.current?.();
    }

    window.addEventListener("lab:progress", handleProgress);
    return () => window.removeEventListener("lab:progress", handleProgress);
  }, []);

  useEffect(() => {
    invalidateRef.current?.();
  }, [active]);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!active) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerTarget.current.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
    );
    invalidateRef.current?.();
  }

  function handlePointerLeave() {
    pointerTarget.current.set(0, 0);
    invalidateRef.current?.();
  }

  return (
    <div
      className={styles.canvasFrame}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        dpr={[1, dprMax]}
        frameloop="demand"
        gl={{
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
        }}
        onCreated={(state) => {
          invalidateRef.current = state.invalidate;
          onReady();
          state.invalidate();
        }}
      >
        <SignalSurface
          active={active}
          pointerTarget={pointerTarget}
          progressTarget={progressTarget}
        />
      </Canvas>
    </div>
  );
}
