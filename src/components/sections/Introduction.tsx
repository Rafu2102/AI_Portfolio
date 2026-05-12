import { motion } from 'framer-motion';
import { Monitor, Code2, Layers, Sparkles } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';

const features = [
  {
    icon: Monitor,
    title: 'React + TypeScript',
    desc: '使用 React 18 搭配 TypeScript 建構，確保型別安全與開發效率。',
    color: '#00F0FF',
  },
  {
    icon: Layers,
    title: 'Three.js 3D 場景',
    desc: '整合 @react-three/fiber 打造沉浸式粒子背景與即時光影效果。',
    color: '#B026FF',
  },
  {
    icon: Sparkles,
    title: 'Framer Motion 動畫',
    desc: '全站採用 Framer Motion 實現流暢的微互動與頁面轉場動畫。',
    color: '#39FF14',
  },
  {
    icon: Code2,
    title: 'Cyberpunk 設計語言',
    desc: '以賽博龐克美學為基底，結合 Glassmorphism 與 Neon 光暈設計。',
    color: '#FF2E97',
  },
];

export default function Introduction() {
  return (
    <section id="introduction" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="網站介紹"
          subtitle="About This Site"
          color="cyan"
        />

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <GlassCard className="p-8 lg:p-10 max-w-4xl mx-auto text-center">
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
              這是一個以<span className="text-cyber-cyan font-semibold">賽博龐克（Cyberpunk）</span>為視覺主題的個人作品集網站，
              旨在展示我在 <span className="text-cyber-purple font-semibold">AI 系統架構</span>、
              <span className="text-cyber-pink font-semibold">底層遊戲引擎開發</span> 以及
              <span className="text-cyber-green font-semibold">前沿 Web 技術</span> 領域的專案成果與技術能力。
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              網站使用 React + TypeScript 前端框架開發，搭配 Three.js 實現 3D 粒子背景，
              並透過 Framer Motion 提供豐富的互動動畫體驗。整體設計強調科技感與沉浸式視覺效果。
            </p>
          </GlassCard>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="p-6 text-center h-full" glowColor={feat.color}>
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                    style={{
                      backgroundColor: `${feat.color}15`,
                      border: `1px solid ${feat.color}30`,
                    }}
                  >
                    <Icon size={24} style={{ color: feat.color }} />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{feat.title}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed">{feat.desc}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Tech stack bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            {['React 18', 'TypeScript', 'Vite', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Zustand'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-mono rounded-full text-cyber-cyan/80 border border-cyber-cyan/20 bg-cyber-cyan/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
