'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      title: 'Innovation',
      description: '새로운 기술과 방법을 끊임없이 탐구합니다',
      icon: '💡'
    },
    {
      title: 'Execution',
      description: '아이디어보다 실행을 중시합니다',
      icon: '⚡'
    },
    {
      title: 'Automation',
      description: '반복되는 일은 시스템으로 해결합니다',
      icon: '🔄'
    },
    {
      title: 'Reliability',
      description: '신뢰할 수 있는 기술을 만듭니다',
      icon: '✅'
    },
    {
      title: 'Long-Term Vision',
      description: '지속 가능한 성장을 추구합니다',
      icon: '🎯'
    },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3f]" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-pink-400 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Core Values
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            핵심 가치
          </motion.h2>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="glass-panel p-8 rounded-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                {value.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            "We don't just build software,
            <br />
            we build the future of work."
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
}
