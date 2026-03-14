"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { homeGrowthData } from "@/lib/home-growth-copy";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { BOOKING_URL, isExternalBookingUrl } from "@/lib/booking";

const isExternalBooking = isExternalBookingUrl(BOOKING_URL);

export default function CaseStudies() {
  return (
    <section className="w-full py-24 px-6 bg-deep-space relative z-10 overflow-hidden" aria-label="성공 사례">
      {/* Decorative background lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-neon-sky/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/60" />
              <h3 className="text-gold-light font-medium tracking-[0.2em] text-sm uppercase">Case Studies</h3>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-3">
              {homeGrowthData.caseStudies.title.split(' ').map((word, i) => 
                i === 0 ? <span key={i} className="text-gradient-gold italic pr-2">{word} </span> : word + ' '
              )}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl font-light tracking-wide">{homeGrowthData.caseStudies.description}</p>
          </div>

          <a
            href={BOOKING_URL}
            target={isExternalBooking ? "_blank" : undefined}
            rel={isExternalBooking ? "noreferrer" : undefined}
            onClick={() => {
              trackEvent(ANALYTICS_EVENTS.CTA_PRIMARY_CLICK, {
                section: "case_studies",
                label: "free_audit",
              });
              trackEvent(ANALYTICS_EVENTS.CALENDAR_BOOKING_START, {
                section: "case_studies",
                destination: isExternalBooking ? "external" : "onsite",
              });
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gold/30 text-white hover:bg-gold hover:text-deep-space transition-all duration-300 font-medium"
          >
            무료 15분 진단 예약
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeGrowthData.caseStudies.items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-8 glass-panel rounded-3xl group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider bg-gold/10 text-gold-light border border-gold/20 mb-6 uppercase">
                  <Sparkles className="w-3 h-3" />
                  {item.industry}
                </span>
                
                <h3 className="text-2xl font-playfair font-bold text-white mb-6 group-hover:text-gold-light transition-colors">{item.title}</h3>

                <div className="space-y-4 mb-8">
                  <div className="rounded-2xl border border-white/5 bg-black/40 p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-white/20" />
                    <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-2">Before</p>
                    <p className="text-white/70 font-light text-sm leading-relaxed">{item.before}</p>
                  </div>
                  
                  <div className="rounded-2xl border border-gold/20 bg-gold/5 p-5 relative overflow-hidden backdrop-blur-sm shadow-[0_4px_20px_rgba(212,175,55,0.05)]">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold to-gold-light" />
                    <p className="text-gold-light text-xs font-medium uppercase tracking-widest mb-2">After</p>
                    <p className="text-white/95 font-light text-sm leading-relaxed">{item.after}</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {item.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-3 text-white/70 text-sm font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-light mt-1.5 shrink-0" />
                      <span className="leading-snug">{metric}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  onClick={() =>
                    trackEvent(ANALYTICS_EVENTS.CASE_STUDY_OPEN, {
                      case_id: item.id,
                      industry: item.industry,
                    })
                  }
                  className="inline-flex items-center gap-2 text-gold font-semibold hover:text-white transition-colors"
                >
                  내 상황에 적용하기
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Lead Magnet Banner */}
        <div className="mt-16 rounded-3xl glass-bento p-8 md:p-12 pl-12 border border-gold/10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-sky/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-xl">
            <h4 className="text-3xl font-playfair font-bold text-white mb-3">
              {homeGrowthData.leadMagnet.title.replace('무료', '').trim()} <span className="text-gradient-gold italic pr-1">Free Guide</span>
            </h4>
            <p className="text-white/60 font-light tracking-wide text-lg">{homeGrowthData.leadMagnet.description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0">
            <a
              href={homeGrowthData.leadMagnet.downloadPath}
              download
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.LEAD_MAGNET_DOWNLOAD_START, {
                  section: "lead_magnet_banner",
                  asset: homeGrowthData.leadMagnet.downloadPath,
                })
              }
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-deep-space transition-all duration-300"
            >
              원페이지 요약 다운로드
            </a>
            <a
              href={BOOKING_URL}
              target={isExternalBooking ? "_blank" : undefined}
              rel={isExternalBooking ? "noreferrer" : undefined}
              onClick={() => {
                trackEvent(ANALYTICS_EVENTS.CTA_PRIMARY_CLICK, {
                  section: "lead_magnet_banner",
                  label: "free_audit",
                });
                trackEvent(ANALYTICS_EVENTS.CALENDAR_BOOKING_START, {
                  section: "lead_magnet_banner",
                  destination: isExternalBooking ? "external" : "onsite",
                });
              }}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-deep-space font-semibold hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                무료 15분 진단 예약
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:text-gold transition-all" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
