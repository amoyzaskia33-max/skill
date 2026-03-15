# 🥽 WebXR & 3D Experiences

## Purpose

Membuat immersive 3D experiences di browser menggunakan Three.js, WebXR, dan React Three Fiber.

## Level: ⭐⭐⭐ Expert

---

## 1. **Three.js Fundamentals** 🎨

### A. Basic 3D Scene dengan React Three Fiber

```tsx
// Expert pattern: Production-ready Three.js setup
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';

// Rotating cube component
function RotatingCube(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Rotate every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? 'hotpink' : 'orange'}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
}

// Loading fallback
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
      <div className="text-white text-xl">Loading 3D...</div>
    </div>
  );
}

// Main scene
export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 60 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      
      {/* Environment */}
      <Environment preset="city" />
      
      {/* Objects */}
      <Suspense fallback={null}>
        <RotatingCube position={[-1.2, 0, 0]} />
        <RotatingCube position={[1.2, 0, 0]} />
      </Suspense>
      
      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
    </Canvas>
  );
}
```

---

### B. Loading 3D Models

```tsx
// Expert pattern: Load GLTF models with progress
import { useGLTF, useProgress } from '@react-three/drei';
import { Suspense } from 'react';

// Progress indicator
function Loader() {
  const { progress } = useProgress();
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
      <div className="text-white">
        <div className="text-2xl font-bold mb-2">{progress.toFixed(0)}%</div>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// 3D Model component
function Model({ url, ...props }: { url: string }) {
  const { scene } = useGLTF(url);
  
  return <primitive object={scene} {...props} />;
}

// Usage
export function ModelViewer({ modelUrl }: { modelUrl: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Suspense fallback={<Loader />}>
        <Model url={modelUrl} scale={2} />
      </Suspense>
      
      <OrbitControls />
    </Canvas>
  );
}

// Preload models
useGLTF.preload('/models/character.glb');
```

---

## 2. **Interactive 3D** 🎮

### A. Physics dengan React Three Rapier

```tsx
// Expert pattern: Physics-based interactions
import { Physics, RigidBody, useRapier } from '@react-three/rapier';
import { useRef, useState } from 'react';

function PhysicsBox({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <RigidBody
      position={position}
      colliders="cuboid"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'red' : 'blue'} />
      </mesh>
    </RigidBody>
  );
}

export function PhysicsScene() {
  return (
    <Canvas>
      <Physics gravity={[0, -9.81, 0]}>
        {/* Floor */}
        <RigidBody type="fixed" position={[0, -2, 0]}>
          <mesh>
            <boxGeometry args={[20, 1, 20]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </RigidBody>
        
        {/* Falling boxes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <PhysicsBox
            key={i}
            position={[
              (Math.random() - 0.5) * 10,
              5 + i * 1.2,
              (Math.random() - 0.5) * 10,
            ]}
          />
        ))}
      </Physics>
      
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
    </Canvas>
  );
}
```

---

### B. Clickable 3D Objects

```tsx
// Expert pattern: Raycasting for interactions
import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function InteractiveObject({ onClick, children, ...props }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  return (
    <mesh
      ref={meshRef}
      {...props}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      scale={hovered ? 1.2 : 1}
    >
      {children}
    </mesh>
  );
}

// Usage
export function ClickableScene() {
  const handleClick = (e: THREE.Event) => {
    console.log('Clicked:', e.object);
  };
  
  return (
    <Canvas>
      <InteractiveObject
        position={[-2, 0, 0]}
        onClick={handleClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </InteractiveObject>
      
      <InteractiveObject
        position={[2, 0, 0]}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="purple" />
      </InteractiveObject>
      
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
    </Canvas>
  );
}
```

---

## 3. **WebXR (VR/AR)** 🥽

### A. VR Experience

```tsx
// Expert pattern: VR mode dengan WebXR
import { Canvas, useXR, XR } from '@react-three/fiber';
import { XRButton, VRButton, Controllers, Hands } from '@react-three/xr';

function VRScene() {
  const { session, isPresenting } = useXR();
  
  return (
    <>
      {/* VR Button */}
      <VRButton />
      
      {/* Controllers */}
      <Controllers />
      <Hands />
      
      {/* VR Content */}
      <mesh position={[0, 1.5, -2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -3]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
    </>
  );
}

export function VRExperience() {
  return (
    <Canvas>
      <XR>
        <VRScene />
      </XR>
    </Canvas>
  );
}
```

---

### B. AR Experience

```tsx
// Expert pattern: AR mode
import { ARButton } from '@react-three/xr';

function ARScene() {
  return (
    <>
      <ARButton />
      
      {/* AR Content - appears in real world */}
      <mesh position={[0, 0, -1]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="green" transparent opacity={0.8} />
      </mesh>
      
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
    </>
  );
}

export function ARExperience() {
  return (
    <Canvas>
      <ARScene />
    </Canvas>
  );
}
```

---

## 4. **3D Product Viewer** 🛍️

### A. Configurable Product

```tsx
// Expert pattern: Product customizer
export function ProductViewer() {
  const [color, setColor] = useState('#ff0000');
  const [rotation, setRotation] = useState(0);
  
  return (
    <div>
      {/* 3D Viewer */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Environment preset="studio" />
        
        <Suspense fallback={null}>
          <ProductModel color={color} rotation={rotation} />
        </Suspense>
        
        <OrbitControls autoRotate />
      </Canvas>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
        <h3 className="font-bold mb-4">Customize</h3>
        
        {/* Color picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Color</label>
          <div className="flex space-x-2">
            {['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'].map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-8 h-8 rounded-full border-2 border-gray-300"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
        
        {/* Rotation slider */}
        <div>
          <label className="block text-sm font-medium mb-2">Rotation</label>
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function ProductModel({ color, rotation }: { color: string; rotation: number }) {
  const { scene } = useGLTF('/models/product.glb');
  const cloned = scene.clone();
  
  // Apply color to specific parts
  cloned.traverse((child: any) => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.color.set(color);
    }
  });
  
  return <primitive object={cloned} rotation={[0, rotation, 0]} />;
}

// Preload
useGLTF.preload('/models/product.glb');
```

---

## Response Template

```markdown
🥽 **WebXR & 3D Experiences - Expert Level**

Features:
- Three.js with React Three Fiber
- Physics simulations
- Interactive 3D objects
- VR/AR support (WebXR)
- 3D product viewer
- GLTF model loading

Use Cases:
- Product configurators
- Virtual showrooms
- 3D portfolios
- VR experiences
- AR try-on
- Interactive storytelling

Tools:
- @react-three/fiber
- @react-three/drei
- @react-three/rapier
- @react-three/xr
- Three.js

Integration Time: 3-4 weeks
Complexity: ⭐⭐⭐ Expert
```

---

**Last Updated:** Maret 2026
**Level:** Expert
**Integration Time:** 3-4 weeks
