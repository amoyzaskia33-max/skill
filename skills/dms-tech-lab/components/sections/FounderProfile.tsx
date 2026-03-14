"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ScrollText, Sparkles } from "lucide-react";

export default function FounderProfile() {
  return (
    <section className="relative w-full py-32 px-6 overflow-hidden bg-deep-space" aria-label="리도 이야기">
      {/* 3D Background Elements & Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none perspective-[2000px]">
        {/* Animated Ambient Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[-5%] w-[500px] h-[500px] bg-neon-sky/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-[-5%] w-[450px] h-[450px] bg-gold/15 blur-[120px] rounded-full" 
        />

        {/* Floating 3D Abstract Glass Geometries */}
        <motion.div
           animate={{ rotateY: 360, rotateX: 360, y: [0, -40, 0] }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute top-[15%] right-[5%] w-40 h-40 glass-panel border border-gold/30 rounded-3xl hidden lg:block backdrop-blur-3xl shadow-[0_0_50px_rgba(212,175,55,0.1)]"
           style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div
           animate={{ rotateY: -360, rotateX: -360, y: [0, 40, 0] }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="absolute bottom-[10%] left-[2%] w-28 h-28 glass-panel border border-neon-sky/30 rounded-full hidden lg:block backdrop-blur-3xl shadow-[0_0_50px_rgba(0,209,255,0.1)]"
           style={{ transformStyle: "preserve-3d" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Auto-Rotating Continuous 3D Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative perspective-[2000px] w-full"
          >
            {/* 3D Container with Continuous Float & Rotation */}
            <motion.div 
                animate={{ 
                  rotateY: [0, 6, -6, 0],
                  rotateX: [0, -3, 3, 0],
                  y: [0, -15, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative h-[600px] lg:h-[700px] w-full rounded-[2.5rem] glass-bento border border-gold/30 p-3 shadow-[0_30px_80px_rgba(212,175,55,0.25)]"
                style={{ transformStyle: "preserve-3d" }}
            >
              {/* Internal Image Frame (Pushed Forward for Parallax) */}
              <motion.div 
                className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black"
                style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-[-5%] w-[110%] h-[110%]">
                    <Image
                      src="/about/founder-new.png"
                      alt="Reedo Profile"
                      fill
                      className="object-cover opacity-90"
                    />
                </div>
                
                {/* Advanced Overlay Gradients for Cinematic Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-deep-space/60 via-transparent to-transparent opacity-50" />
                
                {/* Auto-Sweeping Glare Effect */}
                <motion.div 
                  animate={{ 
                    backgroundPosition: ["0% 0%", "200% 200%", "0% 0%"]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, transparent 40%)",
                    backgroundSize: "200% 200%"
                  }}
                />

                {/* Highly Elevated 3D Floating Badge */}
                <div 
                    className="absolute bottom-10 left-8 right-8 glass-panel p-7 rounded-[1.5rem] border border-white/20 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.6)] bg-white/5"
                    style={{ transform: "translateZ(90px)" }} 
                >
                  <div className="flex justify-between items-center text-white">
                    <div>
                      <p className="flex items-center gap-2 text-gold-light text-xs font-bold tracking-[0.25em] uppercase mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        Founder & CEO
                      </p>
                      <h3 className="text-4xl md:text-5xl font-playfair font-bold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-wide">Reedo</h3>
                    </div>
                    <div className="text-right border-l border-white/20 pl-6 py-1">
                      <p className="text-[10px] text-white/60 tracking-[0.2em] uppercase mb-1 drop-shadow-sm">Est.</p>
                      <p className="text-2xl md:text-3xl font-bold font-playfair text-transparent bg-clip-text bg-gradient-to-br from-gold-light to-gold drop-shadow-lg">2004</p>
                    </div>
                  </div>
                </div>
                
              </motion.div>
            </motion.div>
            
            {/* Pulsing Floor Shadow for extreme 3D effect */}
            <motion.div 
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-16 left-12 right-12 h-24 bg-gold/25 blur-[60px] -z-10 rounded-[100%]"
            />
          </motion.div>

          {/* Right: Content with 3D Entry Motion */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col space-y-10"
            style={{ perspective: "1000px" }}
          >
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold/80" />
                <span className="text-gold-light font-bold tracking-[0.25em] text-sm uppercase drop-shadow-sm">Founder Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.2] mb-6">
                20년의 현장,<br />
                30개국의 경험,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-white italic pr-2 text-4xl md:text-5xl lg:text-6xl mt-3 block drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">그리고 다음 10년.</span>
              </h2>
            </div>

            <div className="space-y-6 text-white/75 text-lg leading-relaxed font-light">
              <p>
                20년 이상 3D 설계와 하드웨어 디자인을 기반으로 기술과 현장을 연결하는 엔지니어로 활동해왔습니다.
                컴퓨터공학 전공을 바탕으로 정보통신공학까지 아우르며, 제품 설계, 시스템 이해, 양산 및 현장 적용까지 전 과정을 고려한 설계를 강점으로 삼고 있습니다.
              </p>
              <p>
                전 세계 30여 개국에서의 데모 및 교육 경험을 통해 <strong className="text-white font-medium drop-shadow-sm">'설계는 도면이 아니라 현장에서 완성된다'</strong>는 철학을 체득했고, 이러한 경험을 바탕으로 현재까지 수많은 특허를 일궈냈습니다.
              </p>
              <div className="pl-6 border-l-4 border-gold/50 mt-10 space-y-2 py-2">
                <p className="text-white text-xl md:text-2xl font-playfair italic leading-snug drop-shadow-md">
                  "기술적 완성도와 더불어 사람 중심의 기술, 지속 가능한 가치를 추구합니다."
                </p>
              </div>
            </div>

            {/* Elevated 3D Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-6">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-8 rounded-3xl glass-panel group shadow-[0_15px_40px_rgba(212,175,55,0.1)] border border-gold/20 hover:border-gold/50 transition-all duration-500 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 text-gold border border-gold/20 group-hover:bg-gold group-hover:text-deep-space transition-all duration-500 shadow-lg">
                          <Award className="w-5 h-5" />
                        </div>
                        <span className="text-white/70 text-sm font-semibold tracking-widest uppercase">특허 보유</span>
                    </div>
                    <div className="text-5xl font-bold font-playfair text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] relative z-10">17<span className="text-xl text-gold ml-2 font-sans font-medium">건</span></div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-8 rounded-3xl glass-panel group shadow-[0_15px_40px_rgba(0,209,255,0.1)] border border-neon-sky/20 hover:border-neon-sky/50 transition-all duration-500 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-neon-sky/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-neon-sky/20 to-neon-sky/5 text-neon-sky border border-neon-sky/20 group-hover:bg-neon-sky group-hover:text-deep-space transition-all duration-500 shadow-lg">
                          <ScrollText className="w-5 h-5" />
                        </div>
                        <span className="text-white/70 text-sm font-semibold tracking-widest uppercase">디자인 등록</span>
                    </div>
                    <div className="text-5xl font-bold font-playfair text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] relative z-10">11<span className="text-xl text-neon-sky ml-2 font-sans font-medium">건</span></div>
                </motion.div>
            </div>

            <div className="pt-10">
                <Link href="/about" className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white hover:text-deep-space transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <span className="relative overflow-hidden font-bold tracking-wide">
                      리도 이야기 전체보기
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}


