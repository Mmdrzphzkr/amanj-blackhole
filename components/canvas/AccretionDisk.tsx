"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 8000;

const diskVertexShader = `
  attribute float aSize;
  attribute float aBrightness;
  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    vBrightness = aBrightness;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 12.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const diskFragmentShader = `
  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, d);
    alpha *= vBrightness;

    vec3 col = vColor * (1.0 + vBrightness * 0.5);

    gl_FragColor = vec4(col, alpha);
  }
`;

export default function AccretionDisk() {
  const diskRef = useRef<THREE.Points>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  const { positions, colors, sizes, brightnesses } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const brightnesses = new Float32Array(COUNT);

    const minR = 2.3;
    const maxR = 9;

    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const t = Math.random();
      const radius = minR + (maxR - minR) * Math.pow(t, 0.6);

      const thickness = (1 - (radius - minR) / (maxR - minR)) * 0.18;
      const warp = Math.sin(angle * 3 + radius) * 0.04 * (radius / maxR);
      const y = (Math.random() - 0.5) * thickness + warp;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const distFactor = (radius - minR) / (maxR - minR);

      if (distFactor < 0.15) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.98;
        colors[i * 3 + 2] = 0.95;
      } else if (distFactor < 0.4) {
        const blend = (distFactor - 0.15) / 0.25;
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.9 - blend * 0.3;
        colors[i * 3 + 2] = 0.5 - blend * 0.3;
      } else if (distFactor < 0.7) {
        const blend = (distFactor - 0.4) / 0.3;
        colors[i * 3] = 0.95 - blend * 0.15;
        colors[i * 3 + 1] = 0.4 - blend * 0.2;
        colors[i * 3 + 2] = 0.1 + blend * 0.15;
      } else {
        const blend = (distFactor - 0.7) / 0.3;
        colors[i * 3] = 0.6 - blend * 0.2;
        colors[i * 3 + 1] = 0.1;
        colors[i * 3 + 2] = 0.3 + blend * 0.3;
      }

      const baseBrightness = 1.0 - distFactor * 0.5;
      brightnesses[i] = baseBrightness * (0.6 + Math.random() * 0.4);
      sizes[i] = (1.2 - distFactor * 0.5) * (0.3 + Math.random() * 0.5);
    }

    return { positions, colors, sizes, brightnesses };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: diskVertexShader,
        fragmentShader: diskFragmentShader,
        uniforms: {},
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    if (diskRef.current) {
      const posArr = diskRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const x = posArr[ix];
        const z = posArr[ix + 2];
        const radius = Math.sqrt(x * x + z * z);
        if (radius < 0.1) continue;
        const angularVel = 0.004 / (radius * 0.15);
        const angle = Math.atan2(z, x) + angularVel;
        posArr[ix] = Math.cos(angle) * radius;
        posArr[ix + 2] = Math.sin(angle) * radius;
      }
      diskRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[Math.PI * 0.45, 0, 0]}>
      <points ref={diskRef} material={material} renderOrder={10}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
          <bufferAttribute
            attach="attributes-aBrightness"
            args={[brightnesses, 1]}
          />
        </bufferGeometry>
      </points>

      {/* Bright inner ring glow */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]} renderOrder={9}>
        <ringGeometry args={[2.0, 2.6, 128]} />
        <meshBasicMaterial
          color="#ffcc66"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Hot inner core ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} renderOrder={8}>
        <ringGeometry args={[2.1, 2.3, 128]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
