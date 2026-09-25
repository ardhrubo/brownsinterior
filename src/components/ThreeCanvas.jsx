import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function ImagePlane() {
  const mesh = useRef();
  const { viewport, mouse } = useThree();
  
  // High-quality real home interior from Unsplash
  const texture = useTexture('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000');
  
  const [hovered, setHover] = useState(false);
  const target = new THREE.Vector2();

  useFrame((state, delta) => {
    // Smooth mouse follow for parallax
    target.set((mouse.x * viewport.width) / 20, (mouse.y * viewport.height) / 20);
    if (mesh.current) {
      mesh.current.position.x += (target.x - mesh.current.position.x) * 0.05;
      mesh.current.position.y += (target.y - mesh.current.position.y) * 0.05;
      
      // Subtle 3D tilt
      mesh.current.rotation.y = (mouse.x * Math.PI) / 20;
      mesh.current.rotation.x = -(mouse.y * Math.PI) / 20;
    }
  });

  return (
    <mesh 
      ref={mesh} 
      onPointerOver={() => setHover(true)} 
      onPointerOut={() => setHover(false)}
      scale={[viewport.width * 1.1, viewport.height * 1.1, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default function ThreeCanvas() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <React.Suspense fallback={null}>
          <ImagePlane />
        </React.Suspense>
      </Canvas>
      {/* Overlay gradient to ensure text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(248, 246, 240, 0.95) 0%, rgba(248, 246, 240, 0.7) 40%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }}></div>
    </div>
  );
}
