import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TypeWriter from '../ui/TypeWriter';
import NeonButton from '../ui/NeonButton';
import { personalInfo } from '../../data/portfolio';
import useStore from '../../store/useStore';

export default function Hero() {
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  const handleScroll = (target) => {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-bg/50 to-cyber-bg pointer-events-none z-[1]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass neon-border"
        >
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
          <span className="text-xs font-mono text-gray-200">
            目前可接案 / Open to Work
          </span>
        </motion.div>

        {/* Main title — Chinese name prominent, English subtitle below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[1.05] tracking-tight">
            <span className="text-gradient-hero">{personalInfo.name}</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg lg:text-xl font-mono text-gray-400 tracking-[0.15em]">
            {personalInfo.enName}
          </p>
        </motion.div>

        {/* Title tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-sm sm:text-base text-cyber-cyan/70 font-mono mb-4"
        >
          {personalInfo.title}
        </motion.p>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl lg:text-2xl font-mono text-gray-200 mb-4 h-8"
        >
          <span className="text-cyber-cyan/60">$ </span>
          <TypeWriter
            strings={personalInfo.roles}
            typeSpeed={70}
            deleteSpeed={40}
            delayBetween={2500}
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <NeonButton
            variant="cyan"
            size="lg"
            onClick={() => handleScroll('#projects')}
          >
            查看作品集
          </NeonButton>
          <NeonButton
            variant="purple"
            size="lg"
            onClick={() => handleScroll('#contact')}
          >
            聯絡我
          </NeonButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-cyber-cyan/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
