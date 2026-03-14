'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AppCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const apps = [
    {
      id: 'vibe-coder',
      name: 'Vibe Coder',
      description: 'AI Pair Programming Assistant',
      technologies: ['Next.js', 'OpenAI'],
      status: 'LIVE',
      statusColor: 'text-neon-sky border-neon-sky bg-neon-sky/10'
    },
    {
      id: 'project-closure',
      name: 'Project Closure',
      description: 'Automated Project Wrapper',
      technologies: ['Python', 'Rust'],
      status: 'BETA',
      statusColor: 'text-yellow-400 border-yellow-400 bg-yellow-400/10'
    },
    {
      id: 'idea-flow',
      name: 'Idea Flow',
      description: '3D Brainstorming Canvas',
      technologies: ['Three.js', 'Socket.io'],
      status: 'DEV',
      statusColor: 'text-gray-400 border-gray-400 bg-gray-400/10'
    },
    {
      id: 'prompt-lab',
      name: 'Prompt Lab',
      description: 'AI Prompt Engineering Studio',
      technologies: [],
      status: 'BETA',
      statusColor: 'text-yellow-400 border-yellow-400 bg-yellow-400/10'
    },
    {
      id: 'auto-studio',
      name: 'Auto Studio',
      description: 'AI Content Automation Hub',
      technologies: [],
      status: 'DEV',
      statusColor: 'text-gray-400 border-gray-400 bg-gray-400/10'
    },
  ];

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a3f] to-[#0a0a1f]" />

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(79, 70, 229, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)`,
            backgroundSize: 'cover'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* App Cards Grid - 5 cards per row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              className="relative aspect-[3/2] rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:scale-[1.02] hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
            >
              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-2 py-1 rounded text-[10px] font-mono font-semibold border ${app.statusColor}`}>
                  {app.status}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top: Status spacer + App Name */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-sky transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {app.description}
                  </p>
                </div>

                {/* Bottom: Technology Tags */}
                <div className="flex flex-wrap gap-2">
                  {app.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-white/60 font-mono bg-white/5 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-neon-sky/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-neon-sky/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
    </section>
  );
}
