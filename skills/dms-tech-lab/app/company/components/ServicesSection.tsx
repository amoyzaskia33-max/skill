'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: '🧩',
      title: '3D Engineering & Product Design',
      description: '제품, 구조, 금형, 하우징, 산업 디자인까지\n아이디어를 실제 제품으로 구현하는 3D 설계와 디자인을 제공합니다.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🤖',
      title: 'AI & Automation',
      description: '업무, 콘텐츠, 데이터 분석을 AI로 자동화하여\n시간과 비용을 획기적으로 줄여줍니다.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '💻',
      title: 'SaaS Platform',
      description: '다양한 AI를 하나의 웹 기반 SaaS 플랫폼으로 통합합니다.\n사용자는 여러 AI를 하나의 환경에서 사용하여\n기획, 디자인, 개발, 콘텐츠 생성을 효율적으로 수행할 수 있습니다.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🌍',
      title: 'Digital Solutions',
      description: '기업과 개인을 위한 맞춤형 웹 시스템,\nAI 기반 서비스, 자동화 솔루션을 개발합니다.',
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a3f] to-[#0a0a1f]" />

      <div className="relative z-10 container mx-auto max-w-7xl">
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
            Services
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            주요 사업 분야
          </motion.h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="glass-panel p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${service.color}`}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {service.description}
              </p>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${service.color} blur-xl -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
}
