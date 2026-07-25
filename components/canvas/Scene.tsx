"use client";
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import BlackHoleBackground from "./BlackHoleBackground";
import ParticleField from "./ParticleField";

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 10));

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    const swayX = Math.sin(t * 0.15) * 0.3;
    const swayY = Math.cos(t * 0.1) * 0.2;

    const targetZ = 10 - scrollProgress * 6;
    const targetX = swayX + scrollProgress * 1.2;
    const targetY = swayY + scrollProgress * -0.3;

    target.current.set(targetX, targetY, targetZ);

    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function PostFX({ scrollProgress }: { scrollProgress: number }) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.4 + scrollProgress * 0.4}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.ADD}
      />
      <Vignette
        offset={0.3}
        darkness={0.5 + scrollProgress * 0.15}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

export default function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
        style={{ background: "#000005" }}
      >
        <color attach="background" args={["#000005"]} />

        <CameraRig scrollProgress={scrollProgress} />

        <Suspense fallback={null}>
          <BlackHoleBackground />
          <ParticleField count={600} />
        </Suspense>

        <PostFX scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
