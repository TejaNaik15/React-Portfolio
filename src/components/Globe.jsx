import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function SpinningGlobe() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial color="#13ADC7" wireframe opacity={0.6} transparent />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.51, 64, 64]} />
        <meshStandardMaterial color="#945DD6" wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

export default function Globe({ className = '' }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={0.5} />
        <SpinningGlobe />
      </Canvas>
    </div>
  );
}
