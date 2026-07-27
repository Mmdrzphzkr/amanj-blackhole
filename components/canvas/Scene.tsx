"use client";
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import BlackHoleBackground from "./BlackHoleBackground";
import ParticleField from "./ParticleField";
import InnerStarField from "./InnerStarField";

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 4, 20));

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    const swayX = Math.sin(t * 0.15) * 0.3;
    const swayY = Math.cos(t * 0.1) * 0.2;

    // z: 20 → 0.5  (far away → inside the event horizon)
    // y: 4  → 0     (elevated → at center)
    const targetZ = 20 - scrollProgress * 19.5;
    const targetY = 4 + swayY - scrollProgress * 4;
    const targetX = swayX + scrollProgress * 1.2;

    target.current.set(targetX, targetY, targetZ);

    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function PostFX({ scrollProgress }: { scrollProgress: number }) {
  // Reduce bloom when inside the black hole (no bright sources)
  const insideFade = THREE.MathUtils.smoothstep(scrollProgress, 0.6, 0.85);

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={(0.8 + scrollProgress * 0.3) * (1.0 - insideFade)}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
      />
      <Vignette
        offset={0.3}
        darkness={0.5 + scrollProgress * 0.15}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

function SceneContents({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <CameraRig scrollProgress={scrollProgress} />
      <Suspense fallback={null}>
        <BlackHoleBackground scrollProgress={scrollProgress} />
        <ParticleField count={600} />
        <InnerStarField scrollProgress={scrollProgress} />
      </Suspense>
      <PostFX scrollProgress={scrollProgress} />
    </>
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
        camera={{ position: [0, 4, 20], fov: 60, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        style={{ background: "#000005" }}
      >
        <color attach="background" args={["#000005"]} />

        <SceneContents scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
