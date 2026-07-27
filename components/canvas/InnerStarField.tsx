"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useMousePosition } from "@/hooks/useMousePosition";
import * as THREE from "three";

const vertexShader = `
  attribute float aSize;
  attribute float aBrightness;
  varying float vAlpha;
  varying float vBrightness;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = -mvPosition.z;
    gl_PointSize = aSize * (300.0 / max(dist, 0.5));
    gl_PointSize = clamp(gl_PointSize, 0.3, 4.0);
    vAlpha = smoothstep(70.0, 5.0, dist);
    vBrightness = aBrightness;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uOpacity;
  varying float vAlpha;
  varying float vBrightness;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.12, 0.0, d);

    vec3 col = mix(vec3(0.65, 0.75, 1.0), vec3(1.0, 0.93, 0.82), vBrightness);
    float glow = alpha * 0.25 + core * 0.75;

    gl_FragColor = vec4(col * glow, alpha * vAlpha * 0.55 * uOpacity);
  }
`;

export default function InnerStarField({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null);
  const { normalized } = useMousePosition();

  const { positions, sizes, brightness } = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const brightness = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 47;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = Math.random() * 0.6 + 0.2;
      brightness[i] = Math.random();
    }

    return { positions, sizes, brightness };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uOpacity: { value: 0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame(() => {
    if (!ref.current) return;

    // Fade in: scrollProgress 0.85 → 1.0
    const targetOpacity = THREE.MathUtils.smoothstep(scrollProgress, 0.85, 1.0);
    material.uniforms.uOpacity.value +=
      (targetOpacity - material.uniforms.uOpacity.value) * 0.05;

    // Subtle mouse parallax
    const mx = normalized.x * 0.4;
    const my = normalized.y * 0.25;
    ref.current.position.x += (mx - ref.current.position.x) * 0.015;
    ref.current.position.y += (my - ref.current.position.y) * 0.015;
  });

  if (scrollProgress < 0.7) return null;

  return (
    <points ref={ref} material={material} renderOrder={10}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[brightness, 1]} />
      </bufferGeometry>
    </points>
  );
}
