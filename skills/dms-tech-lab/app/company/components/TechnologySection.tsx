'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TechnologySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    {
      icon: '🧊',
      title: '3D 엔지니어링 기술',
      description: '20년 이상 축적된 3D 설계와 제품 개발 경험을 기반으로\n아이디어를 시각화하고 구조를 검증하는 기술을 보유하고 있습니다.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🤖',
      title: 'AI 기술',
      description: '복잡한 작업을 자동화하고 의사결정을 지원하는 AI 기술을 개발합니다.\n실제 프로젝트에서 검증된 실용적인 솔루션을 제공합니다.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '💻',
      title: '웹 기반 SaaS 기술',
      description: 'AI와 3D 기술을 통합한 웹 기반 SaaS 플랫폼을 구축하여\n사용자에게 효율적인 작업 환경을 제공합니다.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🔗',
      title: '시스템 통합 기술',
      description: '제품 디자인, 3D 모델링, 시스템 개발, 디지털 프로젝트를 연계하여\n통합 솔루션을 구현합니다.',
      color: 'from-orange-500 to-red-500'
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
            className="text-cyan-400 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Our Technology
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            기술
          </motion.h2>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              className="glass-panel p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${tech.color}`}>
                {tech.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {tech.description}
              </p>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${tech.color} blur-xl -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom highlight */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="glass-panel p-8 rounded-2xl inline-block">
            <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              실용적인 기술로 현실 세계에서 작동하는 솔루션을 구축합니다
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
}
