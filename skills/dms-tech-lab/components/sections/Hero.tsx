"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import NeuralBackground from "@/components/ui/NeuralBackground";
import { homeGrowthData } from "@/lib/home-growth-copy";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { BOOKING_URL, isExternalBookingUrl } from "@/lib/booking";

const isExternalBooking = isExternalBookingUrl(BOOKING_URL);

export default function Hero() {
  return (
    <section className="relative z-10 flex w-full min-h-screen flex-col justify-center px-6 overflow-hidden bg-deep-space" aria-labelledby="hero-heading">

      {/* Luxurious Background with Animated Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle Neural Network underneath */}
        <NeuralBackground className="absolute opacity-20 mix-blend-screen" simpleMode={true} />
        
        {/* Animated Aurora/Spotlight effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-indigo/10 blur-[120px] mix-blend-screen animate-aurora-1 pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gold/10 blur-[120px] mix-blend-screen animate-aurora-2 pointer-events-none" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/60 to-deep-space pointer-events-none" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20">

        {/* Left Text */}
        <div className="flex flex-col items-start gap-8 relative z-20">
            
            {/* Ambient subtle glow behind text */}
            <div className="absolute -inset-10 bg-gradient-to-r from-gold/5 via-neon-sky/5 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-gold/30 text-gold-light text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                    <Sparkles className="w-4 h-4 text-gold animate-pulse-slow" />
                    <span>Premium AI Architecture</span>
                </div>
            </motion.div>

            <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-playfair font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-white"
            >
                Design the <br />
                <span className="text-gradient-gold italic pr-4">Unseen.</span>
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
            >
                <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed tracking-wide">
                    보이지 않는 것을 현실로.
                </p>
                <p className="text-base md:text-lg text-white/60 max-w-xl leading-relaxed font-light">
                    아이디어에서 시스템으로, 개념에서 경험으로. 복잡한 비즈니스 로직을 자동화하고, AI와 함께 새로운 가능성을 탐색하며 기술의 본질을 우아하게 설계합니다.
                </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center gap-6 pt-6 w-full sm:w-auto"
            >
                <a
                    href={BOOKING_URL}
                    target={isExternalBooking ? "_blank" : undefined}
                    rel={isExternalBooking ? "noreferrer" : undefined}
                    onClick={() => {
                      trackEvent(ANALYTICS_EVENTS.CTA_PRIMARY_CLICK, { section: "hero", label: "free_audit" });
                      trackEvent(ANALYTICS_EVENTS.CALENDAR_BOOKING_START, { section: "hero", destination: isExternalBooking ? "external" : "onsite" });
                    }}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-deep-space font-semibold rounded-full overflow-hidden transition-all hover:scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.15)] w-full sm:w-auto"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {homeGrowthData.hero.primaryCtaLabel}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:text-gold transition-all" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
                
                <a
                    href="#case-studies"
                    onClick={() => trackEvent(ANALYTICS_EVENTS.CTA_SECONDARY_CLICK, { section: "hero", label: "case_studies" })}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 glass-button text-white font-medium rounded-full w-full sm:w-auto hover:text-gold-light hover:border-gold/30"
                >
                    {homeGrowthData.hero.secondaryCtaLabel}
                    <div className="w-8 h-[1px] bg-white/30 group-hover:bg-gold-light/50 transition-colors hidden sm:block ml-2" />
                </a>
            </motion.div>
        </div>

        {/* Right side - Abstract Luxurious Element */}
        <div className="hidden lg:flex relative h-full min-h-[600px] items-center justify-center pointer-events-none">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="relative w-full h-full flex items-center justify-center"
            >
                {/* Luxurious Glowing Orb */}
                <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-gold/20 to-neon-sky/10 blur-[60px] animate-pulse-slow" />
                <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-gold to-white blur-[50px] opacity-20 animate-float" style={{ animationDelay: '1s' }} />
                
                {/* Main Glassmorphic Card */}
                <motion.div 
                   animate={{ y: [-15, 15, -15], rotate: [-1, 1, -1] }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                   className="relative z-10 w-80 h-[420px] glass-bento flex flex-col items-center justify-center p-10 border-gold/20 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:rounded-3xl"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[30px] rounded-full" />
                    <Sparkles className="w-12 h-12 text-gold/80 mb-8 relative z-10" />
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent mb-8 relative z-10" />
                    <p className="text-center font-playfair text-2xl text-white/90 italic leading-snug relative z-10">
                        "Elegance is the <br/>only beauty that<br/> never fades."
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gold/5 to-transparent rounded-b-[24px]" />
                </motion.div>
                
                {/* Secondary Floating Element - Metrics/Proof */}
                <motion.div 
                   animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
                   transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute -right-4 bottom-12 z-20 w-44 h-44 glass-panel rounded-full flex flex-col items-center justify-center border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                >
                    <div className="absolute inset-2 rounded-full border border-dashed border-gold/20 animate-spin-slow" style={{ animationDuration: '30s' }} />
                    <span className="block text-4xl font-playfair font-bold text-gradient-gold">99<span className="text-2xl text-gold-light/80">%</span></span>
                    <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase mt-2 font-medium">Precision</span>
                </motion.div>
                
                {/* Tertiary floating element */}
                <motion.div 
                   animate={{ y: [-8, 8, -8], rotate: [10, 0, 10] }}
                   transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                   className="absolute left-8 top-20 z-20 px-6 py-3 glass-panel rounded-2xl flex items-center gap-3 border-white/10"
                >
                    <div className="w-2 h-2 rounded-full bg-neon-sky animate-pulse" />
                    <span className="text-xs text-white/80 tracking-widest uppercase font-medium">Live System</span>
                </motion.div>
            </motion.div>
        </div>

      </div>
    </section>
  );
}
