import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

export default function HexagonSkill({ name, level, color = '#00F0FF', index = 0 }) {
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col items-center"
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      {/* Hexagon */}
      <motion.div
        className="relative w-24 h-28 flex items-center justify-center"
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <svg viewBox="0 0 100 115" className="w-full h-full absolute inset-0">
          {/* Background hexagon */}
          <polygon
            points="50,2 95,28 95,80 50,106 5,80 5,28"
            fill="rgba(10, 10, 20, 0.6)"
            stroke={`${color}40`}
            strokeWidth="1.5"
          />
          {/* Fill level (clipped) */}
          <defs>
            <clipPath id={`hex-clip-${name}`}>
              <rect x="0" y={106 - (level / 100) * 104} width="100" height={((level / 100) * 104)} />
            </clipPath>
          </defs>
          <polygon
            points="50,2 95,28 95,80 50,106 5,80 5,28"
            fill={`${color}15`}
            clipPath={`url(#hex-clip-${name})`}
          />
          {/* Hover glow border */}
          <polygon
            points="50,2 95,28 95,80 50,106 5,80 5,28"
            fill="none"
            stroke={color}
            strokeWidth="2"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />
        </svg>

        {/* Level text */}
        <span
          className="relative z-10 text-lg font-bold font-mono"
          style={{ color }}
        >
          {level}
        </span>
      </motion.div>

      {/* Skill name */}
      <span className="mt-1 text-xs font-medium text-gray-200 group-hover:text-white transition-colors text-center">
        {name}
      </span>

      {/* Hover tooltip */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20"
      >
        <div
          className="px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap"
          style={{
            backgroundColor: `${color}20`,
            border: `1px solid ${color}40`,
            color: color,
            boxShadow: `0 0 15px ${color}20`,
          }}
        >
          {name} — {level}%
        </div>
      </div>
    </motion.div>
  );
}
