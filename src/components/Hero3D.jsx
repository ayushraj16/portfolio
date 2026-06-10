import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Morphing dual-mesh reacting to mouse coordinates
function MorphingMesh() {
  const outerRef = useRef();
  const innerRef = useRef();
  const { mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Outer Wireframe Mesh animations
    if (outerRef.current) {
      outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, t * 0.10 - mouse.y * 0.6, 0.08);
      outerRef.current.rotation.y = THREE.MathUtils.lerp(outerRef.current.rotation.y, t * 0.06 + mouse.x * 0.6, 0.08);
    }
    
    // Inner Core Solid Mesh animations (slight offset for parallax)
    if (innerRef.current) {
      innerRef.current.rotation.x = THREE.MathUtils.lerp(innerRef.current.rotation.x, -t * 0.08 - mouse.y * 0.4, 0.08);
      innerRef.current.rotation.y = THREE.MathUtils.lerp(innerRef.current.rotation.y, -t * 0.04 + mouse.x * 0.4, 0.08);
    }
  });

  return (
    <group scale={1.8}>
      {/* Outer Holographic Wireframe */}
      <mesh ref={outerRef}>
        <torusKnotGeometry args={[1, 0.32, 130, 16]} />
        <MeshDistortMaterial
          color="#6366f1" // Indigo
          wireframe
          distort={0.4}
          speed={1.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <torusKnotGeometry args={[0.98, 0.30, 100, 14]} />
        <MeshDistortMaterial
          color="#a855f7" // Violet core
          distort={0.35}
          speed={1.8}
          roughness={0.4}
          metalness={0.8}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Particle field shifting in parallax based on mouse
function ParticleField() {
  const pointsRef = useRef();
  const { mouse } = useThree();

  const count = 350;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere around origin
      const radius = 2.5 + Math.random() * 5.5;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03;
      pointsRef.current.rotation.x = t * 0.015;
      
      // Interpolate position based on mouse coordinate vectors
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.x * 1.8, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouse.y * 1.8, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#38bdf8" // Cyan / light blue particles
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-[#030303] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.3], fov: 60 }}
        dpr={[1, 1.5]} // Performance limit
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#030303']} />
        
        {/* Cinematic Studio Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, 10, 10]} color="#6366f1" intensity={2.0} />
        <pointLight position={[10, -10, -5]} color="#a855f7" intensity={1.5} />
        <pointLight position={[0, 0, 5]} color="#38bdf8" intensity={1.2} />
        
        <MorphingMesh />
        <ParticleField />
      </Canvas>
    </div>
  );
}
