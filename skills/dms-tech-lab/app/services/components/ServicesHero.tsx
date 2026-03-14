'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ServicesHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1f] via-[#1a1a3f] to-[#0a0a1f]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            우리의 서비스
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            DMS Solution은 AI·3D·웹 기반 SaaS를 바탕으로,
            <br />
            아이디어를 실제 결과로 연결하는 솔루션을 제공합니다.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="mailto:Reedo.dev@dmssolution.co.kr"
              className="glass-button px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              상담/문의하기
            </a>
            <Link
              href="/#proof"
              className="px-8 py-4 rounded-full text-lg font-semibold border border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              포트폴리오 보기
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
}
