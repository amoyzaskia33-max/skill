'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamStrengths = [
    {
      icon: '⚙️',
      title: '기술적 역량',
      description: '20년 이상 축적된 3D 설계와 제품 개발 경험을 기반으로\n기술적 노하우를 보유하고 있습니다.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🛠️',
      title: '실무 경험',
      description: '제품 디자인, 3D 모델링, 시스템 개발,\n다양한 디지털 프로젝트를 통해 실무에서 검증된 경험을 가지고 있습니다.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🤝',
      title: '협업 문화',
      description: '사람의 창의성과 기술의 힘이 함께 작동하는\n환경을 조성합니다.',
      color: 'from-green-500 to-emerald-500'
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
            className="text-emerald-400 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Team
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            팀
          </motion.h2>
        </motion.div>

        {/* Team Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {teamStrengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              className="glass-panel p-8 rounded-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {strength.icon}
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${strength.color}`}>
                {strength.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {strength.description}
              </p>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${strength.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom highlight */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="glass-panel p-12 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              창의성과 기술이 만나는 곳
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              DMS Solution은 기술적 역량과 실무 경험을 바탕으로
              <br />
              사람의 창의성과 기술의 힘이 함께 작동하는 협업 문화를 조성합니다.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
}
