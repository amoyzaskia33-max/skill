"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function HeroCrystal() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x = state.clock.elapsedTime * (0.2 + i * 0.05);
        mesh.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.03);
      }
    });
  });

  return (
    <>
      {/* Left top corner - Icosahedron */}
      <Float floatIntensity={2} rotationIntensity={0.8} speed={1.5}>
        <mesh
          ref={(el) => (meshRefs.current[0] = el)}
          position={[-4, 2.5, -2]}
          scale={0.4}
        >
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#4f46e5"
            emissive="#4f46e5"
            emissiveIntensity={2}
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Right top - Octahedron */}
      <Float floatIntensity={1.5} rotationIntensity={0.6} speed={1.8}>
        <mesh
          ref={(el) => (meshRefs.current[1] = el)}
          position={[4.5, 2, -1]}
          scale={0.35}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0ea5e9"
            emissiveIntensity={2.5}
            transparent
            opacity={0.8}
            wireframe
          />
        </mesh>
      </Float>

      {/* Right middle - Torus */}
      <Float floatIntensity={1.8} rotationIntensity={0.5} speed={2}>
        <mesh
          ref={(el) => (meshRefs.current[2] = el)}
          position={[5, -0.5, -1.5]}
          scale={0.3}
        >
          <torusGeometry args={[1, 0.4, 16, 32]} />
          <MeshDistortMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={2}
            distort={0.4}
            speed={3}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* Left bottom - Dodecahedron */}
      <Float floatIntensity={1.2} rotationIntensity={0.7} speed={1.3}>
        <mesh
          ref={(el) => (meshRefs.current[3] = el)}
          position={[-4.5, -2, -1]}
          scale={0.3}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={2}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
      </Float>

      {/* Right bottom - Tetrahedron */}
      <Float floatIntensity={2.2} rotationIntensity={0.9} speed={1.6}>
        <mesh
          ref={(el) => (meshRefs.current[4] = el)}
          position={[3.5, -2.5, -2]}
          scale={0.25}
        >
          <tetrahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={2.5}
            distort={0.2}
            speed={2.5}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </Float>

      {/* Center back - Large subtle sphere */}
      <Float floatIntensity={0.8} rotationIntensity={0.3} speed={1}>
        <mesh
          ref={(el) => (meshRefs.current[5] = el)}
          position={[0, 0, -3]}
          scale={1.2}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#4f46e5"
            emissive="#4f46e5"
            emissiveIntensity={0.5}
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
      </Float>

      {/* Small accent particles */}
      {[...Array(5)].map((_, i) => (
        <Float key={i} floatIntensity={3} speed={2 + i * 0.3}>
          <mesh
            position={[
              Math.sin(i * 1.5) * 3,
              Math.cos(i * 2) * 2,
              -2 - i * 0.2,
            ]}
            scale={0.08}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}
