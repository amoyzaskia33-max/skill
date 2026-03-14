'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HowWeWorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      step: '01',
      title: '요구사항 정리',
      description: '목표/기한/예산/우선순위 정리',
      icon: '📋'
    },
    {
      step: '02',
      title: '설계 & 제안',
      description: '구조/기능/일정 제안서 제공',
      icon: '📐'
    },
    {
      step: '03',
      title: '제작(개발/디자인)',
      description: '주차별 산출물 공유',
      icon: '🛠️'
    },
    {
      step: '04',
      title: '테스트 & 개선',
      description: '실제 사용 기준으로 안정화',
      icon: '✅'
    },
    {
      step: '05',
      title: '배포 & 운영',
      description: '운영 가이드 + 유지보수 옵션',
      icon: '🚀'
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
            Process
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            진행 방식
          </motion.h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              className="glass-panel p-8 rounded-2xl hover:scale-[1.01] transition-all duration-300 group relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-start gap-6">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                    {item.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
    </section>
  );
}
