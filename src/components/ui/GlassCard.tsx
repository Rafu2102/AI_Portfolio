import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

export default function GlassCard({
  children,
  className = '',
  hoverGlow = true,
  glowColor = '#00F0FF',
  ...props
}) {
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden glass neon-border ${
        hoverGlow ? 'neon-border-hover' : ''
      } ${className}`}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      whileHover={hoverGlow ? { y: -5, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {/* Gradient overlay on top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor}66, transparent)`,
        }}
      />
      {children}
    </motion.div>
  );
}
