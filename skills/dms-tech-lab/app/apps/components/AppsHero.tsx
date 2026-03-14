'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function AppsHero() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1f] via-[#1a1a3f] to-[#0a0a1f]" />

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`,
            backgroundSize: 'cover'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.span
              className="text-neon-sky font-mono tracking-widest text-sm mb-2 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              WHAT WE BUILD
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Featured Apps
            </motion.h2>
          </div>

          <motion.button
            className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all font-mono text-sm flex items-center gap-2 group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            VIEW ALL APPS
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
    </section>
  );
}
