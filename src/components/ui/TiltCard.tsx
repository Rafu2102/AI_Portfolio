import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

export default function TiltCard({ children, className = '', glowColor = '#00F0FF' }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      x: (y - 0.5) * -15,
      y: (x - 0.5) * 15,
    });
    setGlowPos({
      x: x * 100,
      y: y * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
    setCursorVariant('default');
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 glass" />

      {/* Glow that follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}40 0%, transparent 50%)`,
        }}
      />

      {/* Neon border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `1px solid ${glowColor}30`,
          boxShadow: `inset 0 0 20px ${glowColor}05`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
