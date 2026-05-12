import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { socialLinks, personalInfo } from '../../data/portfolio';
import useStore from '../../store/useStore';

export default function Footer() {
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  return (
    <footer className="relative py-8 border-t border-cyan-500/10">
      {/* Neon divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #00F0FF, #B026FF, transparent)',
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-2 rounded-lg text-gray-300 hover:text-white transition-colors duration-300 hover:bg-white/5"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 font-mono flex items-center gap-1">
            © {new Date().getFullYear()} {personalInfo.name} · 以
            <Heart size={12} className="text-cyber-pink inline" fill="currentColor" />
            與 <span className="text-cyber-cyan">React</span> +{' '}
            <span className="text-cyber-purple">Three.js</span> 打造
          </p>
        </div>
      </div>
    </footer>
  );
}
