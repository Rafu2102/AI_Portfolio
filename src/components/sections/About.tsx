import { motion } from 'framer-motion';
import { Code2, Cpu, Rocket, Zap } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import { personalInfo, aboutHighlights } from '../../data/portfolio';

const highlightIcons = [Code2, Cpu, Rocket, Zap];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="關於我"
          subtitle="About Me"
          color="cyan"
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left: Bio Card (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <GlassCard className="p-8 lg:p-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <span className="text-cyber-cyan font-mono text-sm">01.</span>
                    背景介紹
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <span className="text-cyber-cyan font-mono text-sm">02.</span>
                    專業領域
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    專注於建構以 AI 驅動的智慧應用、打造沉浸式遊戲體驗，以及使用前沿技術開發高效能 Web 系統。
                    從 RAG 驅動的智慧助理到即時運算的遊戲引擎，熱衷於將複雜的技術概念轉化為優雅的解決方案。
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <span className="text-cyber-cyan font-mono text-sm">03.</span>
                    開發信念
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    堅信撰寫乾淨、可維護的程式碼，不只是讓它能動，更要讓它出色。
                    每一個像素都有意義，每一毫秒都值得優化，每一次使用者互動都應該感受到魔法般的體驗。
                  </p>
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {['React', 'Python', 'C/C++', 'Three.js', 'PyTorch', 'SDL2'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-full text-cyber-cyan/80 border border-cyber-cyan/20 bg-cyber-cyan/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right: Stats (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {aboutHighlights.map((item, i) => {
              const Icon = highlightIcons[i] || Zap;
              const colors = ['#00F0FF', '#B026FF', '#39FF14', '#FF2E97'];
              const color = colors[i % colors.length];

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <GlassCard
                    className="p-6 text-center"
                    glowColor={color}
                  >
                    <Icon
                      size={24}
                      style={{ color }}
                      className="mx-auto mb-3"
                    />
                    <div
                      className="text-lg font-bold font-mono mb-1 leading-tight"
                      style={{ color }}
                    >
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-300 font-medium tracking-wider">
                      {item.label}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
