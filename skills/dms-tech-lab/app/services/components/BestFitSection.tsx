'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BestFitSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const targets = [
    {
      icon: '🧠',
      title: 'AI를 도입하고 싶은데 무엇부터 해야 할지 모르는 팀',
      description: '어떤 AI를 어떻게 도입할지 명확하지 않은 경우, 업무 분석부터 도입 계획까지 함께 설계합니다.'
    },
    {
      icon: '⚙️',
      title: '반복 작업이 많아 업무 자동화가 필요한 조직',
      description: '문서 작성, 정리, 보고 등 반복되는 업무를 AI로 자동화하여 시간을 절약합니다.'
    },
    {
      icon: '🎨',
      title: '아이디어를 빠르게 3D로 구체화해야 하는 프로젝트',
      description: '컨셉이나 프로토타입을 빠르게 시각화하고, 실제 제품으로 넘어가는 단계를 지원합니다.'
    },
    {
      icon: '👥',
      title: '여러 AI를 섞어 쓰며 결과물을 체계적으로 관리하고 싶은 크리에이터/팀',
      description: 'AI 기능을 하나의 플랫폼으로 통합해, 프로젝트별로 결과물을 효율적으로 관리합니다.'
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
            className="text-purple-400 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Target Audience
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            이런 분께 추천
          </motion.h2>
        </motion.div>

        {/* Target Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {targets.map((target, index) => (
            <motion.div
              key={target.title}
              className="glass-panel p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {target.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {target.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                {target.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
    </section>
  );
}
