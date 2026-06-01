"use client";

/**
 * CARIA-GAP — Enterprise AI Data Nexus
 * A sharp geodesic plexus globe. Vertices are triangulated from an icosphere
 * (clean, uniform mesh — not a fuzzy random ball). Colour flows from SUT Orange
 * on the left to Nexus Blue on the right via per-vertex colours. The back
 * hemisphere is masked by a depth-only occluder so the front reads crisp.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

const RADIUS = 2.5;
// Dark theme: bright colours that glow additively on a deep background.
const COLOR_ORANGE = new THREE.Color("#F39200"); // SUT Orange — left
const COLOR_BLUE = new THREE.Color("#2D9CFF"); //   Nexus Blue — right
// Light theme: deeper, saturated colours that read on a near-white background.
const COLOR_ORANGE_LIGHT = new THREE.Color("#E0700A");
const COLOR_BLUE_LIGHT = new THREE.Color("#2563EB");

// Career nodes anchored to whichever mesh vertex sits nearest each direction.
// Directions favour the front hemisphere (z > 0) so labels read on load.
const LABEL_TARGETS: { label: string; dir: [number, number, number] }[] = [
  { label: "Data Science", dir: [0.55, 0.62, 0.55] },
  { label: "Cloud Arch.", dir: [0.92, 0.08, 0.4] },
  { label: "AI / ML", dir: [-0.1, 0.18, 0.98] },
  { label: "Cybersecurity", dir: [-0.85, -0.05, 0.5] },
  { label: "Software Eng.", dir: [0.18, -0.82, 0.5] },
];

function Nexus({ light }: { light: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const occluderRef = useRef<THREE.Mesh>(null);

  const { pointsGeo, linesGeo, dotTexture, labeledNodes } = useMemo(() => {
    // 1. Triangulated icosphere — clean, uniform vertex distribution.
    const ico = new THREE.IcosahedronGeometry(RADIUS, 4); // 2562 unique verts
    const raw = ico.attributes.position.array as Float32Array;
    const rawCount = raw.length / 3;

    // 2. Weld duplicate vertices (PolyhedronGeometry is non-indexed).
    const keyToIndex = new Map<string, number>();
    const verts: number[] = [];
    const rawToUnique = new Int32Array(rawCount);
    const P = 1e4;
    for (let i = 0; i < rawCount; i++) {
      const x = raw[i * 3], y = raw[i * 3 + 1], z = raw[i * 3 + 2];
      const key = `${Math.round(x * P)}_${Math.round(y * P)}_${Math.round(z * P)}`;
      let idx = keyToIndex.get(key);
      if (idx === undefined) {
        idx = verts.length / 3;
        keyToIndex.set(key, idx);
        verts.push(x, y, z);
      }
      rawToUnique[i] = idx;
    }
    const uniqueCount = verts.length / 3;

    // 3. Per-vertex colour: orange (left) → blue (right) with brightness jitter.
    const cOrange = light ? COLOR_ORANGE_LIGHT : COLOR_ORANGE;
    const cBlue = light ? COLOR_BLUE_LIGHT : COLOR_BLUE;
    const colors = new Float32Array(uniqueCount * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < uniqueCount; i++) {
      const x = verts[i * 3];
      const m = THREE.MathUtils.smoothstep(x, -0.75, 0.75); // 0 left → 1 right
      tmp.copy(cOrange).lerp(cBlue, m);
      // Light mode keeps colours mostly saturated; dark mode varies brightness
      // wider so additive dots twinkle.
      const b = light ? 0.7 + Math.random() * 0.3 : 0.5 + Math.random() * 0.5;
      colors[i * 3] = tmp.r * b;
      colors[i * 3 + 1] = tmp.g * b;
      colors[i * 3 + 2] = tmp.b * b;
    }

    // 4. Unique edges → coloured line segments (the plexus web).
    const edgeSet = new Set<string>();
    const linePos: number[] = [];
    const lineCol: number[] = [];
    const pushVert = (idx: number) => {
      linePos.push(verts[idx * 3], verts[idx * 3 + 1], verts[idx * 3 + 2]);
      lineCol.push(colors[idx * 3], colors[idx * 3 + 1], colors[idx * 3 + 2]);
    };
    for (let t = 0; t < rawCount; t += 3) {
      const tri: [number, number][] = [
        [rawToUnique[t], rawToUnique[t + 1]],
        [rawToUnique[t + 1], rawToUnique[t + 2]],
        [rawToUnique[t + 2], rawToUnique[t]],
      ];
      for (const [u, v] of tri) {
        const key = u < v ? `${u}_${v}` : `${v}_${u}`;
        if (edgeSet.has(key)) continue;
        edgeSet.add(key);
        pushVert(u);
        pushVert(v);
      }
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    pGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    lGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineCol, 3));

    // 5. Soft round dot sprite (kills the default square points).
    const s = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = s;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.85)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, s, s);
    const tex = new THREE.CanvasTexture(canvas);

    // 6. Snap each label to the nearest real vertex.
    const labeled = LABEL_TARGETS.map(({ label, dir }) => {
      const target = new THREE.Vector3(...dir).normalize().multiplyScalar(RADIUS);
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i < uniqueCount; i++) {
        const dx = verts[i * 3] - target.x;
        const dy = verts[i * 3 + 1] - target.y;
        const dz = verts[i * 3 + 2] - target.z;
        const d = dx * dx + dy * dy + dz * dz;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return {
        label,
        position: [verts[best * 3], verts[best * 3 + 1], verts[best * 3 + 2]] as [number, number, number],
      };
    });

    return { pointsGeo: pGeo, linesGeo: lGeo, dotTexture: tex, labeledNodes: labeled };
  }, [light]);

  // Slow, premium rotation. Colours start orange-left / blue-right on load.
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.16, 0, 0]}>
      {/* Depth-only occluder: hides the back hemisphere for a crisp read,
          writes no colour so no flat dark disc appears over the page. */}
      <mesh ref={occluderRef}>
        <sphereGeometry args={[RADIUS * 0.93, 48, 48]} />
        <meshBasicMaterial colorWrite={false} />
      </mesh>

      {/* Plexus web — vertex coloured, faint and sharp (no bloom). */}
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={light ? 0.5 : 0.2}
          depthWrite={false}
          toneMapped={false}
          blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Vertex dots — round, vertex coloured. Glow additively in dark mode,
          solid normal-blended dots in light mode. */}
      <points geometry={pointsGeo}>
        <pointsMaterial
          map={dotTexture}
          vertexColors
          size={0.06}
          sizeAttenuation
          transparent
          opacity={light ? 0.9 : 0.95}
          alphaTest={0.01}
          depthWrite={false}
          toneMapped={false}
          blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </points>

      {/* Career nodes + glassmorphism labels (hidden when they rotate behind). */}
      {labeledNodes.map((node) => (
        <group key={node.label} position={node.position}>
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={light ? "#E0700A" : "#FFC14D"} toneMapped={false} />
          </mesh>
          <Html
            center
            distanceFactor={9}
            occlude={[occluderRef]}
            zIndexRange={[30, 0]}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/85 shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all hover:scale-105 hover:border-[#F39200]/50 dark:border-white/10 dark:bg-[#070B14]/80 dark:shadow-[0_2px_24px_rgba(0,0,0,0.55)] whitespace-nowrap cursor-pointer pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-[#F39200] shadow-[0_0_8px_#F39200]" />
              <span className="text-[11px] font-semibold tracking-wide text-slate-800 dark:text-white">{node.label}</span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function InteractiveCareerSphere() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const light = mounted && resolvedTheme === "light";

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#F39200]/30 border-t-[#F39200] animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Nexus light={light} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.4}
        />

        {/* Bloom only in dark mode — on a light background additive bloom just
            washes the scene out, so we render crisp normal-blended geometry. */}
        {!light && (
          <EffectComposer enableNormalPass={false}>
            <Bloom intensity={1.1} luminanceThreshold={0.45} luminanceSmoothing={0.6} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
