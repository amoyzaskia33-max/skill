"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface BentoCardProps {
  title: string;
  subtitle: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  cta?: string;
  background?: React.ReactNode;
}

export default function BentoCard({
  title,
  subtitle,
  className = "",
  children,
  href,
  cta = "View Project",
  background,
}: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      {/* Background Content (Image/Video/Graphic) */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
        {background}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-neon-sky/20 group-hover:border-neon-sky/50 transition-colors">
                {children}
            </div>
            {href && (
                <ArrowUpRight className="text-white/30 group-hover:text-white transition-colors" />
            )}
        </div>

        <div className="mt-auto pt-12 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-mono text-xs font-bold tracking-widest text-neon-sky mb-2 uppercase">
            {subtitle}
          </h3>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            {title}
          </h2>
          {href && (
              <div className="h-0 group-hover:h-6 overflow-hidden transition-all duration-300">
                  <span className="text-sm text-white/50">{cta}</span>
              </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
