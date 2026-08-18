"use client";

import { View } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { MathUtils, type Group } from "three";

import styles from "../sections/capability-gallery.module.css";

interface CapabilityPointerDetail {
  index: number;
  x: number;
  y: number;
}

interface CapabilityCanvasProps {
  active: boolean;
  dprMax: number;
  onReady: () => void;
}

interface SymbolProps {
  index: number;
  pointer: MutableRefObject<CapabilityPointerDetail>;
  children: ReactNode;
  scale?: number;
}

interface SceneProps {
  index: number;
  pointer: MutableRefObject<CapabilityPointerDetail>;
  children: ReactNode;
  scale?: number;
}

function AnimatedSymbol({ index, pointer, children, scale = 1 }: SymbolProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    const isFocused = pointer.current.index === index;
    const targetX = isFocused ? pointer.current.y * 0.12 : 0;
    const targetY = isFocused ? pointer.current.x * 0.16 : 0;
    const targetPositionX = isFocused ? pointer.current.x * 0.08 : 0;
    const targetPositionY = isFocused ? pointer.current.y * 0.055 : 0;

    group.rotation.x = MathUtils.damp(group.rotation.x, targetX, 7, delta);
    group.rotation.y = MathUtils.damp(group.rotation.y, targetY, 7, delta);
    group.position.x = MathUtils.damp(group.position.x, targetPositionX, 7, delta);
    group.position.y = MathUtils.damp(group.position.y, targetPositionY, 7, delta);

    const unsettled =
      Math.abs(group.rotation.x - targetX) > 0.001 ||
      Math.abs(group.rotation.y - targetY) > 0.001 ||
      Math.abs(group.position.x - targetPositionX) > 0.001 ||
      Math.abs(group.position.y - targetPositionY) > 0.001;

    if (unsettled) {
      state.invalidate();
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {children}
    </group>
  );
}

function Scene({ index, pointer, children, scale }: SceneProps) {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 5, 5]} intensity={2.3} color="#fff5df" />
      <directionalLight position={[-4, -2, 3]} intensity={1.2} color="#ff5a36" />
      <AnimatedSymbol index={index} pointer={pointer} scale={scale}>
        {children}
      </AnimatedSymbol>
    </>
  );
}

function SystemsSymbol() {
  const slabs = [
    { position: [0, 0.82, 0] as const, scale: [2.15, 0.16, 1.2] as const },
    { position: [0.2, 0.2, 0.08] as const, scale: [1.9, 0.16, 1.05] as const },
    { position: [-0.16, -0.42, 0.16] as const, scale: [1.68, 0.16, 0.9] as const },
  ];

  return (
    <group rotation={[-0.32, 0.54, -0.08]} position={[1.05, 0.45, 0]}>
      {slabs.map((slab, index) => (
        <mesh key={index} position={slab.position} scale={slab.scale}>
          <boxGeometry />
          <meshStandardMaterial
            color={index === 1 ? "#ff5a36" : "#d7d2c7"}
            metalness={0.12}
            roughness={0.58}
          />
        </mesh>
      ))}
      {[-0.68, 0, 0.68].map((x) => (
        <mesh key={x} position={[x, 0.18, 0.15]}>
          <cylinderGeometry args={[0.035, 0.035, 1.45, 12]} />
          <meshStandardMaterial color="#3a3d42" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function InterfaceSymbol() {
  return (
    <group rotation={[-0.2, -0.45, 0.08]} position={[0.78, 0.3, 0]}>
      <mesh position={[-0.28, 0.25, 0]}>
        <boxGeometry args={[1.65, 2.15, 0.12]} />
        <meshStandardMaterial color="#202731" metalness={0.2} roughness={0.42} />
      </mesh>
      <mesh position={[0.62, -0.15, 0.25]}>
        <boxGeometry args={[1.5, 1.7, 0.12]} />
        <meshStandardMaterial color="#ece7dc" metalness={0.08} roughness={0.52} />
      </mesh>
      <mesh position={[0.63, 0.25, 0.34]}>
        <boxGeometry args={[0.94, 0.16, 0.06]} />
        <meshStandardMaterial color="#ff5a36" roughness={0.45} />
      </mesh>
      {[0.02, -0.26, -0.54].map((y, index) => (
        <mesh key={y} position={[0.63, y, 0.34]}>
          <boxGeometry args={[index === 2 ? 0.48 : 0.8, 0.065, 0.04]} />
          <meshStandardMaterial color="#5e6269" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function ResearchSymbol() {
  const cells = [
    { position: [-0.43, 0.34, 0.08] as const, color: "#ff5a36" },
    { position: [0.43, 0.34, 0.08] as const, color: "#565a60" },
    { position: [-0.43, -0.34, 0.08] as const, color: "#767970" },
    { position: [0.43, -0.34, 0.08] as const, color: "#30343a" },
  ];

  return (
    <group rotation={[-0.3, 0.48, -0.04]} position={[2, 2.6, 0]}>
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[2.05, 1.72, 0.09]} />
        <meshStandardMaterial color="#d7d2c7" roughness={0.68} metalness={0.06} />
      </mesh>
      {cells.map((cell, index) => (
        <mesh key={index} position={cell.position}>
          <boxGeometry args={[0.72, 0.52, 0.12]} />
          <meshStandardMaterial color={cell.color} metalness={0.08} roughness={0.55} />
        </mesh>
      ))}
      <mesh position={[0, -1.02, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 2.1, 8]} />
        <meshStandardMaterial color="#30343a" roughness={0.72} />
      </mesh>
    </group>
  );
}

function DataSymbol() {
  const dimensions = [
    [-0.92, 0.62, -0.18],
    [0.92, 0.62, -0.18],
    [-0.92, -0.62, -0.18],
    [0.92, -0.62, -0.18],
  ] as const;
  const connectors = [
    { position: [-0.55, 0.37, 0] as const, rotation: [0, 0, -0.6] as const },
    { position: [0.55, 0.37, 0] as const, rotation: [0, 0, -0.6] as const },
    { position: [-0.55, -0.37, 0] as const, rotation: [0, 0, 0.6] as const },
    { position: [0.55, -0.37, 0] as const, rotation: [0, 0, 0.6] as const },
  ];

  return (
    <group rotation={[-0.34, -0.54, 0.08]} position={[2, 2.6, 0]}>
      <mesh>
        <boxGeometry args={[0.72, 0.72, 0.72]} />
        <meshStandardMaterial color="#ff5a36" roughness={0.43} metalness={0.08} />
      </mesh>
      {dimensions.map((position, index) => (
        <mesh key={index} position={position}>
          <boxGeometry args={[0.48, 0.48, 0.48]} />
          <meshStandardMaterial color="#30343a" roughness={0.58} metalness={0.12} />
        </mesh>
      ))}
      {connectors.map((connector, index) => (
        <mesh key={index} position={connector.position} rotation={connector.rotation}>
          <cylinderGeometry args={[0.018, 0.018, 0.82, 8]} />
          <meshStandardMaterial color="#767870" roughness={0.75} />
        </mesh>
      ))}
    </group>
  );
}

export function CapabilityCanvas({ active, dprMax, onReady }: CapabilityCanvasProps) {
  const pointer = useRef<CapabilityPointerDetail>({ index: -1, x: 0, y: 0 });
  const invalidate = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function handlePointer(event: Event) {
      const customEvent = event as CustomEvent<CapabilityPointerDetail>;
      pointer.current = customEvent.detail;
      invalidate.current?.();
    }

    window.addEventListener("capability:pointer", handlePointer);
    return () => window.removeEventListener("capability:pointer", handlePointer);
  }, []);

  useEffect(() => {
    invalidate.current?.();
  }, [active]);

  return (
    <div className={styles.canvasFrame} data-ready={ready && active}>
      <div className={styles.viewGrid}>
        <View className={`${styles.view} ${styles.viewSystems}`} visible={active} index={1}>
          <Scene index={0} pointer={pointer} scale={0.92}>
            <SystemsSymbol />
          </Scene>
        </View>
        <View className={`${styles.view} ${styles.viewInterface}`} visible={active} index={2}>
          <Scene index={1} pointer={pointer} scale={0.9}>
            <InterfaceSymbol />
          </Scene>
        </View>
        <View className={`${styles.view} ${styles.viewResearch}`} visible={active} index={3}>
          <Scene index={2} pointer={pointer} scale={0.44}>
            <ResearchSymbol />
          </Scene>
        </View>
        <View className={`${styles.view} ${styles.viewData}`} visible={active} index={4}>
          <Scene index={3} pointer={pointer} scale={0.46}>
            <DataSymbol />
          </Scene>
        </View>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 38 }}
        dpr={[1, dprMax]}
        frameloop="demand"
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={(state) => {
          invalidate.current = state.invalidate;
          setReady(true);
          onReady();
          state.invalidate();
        }}
      >
        <View.Port />
      </Canvas>
    </div>
  );
}
