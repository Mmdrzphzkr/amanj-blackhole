"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useMousePosition } from "@/hooks/useMousePosition";
import * as THREE from "three";

const particleVertexShader = `
  attribute float aSize;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = -mvPosition.z;
    gl_PointSize = aSize * (200.0 / max(dist, 1.0));
    gl_PointSize = clamp(gl_PointSize, 0.5, 5.0);
    vAlpha = smoothstep(80.0, 10.0, dist);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, d);
    vec3 col = vec3(0.66, 0.33, 0.97);

    gl_FragColor = vec4(col, alpha * 0.5 * vAlpha);
  }
`;

export default function ParticleField({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { normalized } = useMousePosition();

  const { positions, velocities, originalPositions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = 12 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.001;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;

      sizes[i] = Math.random() * 0.8 + 0.3;
    }

    return { positions, velocities, originalPositions, sizes };
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        uniforms: {},
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x = pos[ix];
      const y = pos[ix + 1];
      const z = pos[ix + 2];

      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist < 0.01) continue;

      const gravStrength = 0.0002 / Math.max(dist * 0.08, 0.5);

      pos[ix] +=
        -x * gravStrength +
        velocities[ix] +
        Math.sin(t * 0.2 + i * 0.1) * 0.0005;
      pos[ix + 1] +=
        -y * gravStrength +
        velocities[ix + 1] +
        Math.cos(t * 0.15 + i * 0.1) * 0.0005;
      pos[ix + 2] += -z * gravStrength + velocities[ix + 2];

      const mouseInfluence = 8;
      const mx = normalized.x * mouseInfluence;
      const my = normalized.y * mouseInfluence;
      const dxm = x - mx;
      const dym = y - my;
      const distMouse = Math.sqrt(dxm * dxm + dym * dym);

      if (distMouse > 0.1 && distMouse < 3) {
        const repel = (3 - distMouse) * 0.005;
        pos[ix] += (dxm / distMouse) * repel;
        pos[ix + 1] += (dym / distMouse) * repel;
      }

      if (dist < 2.5) {
        pos[ix] = originalPositions[ix];
        pos[ix + 1] = originalPositions[ix + 1];
        pos[ix + 2] = originalPositions[ix + 2];
      }

      if (dist > 55) {
        pos[ix] *= 0.5;
        pos[ix + 1] *= 0.5;
        pos[ix + 2] *= 0.5;
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} material={material} renderOrder={12}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
}
