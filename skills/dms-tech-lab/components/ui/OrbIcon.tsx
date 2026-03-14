"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface OrbIconProps {
  icon: LucideIcon;
  color?: string;
  size?: number; // Icon size
  className?: string;
}

export default function OrbIcon({ icon: Icon, color = "text-white", size = 24, className = "" }: OrbIconProps) {
  return (
    <div className={`relative flex items-center justify-center w-16 h-16 ${className}`}>
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
        
        {/* Glass Orb Body */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20 shadow-inner" />
        
        {/* Light Reflection */}
        <div className="absolute top-3 left-4 w-3 h-2 rounded-[50%] bg-white/40 blur-[1px] rotate-[-45deg]" />

        {/* The Icon */}
        <div className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            <Icon className={`${color}`} size={size} />
        </div>
    </div>
  );
}
