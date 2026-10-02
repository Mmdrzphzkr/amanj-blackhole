"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const photonRingVertex = `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const photonRingFragment = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.5);

    float pulse = sin(uTime * 1.5) * 0.1 + 0.9;
    float shimmer = sin(uTime * 4.0 + vNormal.x * 10.0) * 0.15 + 0.85;

    vec3 innerColor = vec3(0.62, 0.55, 1.0);
    vec3 outerColor = vec3(0.45, 0.35, 0.95);
    vec3 color = mix(innerColor, outerColor, fresnel) * pulse * shimmer * 0.8;

    float alpha = fresnel * 0.28;

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function BlackHole({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const photonRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  const photonMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: photonRingVertex,
        fragmentShader: photonRingFragment,
        uniforms: { uTime: { value: 0 } },
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    photonMaterial.uniforms.uTime.value = t;

    if (photonRef.current) {
      photonRef.current.rotation.y = t * 0.08;
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = -t * 0.015;
      const pulse = 1 + Math.sin(t * 0.3) * 0.02;
      haloRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Distant outer halo — very faint purple haze */}
      <mesh ref={haloRef} renderOrder={1}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial
          color="#2e1065"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Mid halo */}
      <mesh renderOrder={2}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial
          color="#4c1d95"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Photon ring — the bright thin ring at the event horizon edge */}
      <mesh ref={photonRef} material={photonMaterial} renderOrder={3}>
        <sphereGeometry args={[2.15, 64, 64]} />
      </mesh>

      {/* Event horizon — pure black void, the actual black hole */}
      <mesh renderOrder={5}>
        <sphereGeometry args={[2.0, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
