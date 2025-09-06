/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';

function usePointer() {
  const ref = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w) * 2 - 1;
      const y = -(e.clientY / h) * 2 + 1;
      ref.current = { x, y };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return ref;
}

function Lens({ pointerRef, modeProps }) {
  const mesh = useRef();
  const { camera, viewport } = useThree();
  const geo = useMemo(() => new THREE.CylinderGeometry(1.2, 1.2, 0.15, 96), []);
  useFrame((state, delta) => {
    const v = viewport.getCurrentViewport(camera, [0, 0, 5]);
    const px = (pointerRef.current.x * v.width) / 2;
    const py = (pointerRef.current.y * v.height) / 2;
    mesh.current.position.lerp(new THREE.Vector3(px, py, 0), 1 - Math.exp(-delta * 12));
    mesh.current.rotation.x = Math.PI / 2;
  });
  return (
    <mesh ref={mesh} geometry={geo}>
      <MeshTransmissionMaterial
        transmission={1}
        thickness={modeProps?.thickness ?? 8}
        ior={modeProps?.ior ?? 1.15}
        chromaticAberration={modeProps?.chromaticAberration ?? 0.1}
        anisotropy={modeProps?.anisotropy ?? 0.02}
        roughness={modeProps?.roughness ?? 0}
        attenuationColor={modeProps?.attenuationColor ?? '#ffffff'}
        attenuationDistance={modeProps?.attenuationDistance ?? 0.25}
        background={new THREE.Color(0x000000)}
      />
    </mesh>
  );
}

function FluidGlassScene({ pointerRef, modeProps }) {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x000000, 0);
  }, [gl]);
  return <Lens pointerRef={pointerRef} modeProps={modeProps} />;
}

export default function FluidGlassHover({ selector, modeProps }) {
  const [visible, setVisible] = useState(false);
  const pointerRef = usePointer();

  useEffect(() => {
    const sel = selector || 'a, button, .pc-card, .project-card, .skill-card, .gooey-nav-container li, .gooey-nav-container a, [role="button"]';
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        setVisible(!!el && !!el.closest(sel));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [selector]);

  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 25 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <FluidGlassScene pointerRef={pointerRef} modeProps={modeProps} />
      </Canvas>
    </div>
  );
}
