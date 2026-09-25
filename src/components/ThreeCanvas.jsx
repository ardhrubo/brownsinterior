import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';

function AbstractShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <octahedronGeometry args={[1.5, 2]} />
        <MeshDistortMaterial
          color="#9c6c42"
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Outer ring */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#c29b62" metalness={1} roughness={0.2} />
      </mesh>
      
      {/* Secondary ring */}
      <mesh castShadow receiveShadow rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#9c6c42" metalness={0.8} roughness={0.1} transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

export default function ThreeCanvas() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.5, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#c29b62" />
        <AbstractShape />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
