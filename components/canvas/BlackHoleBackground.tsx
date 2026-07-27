"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.999, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec3 uCamPos;
  uniform vec3 uCamTarget;
  uniform vec2 uResolution;
  uniform float uFov;
  uniform float uScrollProgress;

  varying vec2 vUv;

  // --- Hash functions ---
  float hash21(vec2 p) {
    float n = sin(dot(p, vec2(127.1, 311.7))) * 43758.5453;
    return fract(n);
  }

  float hash31(vec3 p) {
    float n = sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453;
    return fract(n);
  }

  vec2 hash22(vec2 p) {
    float px = fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    float py = fract(sin(dot(p, vec2(269.5, 183.3))) * 43758.5453);
    return vec2(px, py);
  }

  // --- 3D Value Noise ---
  float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float a = hash31(i);
    float b = hash31(i + vec3(1, 0, 0));
    float c = hash31(i + vec3(0, 1, 0));
    float d = hash31(i + vec3(1, 1, 0));
    float e = hash31(i + vec3(0, 0, 1));
    float f2 = hash31(i + vec3(1, 0, 1));
    float g = hash31(i + vec3(0, 1, 1));
    float h = hash31(i + vec3(1, 1, 1));

    return mix(
      mix(mix(a, b, u.x), mix(c, d, u.x), u.y),
      mix(mix(e, f2, u.x), mix(g, h, u.x), u.y),
      u.z
    );
  }

  // --- FBM ---
  float fbm(vec3 p, float lacunarity, float persistence) {
    float value = 0.0;
    float amplitude = 0.5;
    value += noise3D(p) * amplitude; p *= lacunarity; amplitude *= persistence;
    value += noise3D(p) * amplitude; p *= lacunarity; amplitude *= persistence;
    value += noise3D(p) * amplitude; p *= lacunarity; amplitude *= persistence;
    value += noise3D(p) * amplitude;
    return value;
  }

  // --- Blackbody color (5-stop approximation matching CIE data) ---
  vec3 blackbodyColor(float tempK) {
    float t = clamp(tempK, 1000.0, 40000.0);
    vec3 c1 = vec3(1.0, 0.03, 0.0);
    vec3 c2 = vec3(1.0, 0.38, 0.06);
    vec3 c3 = vec3(1.0, 0.85, 0.60);
    vec3 c4 = vec3(1.0, 0.94, 0.96);
    vec3 c5 = vec3(0.65, 0.72, 1.0);

    float n = (t - 1000.0) / 39000.0;

    vec3 col;
    if (n < 0.04) {
      col = mix(c1, c2, n / 0.04);
    } else if (n < 0.12) {
      col = mix(c2, c3, (n - 0.04) / 0.08);
    } else if (n < 0.15) {
      col = mix(c3, c4, (n - 0.12) / 0.03);
    } else {
      col = mix(c4, c5, clamp((n - 0.15) / 0.85, 0.0, 1.0));
    }
    return col;
  }

  // --- Procedural star field ---
  vec3 starField(vec2 rayDirSph, float starSize, float starDensity, float starBrightness) {
    float gridScale = 60.0 / starSize;
    vec2 scaledCoord = rayDirSph * gridScale;
    vec2 cell = floor(scaledCoord);
    vec2 cellUV = fract(scaledCoord);

    float cellHash = hash21(cell);
    float starProb = step(1.0 - starDensity, cellHash);

    vec2 starPos = hash22(cell + 42.0) * 0.8 + 0.1;
    float distToStar = length(cellUV - starPos);

    float baseSizeVar = hash21(cell + 100.0) * 0.03 + 0.01;
    float finalStarSize = baseSizeVar * starSize;

    float starCore = smoothstep(finalStarSize, 0.0, distToStar);
    float starGlow = smoothstep(finalStarSize * 3.0, 0.0, distToStar) * 0.3;
    float starIntensity = (starCore + starGlow) * starProb;

    float colorTemp = hash21(cell + 200.0);
    vec3 starColor = mix(vec3(0.8, 0.9, 1.0), vec3(1.0, 0.95, 0.8), colorTemp);

    return starColor * starIntensity * starBrightness;
  }

  // --- Nebula ---
  vec3 nebulaField(vec3 rayDir, float scale1, float density1, float brightness1,
                    float scale2, float density2, float brightness2) {
    vec3 n1Pos = rayDir * scale1;
    float n1 = fbm(n1Pos, 2.0, 0.5) * 2.0 - 1.0;
    float layer1 = clamp(n1 + density1, 0.0, 1.0);
    vec3 color1 = vec3(0.48, 0.14, 0.8) * layer1 * brightness1;

    vec3 n2Pos = rayDir * scale2;
    float n2 = fbm(n2Pos, 2.0, 0.5) * 2.0 - 1.0;
    float layer2 = clamp(n2 + density2, 0.0, 1.0);
    vec3 color2 = vec3(0.02, 0.5, 0.7) * layer2 * brightness2;

    return color1 + color2;
  }

  // --- Accretion disk ---
  vec4 accretionDiskColor(float hitR, float hitAngle, float time, vec3 rayDir,
                           float innerR, float outerR, float diskTemp,
                           float rotSpeed, float brightness) {
    float normR = clamp((hitR - innerR) / (outerR - innerR), 0.0, 1.0);

    float rotSign = sign(rotSpeed);
    vec3 velocityDir = vec3(-sin(hitAngle) * rotSign, 0.0, cos(hitAngle) * rotSign);
    float velocityMag = 1.0 / sqrt(hitR / innerR);
    float beta = velocityMag * 0.35;
    float cosTheta = dot(velocityDir, rayDir);
    float dopplerFactor = 1.0 / (1.0 - beta * cosTheta);
    float dopplerBoost = pow(abs(dopplerFactor), 3.0);

    float peakTempK = diskTemp * 1000.0;
    float tempK = peakTempK * pow(innerR / hitR, 0.75)
                * mix(0.6, 1.8, clamp(dopplerFactor * 0.5, 0.0, 1.0));
    vec3 diskColor = blackbodyColor(tempK);
    diskColor *= clamp(dopplerBoost, 0.12, 8.0);

    float innerFalloff = smoothstep(0.0, 0.08, normR);
    float outerFalloff = smoothstep(1.0, 0.82, normR);
    float edgeFalloff = innerFalloff * outerFalloff;

    float cycleLen = 12.0;
    float cyclicTime = mod(time, cycleLen);
    float blend = cyclicTime / cycleLen;

    float kp1 = cyclicTime * rotSpeed / pow(hitR, 1.5);
    float kp2 = (cyclicTime + cycleLen) * rotSpeed / pow(hitR, 1.5);
    float ra1 = hitAngle + kp1;
    float ra2 = hitAngle + kp2;

    float turbScale = 4.0;
    float turbStretch = 2.0;
    vec3 nc1 = vec3(hitR * turbScale, cos(ra1) / turbStretch, sin(ra1) / turbStretch);
    vec3 nc2 = vec3(hitR * turbScale, cos(ra2) / turbStretch, sin(ra2) / turbStretch);

    float t1 = fbm(nc1, 2.0, 0.5);
    float t2 = fbm(nc2, 2.0, 0.5);
    float turbulence = mix(t2, t1, blend);
    float ringOpacity = pow(clamp(turbulence, 0.0, 1.0), 1.2);

    float finalOpacity = ringOpacity * edgeFalloff;
    vec3 finalColor = diskColor * brightness;
    return vec4(finalColor, finalOpacity);
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    float aspect = uResolution.x / uResolution.y;
    vec2 screenPos = vec2(uv.x * aspect, uv.y);

    vec3 camPos = uCamPos;
    vec3 camTarget = uCamTarget;
    vec3 camForward = normalize(camTarget - camPos);
    vec3 worldUp = vec3(0.0, 1.0, 0.0);
    vec3 camRight = normalize(cross(worldUp, camForward));
    vec3 camUp = cross(camForward, camRight);

    float fov = 1.0 / tan(radians(uFov * 0.5));
    vec3 rayDir = normalize(camForward * fov + camRight * screenPos.x + camUp * screenPos.y);

    float mass = 1.0;
    float rs = mass * 2.0;
    float innerR = 3.0;
    float outerR = 12.0;

    vec3 rayPos = camPos;
    vec3 prevPos = camPos;
    vec3 color = vec3(0.0);
    float alpha = 0.0;
    float escaped = 0.0;
    float captured = 0.0;
    float minDist = 1000.0;

    for (int i = 0; i < 120; i++) {
      if (escaped > 0.5 || captured > 0.5 || alpha > 0.99) break;

      float r = length(rayPos);
      minDist = min(minDist, r);

      if (r < rs * 1.01) {
        captured = 1.0;
        break;
      }

      if (r > 120.0) {
        escaped = 1.0;
        break;
      }

      float stepSize = clamp(r * 0.04, 0.02, 0.5);

      vec3 toCenter = -rayPos / r;
      float bendStrength = rs / (r * r) * stepSize * 1.5;
      rayDir = normalize(rayDir + toCenter * bendStrength);

      prevPos = rayPos;
      rayPos += rayDir * stepSize;

      if (prevPos.y * rayPos.y < 0.0 && alpha < 0.99) {
        float t = -prevPos.y / (rayPos.y - prevPos.y);
        vec3 hitPos = mix(prevPos, rayPos, t);
        float hitR = sqrt(hitPos.x * hitPos.x + hitPos.z * hitPos.z);

        if (hitR > innerR && hitR < outerR) {
          float hitAngle = atan(hitPos.z, hitPos.x);
          vec4 diskResult = accretionDiskColor(
            hitR, hitAngle, uTime, rayDir,
            innerR, outerR, 30.0, 1.0, 3.0
          );

          float remainingAlpha = 1.0 - alpha;
          color += diskResult.rgb * diskResult.a * remainingAlpha;
          alpha += remainingAlpha * diskResult.a;
        }
      }
    }

    if (captured < 0.5) escaped = 1.0;

    if (captured < 0.5) {
      float photonSphereR = rs * 1.5;
      float distFromPhotonSphere = abs(minDist - photonSphereR);

      float ring1 = 1.0 - smoothstep(0.0, 0.15, distFromPhotonSphere);
      vec3 ringColor1 = vec3(1.0, 0.92, 0.75) * pow(ring1, 3.0) * 4.0;

      float ring2 = 1.0 - smoothstep(0.0, 0.35, distFromPhotonSphere);
      vec3 ringColor2 = vec3(0.9, 0.7, 0.4) * pow(ring2, 5.0) * 1.5;

      vec3 ringGlow = ringColor1 + ringColor2;
      color += ringGlow * (1.0 - alpha);
    }

    if (captured < 0.5) {
      float edgeProximity = 1.0 - smoothstep(rs, rs * 2.0, minDist);
      vec3 horizonGlow = vec3(0.15, 0.02, 0.35) * edgeProximity * 0.6;
      color += horizonGlow * (1.0 - alpha);
    }

    if (escaped > 0.5 && alpha < 0.99) {
      float theta = atan(rayDir.z, rayDir.x);
      float phi = asin(clamp(rayDir.y, -1.0, 1.0));
      vec2 rayDirSph = vec2(theta, phi);

      vec3 bgColor = vec3(0.001, 0.0, 0.02);
      bgColor += starField(rayDirSph, 1.0, 0.85, 1.5);
      bgColor += nebulaField(rayDir, 1.5, 0.1, 0.3, 3.0, 0.05, 0.15);

      color += bgColor * (1.0 - alpha);
    }

    if (captured > 0.5) {
      color = vec3(0.0);
    }

    // Event horizon fade: external universe disappears as camera crosses in
    // scroll 0.5 → 0.8: full fade to black
    float externalFade = smoothstep(0.5, 0.8, uScrollProgress);
    color *= (1.0 - externalFade);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function BlackHoleBackground({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, size } = useThree();

  const fov = useMemo(() => {
    const cam = camera as THREE.PerspectiveCamera;
    return cam.fov;
  }, [camera]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uCamPos: { value: new THREE.Vector3() },
          uCamTarget: { value: new THREE.Vector3() },
          uResolution: { value: new THREE.Vector2(size.width, size.height) },
          uFov: { value: fov },
          uScrollProgress: { value: 0 },
        },
        depthTest: false,
        depthWrite: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uCamPos.value.copy(camera.position);
    material.uniforms.uCamTarget.value.set(0, 0, 0);
    material.uniforms.uResolution.value.set(size.width, size.height);
    material.uniforms.uScrollProgress.value = scrollProgress;
  });

  return (
    <mesh ref={meshRef} frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
