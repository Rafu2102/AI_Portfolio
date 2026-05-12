import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

export default function NeonButton({
  children,
  onClick,
  variant = 'cyan',
  size = 'md',
  className = '',
  href,
  ...props
}) {
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  const colors = {
    cyan: {
      border: '#00F0FF',
      bg: 'rgba(0, 240, 255, 0.05)',
      hoverBg: 'rgba(0, 240, 255, 0.15)',
      shadow: '0 0 15px rgba(0, 240, 255, 0.3), 0 0 30px rgba(0, 240, 255, 0.1)',
      hoverShadow: '0 0 25px rgba(0, 240, 255, 0.5), 0 0 50px rgba(0, 240, 255, 0.2)',
      text: '#00F0FF',
    },
    purple: {
      border: '#B026FF',
      bg: 'rgba(176, 38, 255, 0.05)',
      hoverBg: 'rgba(176, 38, 255, 0.15)',
      shadow: '0 0 15px rgba(176, 38, 255, 0.3), 0 0 30px rgba(176, 38, 255, 0.1)',
      hoverShadow: '0 0 25px rgba(176, 38, 255, 0.5), 0 0 50px rgba(176, 38, 255, 0.2)',
      text: '#B026FF',
    },
    green: {
      border: '#39FF14',
      bg: 'rgba(57, 255, 20, 0.05)',
      hoverBg: 'rgba(57, 255, 20, 0.15)',
      shadow: '0 0 15px rgba(57, 255, 20, 0.3), 0 0 30px rgba(57, 255, 20, 0.1)',
      hoverShadow: '0 0 25px rgba(57, 255, 20, 0.5), 0 0 50px rgba(57, 255, 20, 0.2)',
      text: '#39FF14',
    },
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const c = colors[variant];
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center font-mono font-semibold tracking-wider uppercase rounded-lg overflow-hidden transition-all duration-300 ${sizeClasses[size]} ${className}`}
      style={{
        border: `1px solid ${c.border}`,
        backgroundColor: c.bg,
        color: c.text,
        boxShadow: c.shadow,
      }}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      whileHover={{
        scale: 1.05,
        boxShadow: c.hoverShadow,
        backgroundColor: c.hoverBg,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      {...props}
    >
      {/* Animated gradient border overlay */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${c.border}20, transparent, ${c.border}20)`,
          backgroundSize: '200% 200%',
          animation: 'border-flow 3s linear infinite',
        }}
      />
      <span className="relative z-10">{children}</span>
    </Component>
  );
}
