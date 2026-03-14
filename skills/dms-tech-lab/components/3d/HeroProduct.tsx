"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function HeroProduct() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <group position={[0, 0, 0]}>
        
        {/* Main "Product" Shape - Distorted Glass/Metal Alloy */}
        <Icosahedron args={[1.5, 0]} ref={meshRef}>
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.4} // Strength of distortion
            speed={2} // Speed of distortion
            roughness={0.2}
            metalness={0.9}
            bumpScale={0.005}
            clearcoat={1}
            clearcoatRoughness={0.1}
            radius={1}
          />
        </Icosahedron>

        {/* Inner Glowing Core */}
        <Sphere args={[0.8, 32, 32]}>
          <meshBasicMaterial color="#0ea5e9" wireframe={true} transparent opacity={0.3} />
        </Sphere>

        {/* Orbiting Elements to make it look constructed */}
        <OrbitingParticles radius={2.5} count={8} color="#a855f7" />
        <OrbitingParticles radius={3.5} count={4} color="#0ea5e9" />
      </group>
    </Float>
  );
}

function OrbitingParticles({ radius, count, color }: { radius: number; count: number; color: string }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005 * (radius % 2 === 0 ? 1 : -1);
            groupRef.current.rotation.z += 0.002;
        }
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * Math.PI * 2;
                return (
                    <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={2}
                            toneMapped={false}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
