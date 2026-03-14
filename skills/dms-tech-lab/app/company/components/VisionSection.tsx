'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const icons = [
    {
      icon: '🧊',
      label: '3D 큐브',
      description: '3D Engineering'
    },
    {
      icon: '🤖',
      label: 'AI 회로',
      description: 'AI Technology'
    },
    {
      icon: '🌐',
      label: '글로벌 네트워크',
      description: 'Global Platform'
    },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a3f] via-[#0a0a1f] to-[#1a1a3f]" />

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
            Vision & Mission
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            비전과 미션
          </motion.h2>
        </motion.div>

        {/* Vision */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="glass-panel p-12 rounded-3xl text-center">
            <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Vision
            </h3>
            <p className="text-2xl md:text-3xl font-semibold text-white mb-4">
              To build the digital infrastructure of the future.
            </p>
            <p className="text-xl text-gray-300">
              우리는 미래 비즈니스의 디지털 기반을 만드는 것을 목표로 합니다.
            </p>
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="glass-panel p-12 rounded-3xl text-center">
            <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Mission
            </h3>
            <p className="text-2xl md:text-3xl font-semibold text-white mb-4">
              We create AI-powered and 3D-driven platforms
              <br />
              that transform how people design, build, and operate.
            </p>
            <p className="text-xl text-gray-300">
              우리는 AI와 3D 기술을 기반으로
              <br />
              사람들이 설계하고, 만들고, 운영하는 방식을 혁신합니다.
            </p>
          </div>
        </motion.div>

        {/* Icons */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {icons.map((item, index) => (
            <motion.div
              key={item.label}
              className="glass-panel p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className="text-6xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-bold mb-2">{item.label}</h4>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    </section>
  );
}
