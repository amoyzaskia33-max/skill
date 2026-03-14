"use client";

import { motion } from "framer-motion";
import { homeGrowthData } from "@/lib/home-growth-copy";

export default function GrowthTrustBar() {
  return (
    <section className="w-full px-6 pb-12 bg-[#050B1B] relative z-10" aria-label="핵심 성과 지표">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {homeGrowthData.trustMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center"
          >
            <p className="text-3xl md:text-4xl font-bold text-neon-sky mb-2">{metric.value}</p>
            <p className="text-white/60 text-sm tracking-wide">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
