"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Monitor, Cpu, Network, ArrowUpRight, Award, ScrollText, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-full !bg-white bg-white text-[#050B1B] overflow-x-hidden font-poppins selection:bg-neon-sky selection:text-white min-h-screen relative z-10">
      <div className="absolute inset-0 bg-white -z-10" /> {/* Backup Background Layer */}
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 pt-20 bg-white">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
            >
                <div>
                    <span className="block w-12 h-[2px] bg-neon-sky mb-4" />
                    <h5 className="text-neon-sky font-semibold tracking-widest text-sm uppercase">About DMS</h5>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-[#050B1B]">
                    Engineering the Invisible,<br/>
                    <span className="text-neon-sky">보이지 않는 가치를 설계합니다.</span>
                </h1>

                <div className="space-y-4 text-lg text-gray-700 leading-relaxed max-w-lg">
                    <p className="text-xl font-medium text-[#050B1B]">
                        3D · Hardware · AI
                    </p>
                    <p>
                        20년의 경험이 만드는 차이.
                    </p>
                </div>

                <div className="pt-8 text-xs text-gray-500 font-mono flex items-center gap-2">
                    <span>Founded 2023</span>
                    <span>•</span>
                    <span>Engineering + Design + AI Workflow</span>
                </div>
            </motion.div>

            {/* Image Side */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative h-[500px] md:h-[600px] w-full"
            >
                <div className="absolute inset-0 rounded-[24px] overflow-hidden shadow-2xl bg-gray-100">
                    <Image 
                        src="/about/hero.png" 
                        alt="Engineering Studio" 
                        fill
                        className="object-cover"
                    />
                </div>
                {/* Floating UI Overlay Decoration - Simplified visual element */}
                <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-left-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:flex items-center gap-4 z-20">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Cpu className="w-6 h-6 text-neon-sky" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">System Status</div>
                        <div className="text-lg font-bold text-[#050B1B]">Optimization: 98%</div>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 2. MISSION STRIP */}
      <section className="w-full border-y border-white/10 bg-[#050B1B] py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-white/60 uppercase tracking-widest">우리가 하는 일</span>
                <span className="h-[1px] w-16 bg-white/30" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {[
                    { kor: "설계", eng: "Design Engineering" }, 
                    { kor: "검증", eng: "Proof & Build" }, 
                    { kor: "자동화", eng: "AI Workflow" }
                ].map((item) => (
                    <div key={item.kor} className="flex flex-col items-center md:items-start text-white">
                        <span className="text-2xl md:text-3xl font-bold">{item.kor}</span>
                        <span className="text-sm text-white/60 font-medium">{item.eng}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="text-center mt-12">
             <p className="text-xl md:text-2xl font-medium text-white">
                아이디어를 “작동하는 결과물”로 만드는 과정 전체를 설계합니다.
             </p>
        </div>
      </section>

      {/* 3. FOUNDER STORY */}
      <section className="w-full py-32 px-6 bg-deep-space relative overflow-hidden">
        {/* 3D Background Elements & Lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none perspective-[2000px]">
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

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            {/* Image Side (3D Auto-Rotating) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative perspective-[2000px] w-full lg:order-1"
            >
              <motion.div 
                  animate={{ 
                    rotateY: [0, 6, -6, 0],
                    rotateX: [0, -3, 3, 0],
                    y: [0, -15, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-[600px] lg:h-[700px] w-full items-center rounded-[2.5rem] glass-bento border border-gold/30 p-3 shadow-[0_30px_80px_rgba(212,175,55,0.25)]"
                  style={{ transformStyle: "preserve-3d" }}
              >
                <div 
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
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-r from-deep-space/60 via-transparent to-transparent opacity-50" />
                  
                  {/* Auto-Sweeping Glare Effect */}
                  <motion.div 
                    animate={{ backgroundPosition: ["0% 0%", "200% 200%", "0% 0%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, transparent 40%)", backgroundSize: "200% 200%" }}
                  />

                  {/* Floating Badge */}
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
                </div>
              </motion.div>
              
              {/* Pulsing Floor Shadow for extreme 3D effect */}
              <motion.div 
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-16 left-12 right-12 h-24 bg-gold/25 blur-[60px] -z-10 rounded-[100%]"
              />
            </motion.div>

            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="space-y-8 lg:order-2"
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
                        전 세계 30여 개국에서의 데모 및 교육 경험을 통해 <strong className="font-semibold text-white drop-shadow-sm">'설계는 도면이 아니라 현장에서 완성된다'</strong>는 철학을 체득했고, 이러한 경험을 바탕으로 현재까지 수많은 특허를 일궈냈습니다.
                    </p>
                    <div className="pl-6 border-l-4 border-gold/50 mt-10 py-2">
                        <p className="font-semibold text-white text-xl md:text-2xl font-playfair italic leading-snug drop-shadow-md">
                            "기술적 완성도와 더불어 사람 중심의 기술, 지속 가능한 가치를 추구합니다."
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mt-8">
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
            </motion.div>
        </div>
      </section>

      {/* 4. TIMELINE */}
      <section className="w-full py-32 bg-[#050B1B] text-white px-6 relative overflow-hidden">
         {/* Abstract Background */}
         <div className="absolute inset-0 opacity-20">
             <Image src="/about/timeline.png" alt="bg" fill className="object-cover mix-blend-overlay" />
         </div>
         
         <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-20">
                <h5 className="text-neon-sky font-semibold tracking-widest text-sm uppercase mb-4">HISTORY</h5>
                <h2 className="text-3xl md:text-4xl font-bold">DMS는 이렇게 진화해왔습니다</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[28px] left-10 right-10 h-[2px] bg-gradient-to-r from-gray-800 via-neon-sky to-gray-800 -z-10 opacity-30" />

                {[
                    { 
                        year: "2023", 
                        title: "설립", 
                        desc: "설계 및 부품 개발 중심으로 시작\n현장 요구를 빠르게 반영하는 개발 방식 구축" 
                    },
                    { 
                        year: "2025", 
                        title: "AI 학습과 확장", 
                        desc: "AI 기반 교육 진행\n설계 컨설팅 + 자동화 관점의 문제 해결" 
                    },
                    { 
                        year: "2026", 
                        title: "바이브 코딩과 사회적 임팩트", 
                        desc: "장애 아동을 위한 웹앱 프로그램\n자동화 워크플로우 제품화\n해외 무역 확장 + AI Agent 기반 소수정예 운영" 
                    }
                ].map((item) => (
                    <div key={item.year} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-4 h-4 rounded-full bg-neon-sky absolute -top-[34px] left-1/2 -translate-x-1/2 hidden md:block ring-4 ring-[#050B1B] shadow-[0_0_20px_rgba(0,209,255,0.5)]" />
                        <div className="text-neon-sky font-mono font-bold text-xl mb-4">{item.year}</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                        <p className="text-gray-300 whitespace-pre-line leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* 5. HOW WE WORK */}
      <section className="w-full py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                 <h5 className="text-neon-sky font-semibold tracking-widest text-sm uppercase mb-4">HOW WE WORK</h5>
                <h2 className="text-3xl md:text-4xl font-bold text-[#050B1B]">적은 인원으로 고효율을 만드는 방법</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { 
                        title: "문제를 잘 정의합니다", 
                        desc: "무엇을 만들지보다 “왜 만드는지”를 먼저 정리합니다.", 
                        icon: CheckCircle2 
                    },
                    { 
                        title: "빠르게 형태로 만듭니다", 
                        desc: "초안 → 피드백 → 개선을 짧게 반복합니다.", 
                        icon: ArrowUpRight 
                    },
                    { 
                        title: "자동화로 시간을 되찾습니다", 
                        desc: "반복 업무는 시스템이, 사람은 창의와 판단에 집중합니다.", 
                        icon: Network 
                    },
                    { 
                        title: "기록이 팀의 실력입니다", 
                        desc: "결정과 근거를 남겨, 다음 실행을 더 빠르게 만듭니다.", 
                        icon: Monitor 
                    }
                ].map((card) => (
                    <div key={card.title} className="p-10 border border-gray-100 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-6 group-hover:border-neon-sky transition-colors shadow-sm">
                            <card.icon className="w-7 h-7 text-[#050B1B] group-hover:text-neon-sky transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#050B1B] mb-4">{card.title}</h3>
                        <p className="text-gray-600 text-lg">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 6. 2026 FOCUS */}
      <section className="w-full py-24 px-6 bg-[#050B1B] border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
            <div>
                <h5 className="text-neon-sky font-semibold tracking-widest text-sm uppercase mb-4">2026 FOCUS</h5>
                <h2 className="text-3xl md:text-4xl font-bold text-white">2026년에 집중하는 것</h2>
            </div>
            
            <p className="text-2xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
                DMS는 바이브 코딩과 AI Agent 운영을 통해,<br/> 
                작지만 강한 제품과 사회적 가치를 동시에 만듭니다.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 py-8">
                {["장애아동 웹앱", "업무 자동화 워크플로우", "AI 교육·컨설팅", "해외 무역"].map(tag => (
                    <span key={tag} className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="pt-8 border-t border-white/20">
                <span className="inline-block relative mt-8">
                    <span className="absolute -inset-4 bg-neon-sky/20 rounded-xl transform -skew-x-3" />
                    <span className="relative text-xl md:text-2xl font-bold text-white leading-relaxed">&quot;우리가 만드는 건 ‘기능’이 아니라,<br/>지속 가능한 실행 시스템입니다.&quot;</span>
                </span>
            </div>
        </div>
      </section>

      {/* 7. AI AGENT TEAM */}
      <section className="w-full py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
                 <h5 className="text-neon-sky font-semibold tracking-widest text-sm uppercase mb-4">ONE TEAM</h5>
                <h2 className="text-3xl md:text-4xl font-bold text-[#050B1B] mb-8">AI Agent와 함께 일하는<br/>소수정예 팀</h2>
                <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
                    <p>
                        우리는 사람이 모든 일을 떠안지 않습니다.<br/>
                        AI Agent가 반복 업무를 돕고,<br/> 
                        사람은 <span className="font-bold text-[#050B1B] underline decoration-neon-sky underline-offset-4">설계·판단·품질</span>에 집중합니다.
                    </p>
                    
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-inner">
                        <ul className="flex flex-col gap-4 font-bold text-[#050B1B]">
                            <li className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-neon-sky shadow-[0_0_10px_rgba(0,209,255,0.8)]"/>
                                업무 분해
                            </li>
                            <li className="flex items-center gap-4 ml-8">
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                체크리스트화
                            </li>
                            <li className="flex items-center gap-4 ml-16">
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                자동화
                            </li>
                            <li className="flex items-center gap-4 ml-24">
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                검증 → 개선
                            </li>
                        </ul>
                    </div>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        민감한 개인정보는 최소 수집 원칙을 지킵니다.
                    </p>
                </div>
            </div>
            
            {/* Visual Diagram */}
            <div className="relative h-[500px] bg-[#050B1B] rounded-[32px] p-8 flex items-center justify-center overflow-hidden order-1 lg:order-2 shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-grid-white/[0.05]" />
                
                <div className="relative z-10 flex flex-col items-center gap-8">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] z-10">
                        <span className="font-bold text-[#050B1B]">HUMAN</span>
                    </div>
                    
                    <div className="h-20 w-[2px] bg-gradient-to-b from-white to-neon-sky animate-pulse" />
                    
                    <div className="w-36 h-36 rounded-full bg-neon-sky/10 border-2 border-neon-sky flex items-center justify-center backdrop-blur-md animate-pulse shadow-[0_0_50px_rgba(0,209,255,0.4)] z-10 relative">
                        <span className="font-bold text-white text-lg">AI AGENT</span>
                        {/* Orbiting particles */}
                        <div className="absolute w-full h-full rounded-full border border-dashed border-white/20 animate-spin-slow scale-125" />
                        <div className="absolute w-[120%] h-[120%] rounded-full border border-dotted border-white/10 animate-reverse-spin scale-150" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 8. PROOF */}
      <section className="w-full py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center gap-12 text-center md:text-left">
            {[
                { val: "20년", label: "3D 설계 & 개발 경험" },
                { val: "30+개국", label: "데모·교육·현장 커뮤니케이션" },
                { val: "10년", label: "지속적인 봉사활동" }
            ].map((stat) => (
                <div key={stat.label} className="transform hover:scale-105 transition-transform duration-300">
                    <div className="text-6xl font-black text-[#050B1B] mb-2 font-poppins tracking-tighter">{stat.val}</div>
                    <div className="text-gray-500 font-bold text-lg uppercase tracking-wide">{stat.label}</div>
                </div>
            ))}
        </div>
        <div className="text-center mt-16 text-gray-500 font-medium">
            기술은 결국 사람을 돕기 위해 존재한다고 믿습니다.
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="w-full py-32 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#050B1B] leading-tight">함께 만들고 싶다면</h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                프로젝트, 협업, 교육, 자동화 구축까지.<br/> 
                DMS가 현실적인 실행 플랜으로 연결해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
                 <a href="https://open.kakao.com/o/sSPHn33g" target="_blank" rel="noopener noreferrer" className="px-12 py-5 bg-[#050B1B] text-white font-bold text-lg rounded-full hover:bg-neon-sky hover:text-[#050B1B] transition-all shadow-xl hover:shadow-neon-sky/50 hover:-translate-y-1">
                    협업 문의하기
                </a>
                <Link href="/services" className="px-12 py-5 bg-white border-2 border-[#050B1B] text-[#050B1B] font-bold text-lg rounded-full hover:bg-gray-50 transition-all hover:-translate-y-1">
                    프로젝트 보기
                </Link>
            </div>
            
            <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto border-t border-gray-100 mt-16">
                <div className="p-6 bg-gray-50 rounded-2xl">
                     <div className="text-xs font-bold text-gray-400 uppercase mb-2">Email</div>
                     <div className="text-[#050B1B] font-medium truncate">reedo.dev@dmssolution.co.kr</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                     <div className="text-xs font-bold text-gray-400 uppercase mb-2">Location</div>
                     <div className="text-[#050B1B] font-medium">Korea</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                     <div className="text-xs font-bold text-gray-400 uppercase mb-2">Response Time</div>
                     <div className="text-[#050B1B] font-medium">24~48 Hours</div>
                </div>
            </div>
        </div>
      </section>

    </main>
  );
}
