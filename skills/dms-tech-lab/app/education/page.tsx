"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { EDUCATION_TRACKS } from "@/lib/education-data";

export default function EducationPage() {
  const tracks = Object.values(EDUCATION_TRACKS);

  return (
    <main className="w-full min-h-screen bg-[#050B1B] text-white font-poppins selection:bg-neon-sky selection:text-[#050B1B] relative">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-center px-6 overflow-hidden pt-32 z-10">
        <div className="max-w-7xl mx-auto w-full relative text-center md:text-left">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-block px-4 py-2 rounded-full border border-neon-sky/30 bg-neon-sky/10 text-neon-sky text-sm font-bold tracking-widest mb-6 backdrop-blur-sm">
                    PROFESSIONAL ENGINEERING ACADEMY
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                    다양한 AI & 엔지니어링<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">교육자료를 제공합니다.</span>
                </h1>
                <p className="text-xl text-white/60 max-w-2xl leading-relaxed mb-10 md:mx-0 mx-auto">
                    시중에 널리 알려지지 않은 각종 고급 스킬들을<br />
                    체계적으로 정리하여 지속적으로 업로드합니다.
                </p>

                <a href="https://open.kakao.com/o/sSPHn33g" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-[#050B1B] font-bold rounded-full hover:bg-neon-sky transition-colors flex items-center gap-2 mx-auto md:mx-0 inline-flex">
                    교육문의 <ArrowRight className="w-4 h-4" />
                </a>
            </motion.div>
        </div>
      </section>

      {/* 2. Curriculum Grid */}
      <section className="px-6 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                {tracks.map((track, idx) => (
                    <motion.div
                        key={track.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="group relative block w-full"
                    >
                        {track.externalLink ? (
                          <a href={track.externalLink} target="_blank" rel="noopener noreferrer" className="block h-full">
                            <div className="relative aspect-[3/4] w-full rounded-[20px] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl hover:shadow-neon-sky/20 perspective-1000">
                                
                                {/* Book Spine Effect (Left Side) */}
                                <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-[20px] bg-gradient-to-r from-white/20 to-transparent z-20 pointer-events-none" />
                                
                                {/* Cover Image/Background */}
                                <div className="absolute inset-0 rounded-[20px] overflow-hidden bg-[#0A1124] border-2 border-white/20 group-hover:border-white/40 transition-colors shadow-lg flex items-center justify-center">
                                    <div className={`absolute inset-0 bg-gradient-to-br from-${track.color}-900/50 to-slate-900 z-0`} /> 
                                    <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
                                        <Image 
                                            src={track.backgroundImage || track.image}
                                            alt={track.title}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B1B]/80 to-[#050B1B] z-10" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                    {/* Top Badge (Tags) */}
                                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                                        {track.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Vol Badge */}
                                    <div className={`absolute top-6 right-6 w-12 h-16 bg-${track.color}-500 rounded-b-lg shadow-lg flex flex-col items-center justify-center text-white font-bold opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100`}>
                                        <span className="text-xs opacity-80">Vol.</span>
                                        <span className="text-lg">{track.vol}</span>
                                    </div>

                                    {/* Title Section */}
                                    <div className="transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                                        <span className={`block text-${track.color}-400 text-sm font-bold tracking-widest uppercase mb-2 opacity-90`}>
                                            {track.id.toUpperCase().replace("-", " ")}
                                        </span>
                                        <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-neon-sky transition-colors">
                                            {track.title}
                                        </h3>
                                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                                            <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                                {track.description}
                                            </p>
                                            <div className="flex items-center text-white font-semibold text-sm hover:text-neon-sky transition-colors">
                                                Visit Openclaw <ArrowRight className="w-4 h-4 ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className={`absolute -inset-1 rounded-[24px] bg-gradient-to-br from-${track.color}-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                            </div>
                          </a>
                        ) : (
                        <Link href={`/education/${track.id}`} className="block h-full"> 
                            <div className="relative aspect-[3/4] w-full rounded-[20px] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl hover:shadow-neon-sky/20 perspective-1000">
                                
                                {/* Book Spine Effect (Left Side) */}
                                <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-[20px] bg-gradient-to-r from-white/20 to-transparent z-20 pointer-events-none" />
                                
                                {/* Cover Image/Background */}
                                <div className="absolute inset-0 rounded-[20px] overflow-hidden bg-[#0A1124] border-2 border-white/20 group-hover:border-white/40 transition-colors shadow-lg flex items-center justify-center">
                                    <div className={`absolute inset-0 bg-gradient-to-br from-${track.color}-900/50 to-slate-900 z-0`} /> 
                                    <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
                                        <Image 
                                            src={track.backgroundImage || track.image}
                                            alt={track.title}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B1B]/80 to-[#050B1B] z-10" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                    {/* Top Badge (Tags) */}
                                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                                        {track.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Vol Badge */}
                                    <div className={`absolute top-6 right-6 w-12 h-16 bg-${track.color}-500 rounded-b-lg shadow-lg flex flex-col items-center justify-center text-white font-bold opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100`}>
                                        <span className="text-xs opacity-80">Vol.</span>
                                        <span className="text-lg">{track.vol}</span>
                                    </div>

                                    {/* Title Section */}
                                    <div className="transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                                        <span className={`block text-${track.color}-400 text-sm font-bold tracking-widest uppercase mb-2 opacity-90`}>
                                            {track.id.toUpperCase().replace("-", " ")}
                                        </span>
                                        <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-neon-sky transition-colors">
                                            {track.title}
                                        </h3>
                                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                                            <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                                {track.description}
                                            </p>
                                            <div className="flex items-center text-white font-semibold text-sm hover:text-neon-sky transition-colors">
                                                View Curriculum <ArrowRight className="w-4 h-4 ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className={`absolute -inset-1 rounded-[24px] bg-gradient-to-br from-${track.color}-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                            </div>
                        </Link>
                        )}
                        
                        {/* Reflection */}
                        <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/50 blur-lg rounded-[100%] opacity-0 group-hover:opacity-40 transition-opacity duration-500 transform scale-x-90" />
                    </motion.div>
                ))}
            </div>
            
        </div>
      </section>

    </main>
  );
}

