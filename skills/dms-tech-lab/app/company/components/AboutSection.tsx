'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const companyInfo = [
    { label: '회사명', value: 'DMS Solution' },
    { label: '설립', value: '2023' },
    { label: '주요 사업', value: 'AI SaaS, 3D Engineering, Product Design, Automation, Software Development' },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3f]" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <div className="text-center mb-16">
            <motion.span
              className="text-blue-400 text-sm font-semibold tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              About Us
            </motion.span>
            <motion.h2
              className="text-5xl md:text-6xl font-bold mt-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              회사 소개
            </motion.h2>
          </div>

          {/* Content */}
          <motion.div
            className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p>
              <span className="text-white font-semibold">DMS Solution</span>은 2023년에 설립된 기술 중심 기업으로,
              <br />
              AI, 3D 엔지니어링, 그리고 웹 기반 SaaS 기술을 결합하여
              <br />
              기업과 크리에이터가 더 빠르고 효율적으로 일할 수 있도록 돕고 있습니다.
            </p>

            <p>
              우리는 제품 디자인, 3D 설계, 시스템 개발, 그리고 다양한 디지털 프로젝트를 통해
              <br />
              실제 산업 현장에서 검증된 경험을 쌓아왔으며,
              <br />
              이 경험을 기반으로 실용적인 AI 및 SaaS 솔루션을 구축하고 있습니다.
            </p>

            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold text-2xl">
              DMS Solution은 단순한 개발사가 아니라,
              <br />
              기술을 통해 업무 방식 자체를 혁신하는 디지털 솔루션 기업입니다.
            </p>
          </motion.div>

          {/* Company Info Table */}
          <motion.div
            className="glass-panel p-8 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Company Information</h3>
            <div className="space-y-4">
              {companyInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 pb-4 border-b border-white/10 last:border-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="md:w-32 font-semibold text-blue-400">
                    {item.label}
                  </div>
                  <div className="flex-1 text-gray-300">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
    </section>
  );
}
