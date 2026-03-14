"use client";

import { motion } from "framer-motion";
import { User, MessageSquare, Terminal } from "lucide-react";

const testimonials = [
  {
    id: 1,
    user: "CTO, Start-up A",
    message: "개발 속도가 3배 빨라졌습니다. Vibe Coding은 진짜입니다.",
    time: "10:42 AM"
  },
  {
    id: 2,
    user: "CEO, Enterprise B",
    message: "처음으로 '아름다운' 어드민 페이지를 받아봤습니다.",
    time: "11:20 AM"
  },
];

export default function Proof() {
  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center overflow-hidden">
      {/* Infinite Marquee of Tech Stack */}
      <div className="w-full max-w-full overflow-hidden mb-24 opacity-30">
        <div className="flex gap-16 item-center whitespace-nowrap animate-spin-slow" style={{ animationDuration: '40s', animationDirection: 'reverse' }}>
           {[...Array(2)].map((_, i) => (
             <div key={i} className="flex gap-16 text-4xl font-mono font-bold text-white/20 select-none">
               <span>NEXT.JS</span>
               <span>TYPESCRIPT</span>
               <span>REACT THREE FIBER</span>
               <span>PYTHON</span>
               <span>RUST</span>
               <span>SUPABASE</span>
               <span>OPENAI</span>
               <span>TAILWIND</span>
             </div>
           ))}
        </div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* CEO / Identity */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/20">
              <User className="w-10 h-10 text-white/50" />
            </div>
            <div>
              <h3 className="text-xl font-bold">DMS Representative</h3>
              <p className="text-neon-indigo font-mono text-sm">Head Architect</p>
            </div>
          </div>
          
          <div className="relative p-6 glass-panel rounded-xl">
            <Terminal className="w-6 h-6 text-white/40 mb-4" />
            <p className="text-lg leading-relaxed text-white/80 font-light">
              "우리는 코드를 파는 것이 아니라, <span className="text-neon-indigo font-bold">비즈니스의 속도</span>를 팝니다. 
              가장 아름다운 기술이 가장 강력한 기능을 수행한다고 믿습니다."
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl font-bold text-white font-mono">50+</div>
              <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-mono">98%</div>
              <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Retention</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-mono">24h</div>
              <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Response</div>
            </div>
          </div>
        </div>

        {/* Chat Style Testimonials */}
        <div className="relative space-y-6">
          <div className="absolute -inset-4 bg-neon-indigo/5 blur-3xl rounded-full" />
          
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex gap-4 bg-[#0a0a0a] border border-white/10 p-4 rounded-2xl rounded-tr-sm shadow-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <span className="font-bold text-sm text-indigo-200">{t.user}</span>
                  <span className="text-[10px] text-white/30">{t.time}</span>
                </div>
                <p className="text-sm text-white/80">{t.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
