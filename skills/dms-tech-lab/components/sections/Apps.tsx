"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/constants/data";

export default function Apps() {
  return (
    <section id="projects" className="w-full py-16 px-6 flex flex-col items-center bg-[#050B1B] overflow-hidden relative z-10">
      <div className="max-w-7xl w-full relative">
        {/* Header */}
        <div className="mb-20 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
                <span className="h-[1px] w-12 bg-neon-sky" />
                <h3 className="text-neon-sky font-poppins font-semibold tracking-widest text-sm uppercase">Selected Works</h3>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                디지털 경험을<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-sky to-neon-purple">
                    확장하는 프로젝트.
                </span>
            </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: "easeOut"
                    }}
                    className="group relative bg-white rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(14,165,233,0.3)] transition-all duration-300 hover:-translate-y-2"
                >
                    <Link href={(project as any).link || "/services"} className="block w-full h-full">
                        {/* Image Area */}
                        <div className="h-48 w-full relative overflow-hidden flex-shrink-0">
                             <Image
                                 src={project.image}
                                 alt={project.title}
                                 fill
                                 className="object-cover group-hover:scale-110 transition-transform duration-700"
                                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

                             {/* Icon - Top Right */}
                             <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                                 <project.icon className={`w-5 h-5 ${project.color}`} />
                             </div>
                        </div>

                        {/* Content - Always visible */}
                        <div className="p-6 bg-white relative z-20 h-full">
                            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 block">{project.category}</span>
                            <h3 className="text-xl font-bold text-[#050B1B] mb-3 group-hover:text-neon-sky transition-colors">{project.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                {project.desc}
                            </p>

                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 text-sm font-semibold text-[#050B1B] group-hover:bg-[#050B1B] group-hover:text-white transition-all">
                                자세히 보기 <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
        
      </div>
    </section>
  );
}
