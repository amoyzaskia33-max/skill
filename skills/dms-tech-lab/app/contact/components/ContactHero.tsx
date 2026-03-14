'use client';

import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-sky/10 border border-neon-sky/20 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-neon-sky font-semibold tracking-widest text-sm uppercase">
              GET IN TOUCH
            </span>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Contact
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            프로젝트에 대한 문의나 협업 제안을 환영합니다.
            <br />
            아이디어가 있으시다면, 함께 실현해 보세요.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
