"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/constants/data";

export default function Services() {
  return (
    <section className="w-full py-24 px-6 bg-deep-space relative z-10 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <h3 className="text-gold-light font-medium tracking-[0.2em] text-sm uppercase">
              What We Do
            </h3>
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white tracking-tight">
            Our <span className="text-gradient-gold italic pr-2">Business</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-light tracking-wide mt-6">
            최고의 기술력과 세련된 감각으로 당신의 비즈니스를 한 차원 더 높게 끌어올립니다.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)]"
            >
              {/* Conditional Link Wrapper */}
              {(service as any).link ? (
                 <Link href={(service as any).link} className="block h-full relative z-10">
                    <ServiceCardContent service={service} />
                 </Link>
              ) : (
                 <div className="block h-full relative z-10">
                    <ServiceCardContent service={service} />
                 </div>
              )}

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 추출된 서비스 카드 콘텐츠
function ServiceCardContent({ service }: { service: any }) {
  return (
    <>
      <div className="relative w-16 h-16 mb-8 group-hover:scale-110 transition-transform duration-500">
          <Image 
            src={service.image} 
            alt={service.title}
            fill
            className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
          />
          <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>

      <h4 className="text-2xl font-playfair font-bold text-white mb-2 tracking-wide group-hover:text-gold-light transition-colors">
        {service.title}
      </h4>
      <p className="text-gold text-sm font-medium mb-5 uppercase tracking-wider">
        {service.subtitle}
      </p>

      <p className="text-white/60 text-sm leading-relaxed font-light">
        {service.description}
      </p>
    </>
  );
}
