import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 3000, mouse }) {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    const cyanColor = new THREE.Color('#00F0FF');
    const purpleColor = new THREE.Color('#B026FF');
    const greenColor = new THREE.Color('#39FF14');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Multi-layer distribution: near, mid, far for depth
      const layer = Math.random();
      let radius;
      if (layer < 0.3) {
        radius = 3 + Math.random() * 5;       // near layer — big & bright
      } else if (layer < 0.7) {
        radius = 6 + Math.random() * 8;       // mid layer
      } else {
        radius = 10 + Math.random() * 15;     // far layer — small & ambient
      }
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = (radius * Math.cos(phi)) - 10;

      // Color gradient
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.5) {
        color = cyanColor.clone().lerp(purpleColor, Math.random());
      } else if (colorChoice < 0.8) {
        color = purpleColor.clone().lerp(greenColor, Math.random());
      } else {
        color = cyanColor.clone().lerp(greenColor, Math.random());
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      speeds[i] = Math.random() * 0.5 + 0.1;
    }

    return { positions, colors, speeds };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const positions = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const speed = particles.speeds[i];

      // Gentle orbit + drift
      positions[i3] += Math.sin(time * speed * 0.3 + i) * 0.003;
      positions[i3 + 1] += Math.cos(time * speed * 0.2 + i * 0.5) * 0.003;
      positions[i3 + 2] += Math.sin(time * speed * 0.1 + i * 0.3) * 0.002;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Mouse parallax
    if (mouse) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.1,
        0.02
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mouse.x * 0.1,
        0.02
      );
    }

    // Slow global rotation
    meshRef.current.rotation.z += 0.0003;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
