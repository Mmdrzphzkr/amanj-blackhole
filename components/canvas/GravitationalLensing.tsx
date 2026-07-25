"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const lensingVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const lensingFragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;

  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.0);

    float t = uTime;

    float ring1 = abs(fresnel - 0.3) - 0.02;
    float ring2 = abs(fresnel - 0.5) - 0.015;
    float ring3 = abs(fresnel - 0.7) - 0.01;

    float rings = min(ring1, min(ring2, ring3));
    float ringAlpha = (1.0 - smoothstep(0.0, 0.03, rings)) * 0.25;

    float shimmer1 = sin(fresnel * 30.0 - t * 2.0) * 0.5 + 0.5;
    float shimmer2 = cos(fresnel * 20.0 + t * 1.5) * 0.5 + 0.5;

    vec3 goldColor = vec3(1.0, 0.75, 0.2);
    vec3 purpleColor = vec3(0.7, 0.3, 1.0);
    vec3 cyanColor = vec3(0.2, 0.8, 1.0);

    vec3 ringColor = mix(goldColor, purpleColor, shimmer1);
    ringColor = mix(ringColor, cyanColor, shimmer2 * 0.3);

    float haze = fresnel * 0.06;
    vec3 hazeColor = mix(vec3(0.3, 0.1, 0.5), goldColor, shimmer1 * 0.3);

    float alpha = ringAlpha + haze;
    vec3 finalColor = ringColor * ringAlpha + hazeColor * haze;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function GravitationalLensing() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: lensingVertexShader,
        fragmentShader: lensingFragmentShader,
        uniforms: {
          uTime: { value: 0 },
        },
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      {/* Main lensing sphere - renders from the back face so we see the inside */}
      <mesh material={material} renderOrder={7}>
        <sphereGeometry args={[3.0, 64, 64]} />
      </mesh>

      {/* Secondary outer haze sphere */}
      <mesh renderOrder={6}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#4c1d95"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
