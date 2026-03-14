'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LocationSection() {
  return (
    <section className="relative py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Location
          </h2>
          
          <div className="glass-panel rounded-2xl p-8 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Location Info */}
              <div className="lg:w-1/3 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-neon-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-white">Korea</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  DMS Solution은 대한민국에 기반을 두고<br />
                  글로벌 클라이언트와 협업하고 있습니다.
                </p>
                <div className="mt-6 flex items-center gap-2 justify-center lg:justify-start">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm">원격 협업 가능</span>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="lg:w-2/3 w-full">
                <div className="relative w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden bg-[#0A1628] border border-white/10 group">
                  <Image
                    src="/images/map-3d.png"
                    alt="3D Holographic Map of Location"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Interactive Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B1B]/80 via-transparent to-transparent flex items-end justify-center pb-6">
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Icheon-si,+Gyeonggi-do,+South+Korea" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-6 py-2 rounded-full bg-white/10 hover:bg-neon-sky/20 border border-white/20 hover:border-neon-sky text-white backdrop-blur-md transition-all duration-300 flex items-center gap-2 group/btn"
                      >
                         <svg className="w-4 h-4 text-neon-sky group-hover/btn:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                         <span className="text-sm font-medium">View on Google Maps</span>
                      </a>
                  </div>
                  
                  {/* Overlay for inactive state (optional, helps with dark mode integration) */}
                  <div className="absolute inset-0 bg-[#050B1B]/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
