import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useStore from '../../store/useStore';

export default function CustomCursor() {
  const cursorVariant = useStore((s) => s.cursorVariant);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice) return null;

  const variants = {
    default: { width: 32, height: 32, borderColor: 'rgba(0, 240, 255, 0.5)' },
    hover: { width: 56, height: 56, borderColor: 'rgba(176, 38, 255, 0.8)' },
    click: { width: 24, height: 24, borderColor: 'rgba(57, 255, 20, 0.8)' },
  };

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border-2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={cursorVariant}
        variants={variants}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: cursorVariant === 'hover'
              ? '0 0 20px rgba(176, 38, 255, 0.4), 0 0 40px rgba(176, 38, 255, 0.1)'
              : '0 0 15px rgba(0, 240, 255, 0.3), 0 0 30px rgba(0, 240, 255, 0.1)',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] w-2 h-2 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: cursorVariant === 'hover' ? '#B026FF' : '#00F0FF',
          boxShadow: '0 0 10px currentColor',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
