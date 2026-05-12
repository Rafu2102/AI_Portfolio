import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 35px rgba(57, 255, 20, 0.6), 0 0 70px rgba(57, 255, 20, 0.3)',
          }}
          whileTap={{ scale: 0.9 }}
          className="scroll-to-top-btn"
          aria-label="Scroll to top"
        >
          {/* Animated ring */}
          <span className="scroll-to-top-ring" />

          {/* Text content */}
          <span className="scroll-to-top-text">
            <span className="scroll-to-top-dollar">$</span>
            <span className="scroll-to-top-cd">cd</span>
            <span className="scroll-to-top-label">首頁</span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
