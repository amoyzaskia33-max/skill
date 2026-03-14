'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3f]" />

      <div className="relative z-10 container mx-auto max-w-5xl">
        {/* Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-blue-400 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Contact
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            연락처
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            className="glass-panel p-10 rounded-3xl"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Contact
            </h3>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="text-3xl">📧</div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Email</div>
                  <a
                    href="mailto:Reedo.dev@dmssolution.co.kr"
                    className="text-xl text-white hover:text-blue-400 transition-colors"
                  >
                    Reedo.dev@dmssolution.co.kr
                  </a>
                </div>
              </div>

              {/* Purpose */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  Business & Partnership Inquiries
                </p>
              </div>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            className="glass-panel p-10 rounded-3xl"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Location
            </h3>

            <div className="space-y-6">
              {/* Country */}
              <div className="flex items-start gap-4">
                <div className="text-3xl">🇰🇷</div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Country</div>
                  <div className="text-xl text-white">Korea</div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  We are based in South Korea, serving clients globally through our digital platforms and services.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="glass-panel p-12 rounded-3xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your business?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              비즈니스 혁신을 시작할 준비가 되셨나요?
            </p>
            <a
              href="mailto:Reedo.dev@dmssolution.co.kr"
              className="inline-block glass-button px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
}
