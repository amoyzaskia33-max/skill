"use client";

import { VibeApp } from "@/lib/vibe-data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface AppCardProps {
  app: VibeApp;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <Link 
      href={app.url} 
      className="group block h-full"
      {...(app.url.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="h-full relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/20 hover:border-neon-sky/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(14,165,233,0.25)] overflow-hidden shadow-lg">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
        
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-sky/20 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-neon-sky/40 transition-colors" />

        {/* Header */}
        <div className="flex justify-between items-start mb-6 relative z-10">
            <div className={`w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-neon-sky group-hover:text-black transition-colors duration-300 shadow-md`}>
                <app.icon className="w-6 h-6" />
            </div>
            
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border-2 ${
                app.status === 'Live' ? 'border-green-400/50 text-green-300 bg-green-500/20 backdrop-blur-sm' :
                app.status === 'Beta' ? 'border-amber-400/50 text-amber-300 bg-amber-500/20 backdrop-blur-sm' :
                'border-gray-400/50 text-gray-300 bg-gray-500/20 backdrop-blur-sm'
            }`}>
                {app.status}
            </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-sky transition-colors drop-shadow-sm">{app.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-2">
                {app.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {app.tags.map(tag => (
                    <span key={tag} className="text-xs text-gray-400 hover:text-neon-sky transition-colors font-medium">#{tag}</span>
                ))}
            </div>
        </div>

        {/* Footer */}
        <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-neon-sky transition-colors relative z-10">
            Launch App <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
