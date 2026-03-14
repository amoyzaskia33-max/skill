"use client";

import { AutomationTemplate } from "@/lib/automation-data";
import { Copy, Box, Zap, User } from "lucide-react"; // Icons placeholder
import Link from "next/link";
import Image from "next/image";

interface TemplateCardProps {
  template: AutomationTemplate;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link href={`/automation/${template.id}`} className="group block h-full">
      <div className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-lg relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
        
        <div className="relative z-10">
            {/* Icons Row */}
            <div className="flex gap-2 mb-4">
                {template.icons.map((icon, i) => (
                    <div key={i} className="w-8 h-8 rounded bg-white/20 backdrop-blur-sm flex items-center justify-center text-gray-300 border border-white/30">
                        {/* Render placeholder icons based on string, or generic box */}
                        <Box className="w-4 h-4" />
                    </div>
                ))}
            </div>

            {/* Title & Desc */}
            <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors drop-shadow-sm">
                {template.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                {template.description}
            </p>
        </div>

        {/* Footer: Author */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/20 relative z-10">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                {template.author.name[0]}
            </div>
            <span className="text-xs text-gray-300 font-medium">
                {template.author.name}
            </span>
            {template.author.verified && (
                <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white shadow-sm">✓</div>
            )}
        </div>

      </div>
    </Link>
  );
}
