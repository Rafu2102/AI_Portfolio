import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import TiltCard from '../ui/TiltCard';
import { projects } from '../../data/portfolio';
import useStore from '../../store/useStore';

const categoryMap = {
  'All': '全部',
  'Game Dev': '遊戲開發',
  'AI / ML': 'AI / ML',
  'Creative': '創意專案',
};

const categories = ['All', ...new Set(projects.map((p) => p.category))];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="專案經歷"
          subtitle="Projects"
          color="green"
        />

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30'
                  : 'text-gray-300 hover:text-gray-300 border border-transparent hover:border-gray-700/50'
              }`}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryMap[cat] || cat}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TiltCard glowColor={project.color} className="h-full">
                  <div className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{
                          backgroundColor: `${project.color}15`,
                          border: `1px solid ${project.color}25`,
                        }}
                      >
                        <Layers size={24} style={{ color: project.color }} />
                      </div>
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                          >
                            <Github size={18} />
                          </motion.a>
                        )}
                        {project.live && project.live !== '#' && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                          >
                            <ExternalLink size={18} />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Category badge */}
                    <span
                      className="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider mb-3"
                      style={{
                        color: project.color,
                        backgroundColor: `${project.color}10`,
                        border: `1px solid ${project.color}20`,
                      }}
                    >
                      {project.category}
                    </span>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-200 leading-relaxed mb-4 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-mono rounded-full text-gray-200 bg-white/5 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
