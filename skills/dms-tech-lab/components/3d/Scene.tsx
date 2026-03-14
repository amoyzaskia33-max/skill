"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import HeroProduct from "./HeroProduct";

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none grayscale-0">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.8} color="#4f46e5" />

        {/* Main key light */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color="#0ea5e9"
          castShadow
        />

        {/* Rim light for depth */}
        <spotLight
          position={[-10, -10, -5]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          color="#a855f7"
        />

        {/* Fill light */}
        <pointLight
          position={[0, 5, 2]}
          intensity={1}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <group position={[2, 0, 0]}>
             <HeroProduct />
          </group>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
