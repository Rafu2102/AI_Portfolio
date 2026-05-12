import { motion } from 'framer-motion';

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  color = 'cyan',
}) {
  const gradients = {
    cyan: 'from-cyber-cyan to-cyber-purple',
    purple: 'from-cyber-purple to-cyber-pink',
    green: 'from-cyber-green to-cyber-cyan',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {/* Decorative line */}
      <div className={`flex items-center gap-4 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <div
          className="h-[1px] w-12"
          style={{
            background: 'linear-gradient(90deg, transparent, #00F0FF)',
          }}
        />
        <span className="text-cyber-cyan text-xs font-mono uppercase tracking-[0.3em]">
          {subtitle}
        </span>
        <div
          className="h-[1px] w-12"
          style={{
            background: 'linear-gradient(90deg, #00F0FF, transparent)',
          }}
        />
      </div>

      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${gradients[color]} bg-clip-text text-transparent`}
      >
        {title}
      </h2>
    </motion.div>
  );
}
