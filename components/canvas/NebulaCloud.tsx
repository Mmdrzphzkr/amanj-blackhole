"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const nebulaVertexShader = `
  attribute float aSize;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = -mvPosition.z;
    gl_PointSize = aSize * (400.0 / max(dist, 1.0));
    gl_PointSize = clamp(gl_PointSize, 2.0, 30.0);
    vAlpha = smoothstep(200.0, 20.0, dist);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const nebulaFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, d);
    alpha *= alpha * vAlpha;

    gl_FragColor = vec4(vColor, alpha * 0.25);
  }
`;

export default function NebulaCloud() {
  const ref = useRef<THREE.Points>(null);
  const count = 1200;

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const nebulaColors = [
      new THREE.Color("#7c3aed"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#06b6d4"),
      new THREE.Color("#1e0050"),
      new THREE.Color("#3b0764"),
      new THREE.Color("#6d28d9"),
      new THREE.Color("#22d3ee"),
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 12 + Math.random() * 35;
      const heightSpread = (Math.random() - 0.5) * 25;

      positions[i * 3] =
        Math.cos(angle) * radius + (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = heightSpread;
      positions[i * 3 + 2] =
        Math.sin(angle) * radius + (Math.random() - 0.5) * 15;

      const c = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 4 + 2;
    }

    return { positions, colors, sizes };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: nebulaVertexShader,
        fragmentShader: nebulaFragmentShader,
        uniforms: {},
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.005;
      ref.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.003) * 0.02;
    }
  });

  return (
    <points ref={ref} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
}
