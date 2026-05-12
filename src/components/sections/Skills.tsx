import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import HexagonSkill from '../ui/HexagonSkill';
import { skillCategories } from '../../data/portfolio';
import useStore from '../../store/useStore';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  return (
    <section id="skills" className="relative py-24 lg:py-32">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #B026FF, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="專業技能"
          subtitle="Skills & Tech"
          color="purple"
        />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = i === activeCategory;

            return (
              <motion.button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-300 hover:text-gray-300 hover:bg-white/5'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: `${cat.color}15`,
                        border: `1px solid ${cat.color}40`,
                        boxShadow: `0 0 15px ${cat.color}15`,
                        color: cat.color,
                      }
                    : { border: '1px solid transparent' }
                }
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
                {cat.name}
              </motion.button>
            );
          })}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-3xl mx-auto"
          >
            {skillCategories[activeCategory].skills.map((skill, i) => (
              <HexagonSkill
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={skillCategories[activeCategory].color}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Category description */}
        <motion.div
          key={`desc-${activeCategory}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
            style={{
              color: skillCategories[activeCategory].color,
              backgroundColor: `${skillCategories[activeCategory].color}10`,
              border: `1px solid ${skillCategories[activeCategory].color}20`,
            }}
          >
            共 {skillCategories[activeCategory].skills.length} 項技能 ·{' '}
            {skillCategories[activeCategory].name}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
