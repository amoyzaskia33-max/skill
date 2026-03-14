"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const hasTrackedStart = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error();

      trackEvent(ANALYTICS_EVENTS.NEWSLETTER_FORM_SUBMIT, {
        section: "newsletter",
      });

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="w-full py-24 px-6 bg-[#050B1B] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-neon-sky/10 via-purple-500/10 to-neon-sky/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-sky/10 border border-neon-sky/20 mb-6">
            <Sparkles className="w-4 h-4 text-neon-sky" />
            <span className="text-neon-sky text-sm font-medium">Newsletter</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            최신 인사이트를 <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-sky to-purple-400">받아보세요</span>
          </h2>
          <p className="text-white/50 mb-8 text-lg">
            AI, 자동화, 기술 트렌드에 대한 깊이 있는 글을 이메일로 전달합니다.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 py-4 text-green-400"
            >
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-medium text-lg">구독이 완료되었습니다! 감사합니다 🎉</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const nextValue = e.target.value;
                    if (!hasTrackedStart.current && nextValue.trim().length > 0) {
                      trackEvent(ANALYTICS_EVENTS.NEWSLETTER_FORM_START, {
                        section: "newsletter",
                      });
                      hasTrackedStart.current = true;
                    }
                    setEmail(nextValue);
                  }}
                  placeholder="name@email.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-neon-sky focus:ring-1 focus:ring-neon-sky/50 transition-all"
                  suppressHydrationWarning
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="group px-8 py-4 bg-gradient-to-r from-neon-sky to-cyan-400 hover:from-cyan-400 hover:to-neon-sky text-[#050B1B] font-bold rounded-xl transition-all shadow-lg shadow-neon-sky/20 hover:shadow-neon-sky/40 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                suppressHydrationWarning
              >
                {status === "loading" ? (
                  <span className="w-5 h-5 border-2 border-[#050B1B]/30 border-t-[#050B1B] rounded-full animate-spin" />
                ) : (
                  <>
                    구독하기
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-red-400 text-sm mt-3">구독 중 오류가 발생했습니다. 다시 시도해주세요.</p>
          )}

          <p className="text-white/30 text-xs mt-4">스팸은 보내지 않습니다. 언제든 구독 해지 가능합니다.</p>
        </motion.div>
      </div>
    </section>
  );
}
