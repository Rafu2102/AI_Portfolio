import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';
import ScrollToTop from './components/ui/ScrollToTop';
import Scene from './components/three/Scene';
import Hero from './components/sections/Hero';
import Introduction from './components/sections/Introduction';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import MiniGame from './components/sections/MiniGame';
import Contact from './components/sections/Contact';
import useStore from './store/useStore';

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-cyber-bg flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-mono font-bold text-gradient-hero mb-8"
      >
        &lt;AC /&gt;
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-gray-800 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #00F0FF, #B026FF)',
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Loading text */}
      <p className="text-xs font-mono text-gray-400">
        Initializing<span className="animate-pulse">...</span>
      </p>
    </motion.div>
  );
}

function App() {
  const isLoaded = useStore((s) => s.isLoaded);
  const setIsLoaded = useStore((s) => s.setIsLoaded);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <LoadingScreen
            key="loading"
            onComplete={() => setIsLoaded(true)}
          />
        )}
      </AnimatePresence>

      <CustomCursor />

      {/* 3D Background (always render for preload) */}
      <Scene />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Main content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />

        <main>
          <Hero />
          <Introduction />
          <About />
          <Skills />
          <Projects />
          <MiniGame />
          <Contact />
        </main>

        <Footer />
        <ScrollToTop />
      </motion.div>
    </>
  );
}

export default App;
