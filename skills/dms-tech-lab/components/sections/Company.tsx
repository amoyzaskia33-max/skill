"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { companyFeatures } from "@/constants/data";

export default function Company() {
  return (
    <section id="company" className="relative w-full py-32 px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto space-y-40">
        
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
             >
                <div className="flex items-center gap-3 mb-6">
                    <span className="h-[1px] w-12 bg-neon-sky" />
                    <h3 className="text-neon-sky font-poppins font-semibold tracking-widest text-sm uppercase">About DMS</h3>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#050B1B]">
                    데이터와 디자인의 교차점에서<br />
                    <span className="text-neon-sky">혁신을 설계하다.</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    우리는 단순한 소프트웨어가 아닌, 미래를 건축합니다. 
                    고도화된 3D 시각화 기술과 지능형 AI 시스템을 결합하여
                    대체 불가능한 디지털 경험을 창조합니다.
                </p>
                <Link href="/about" className="text-[#050B1B] font-medium border-b border-neon-sky pb-1 hover:text-neon-sky transition-colors flex items-center gap-2 inline-flex">
                    DMS 소개 더보기 <ArrowRight className="w-4 h-4" />
                </Link>
             </motion.div>

              <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
                 className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
              >
                  <Image
                     src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
                     alt="Innovation"
                     fill
                     className="object-cover hover:scale-105 transition-transform duration-700"
                     priority={false}
                  />
              </motion.div>
        </div>

        {/* Feature Blocks (Image Left / Text Right pattern) */}
        <div className="space-y-32">
            {companyFeatures.map((feature, index) => (
                <div key={feature.title} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="relative aspect-[4/3] rounded-3xl overflow-hidden group shadow-xl"
                    >
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-all duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-start"
                    >
                        <span className="text-neon-sky font-mono text-xs tracking-widest mb-4 uppercase">{feature.subtitle}</span>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#050B1B] mb-6">{feature.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {feature.description}
                        </p>
                        
                        <ul className="space-y-4 mb-8">
                            {feature.points.map((point) => (
                                <li key={point} className="flex items-center gap-3 text-gray-700 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-neon-sky" />
                                    {point}
                                </li>
                            ))}
                        </ul>

                        <button
                            className="px-8 py-3 rounded-full border border-gray-300 text-[#050B1B] hover:bg-[#050B1B] hover:text-white hover:border-[#050B1B] transition-all duration-300 font-medium"
                            suppressHydrationWarning
                        >
                            솔루션 살펴보기
                        </button>
                    </motion.div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
