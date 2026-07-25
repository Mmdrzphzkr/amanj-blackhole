"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const starVertexShader = `
  attribute float aSize;
  attribute float aTwinkleSpeed;
  attribute float aTwinkleOffset;
  varying vec3 vColor;
  varying float vTwinkle;

  uniform float uTime;

  void main() {
    vColor = color;
    vTwinkle = sin(uTime * aTwinkleSpeed + aTwinkleOffset) * 0.3 + 0.7;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * vTwinkle * (300.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 6.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, d);
    alpha *= vTwinkle;

    vec3 col = vColor * (0.8 + vTwinkle * 0.4);

    gl_FragColor = vec4(col, alpha * 0.9);
  }
`;

export default function StarField({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, sizes, twinkleSpeeds, twinkleOffsets } =
    useMemo(() => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const twinkleSpeeds = new Float32Array(count);
      const twinkleOffsets = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const r = 40 + Math.random() * 160;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        sizes[i] = Math.random() * 2.5 + 0.5;
        twinkleSpeeds[i] = Math.random() * 2 + 0.5;
        twinkleOffsets[i] = Math.random() * Math.PI * 2;

        const starType = Math.random();
        if (starType > 0.95) {
          colors[i * 3] = 0.6;
          colors[i * 3 + 1] = 0.75;
          colors[i * 3 + 2] = 1.0;
        } else if (starType > 0.9) {
          colors[i * 3] = 0.85;
          colors[i * 3 + 1] = 0.65;
          colors[i * 3 + 2] = 1.0;
        } else if (starType > 0.85) {
          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 0.85;
          colors[i * 3 + 2] = 0.6;
        } else {
          colors[i * 3] = 0.95;
          colors[i * 3 + 1] = 0.95;
          colors[i * 3 + 2] = 1.0;
        }
      }

      return { positions, colors, sizes, twinkleSpeeds, twinkleOffsets };
    }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
        uniforms: {
          uTime: { value: 0 },
        },
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.003;
      ref.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.001) * 0.01;
    }
  });

  return (
    <points ref={ref} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute
          attach="attributes-aTwinkleSpeed"
          args={[twinkleSpeeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aTwinkleOffset"
          args={[twinkleOffsets, 1]}
        />
      </bufferGeometry>
    </points>
  );
}
