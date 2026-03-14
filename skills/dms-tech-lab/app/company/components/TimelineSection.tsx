'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    {
      year: '2023',
      title: 'DMS Solution 설립',
      description: '제품 디자인 및 3D 프로젝트 시작'
    },
    {
      year: '2024',
      title: 'AI & 자동화 솔루션',
      description: 'AI 및 자동화 기반 디지털 솔루션 개발'
    },
    {
      year: '2025',
      title: 'SaaS 플랫폼 구축',
      description: '웹 기반 AI SaaS 플랫폼 구축\n다수의 제품 및 디지털 프로젝트 수행'
    },
    {
      year: '2026',
      title: '글로벌 확장',
      description: '글로벌 SaaS 서비스 확장'
    },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a3f] to-[#0a0a1f]" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-emerald-400 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            History
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            연혁
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 hidden md:block" />

          {/* Timeline items */}
          <div className="space-y-12">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.year}
                  className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-panel p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-300 whitespace-pre-line">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:block relative z-10">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-[#0a0a1f]" />
                  </div>

                  {/* Empty space for layout */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden space-y-8 mt-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              className="glass-panel p-6 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {item.year}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 whitespace-pre-line">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
}
