import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import ParticleField from './ParticleField';
import useMousePosition from '../../hooks/useMousePosition';

export default function Scene() {
  const { normalizedPosition } = useMousePosition();

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <ParticleField count={2500} mouse={normalizedPosition} />
          <EffectComposer>
            <Bloom
              intensity={0.6}
              luminanceThreshold={0.75}
              luminanceSmoothing={0.8}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
