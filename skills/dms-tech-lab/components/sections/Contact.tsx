"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { isValidEmail, LoadingState } from "@/lib/utils";
import type { ContactForm } from "@/types/content";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

export default function Contact() {
  const [status, setStatus] = useState<LoadingState>("idle");
  const hasTrackedFormStart = useRef(false);
  const [formData, setFormData] = useState<ContactForm>({
    email: "",
    firstName: "",
    lastName: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }

    if (!formData.message.trim()) {
      alert("문의 내용을 입력해주세요.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "문의 처리 중 오류가 발생했습니다.");
      }

      trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT, {
        section: "contact",
        has_message: formData.message.trim().length > 0,
      });

      setStatus("success");
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
      });
      hasTrackedFormStart.current = false;
    } catch (error) {
      setStatus("idle");
      alert(error instanceof Error ? error.message : "문의 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    if (!hasTrackedFormStart.current && value.trim().length > 0) {
      trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_START, {
        section: "contact",
      });
      hasTrackedFormStart.current = true;
    }

    setFormData((prev: ContactForm) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 px-6 bg-[#050B1B] overflow-hidden" aria-labelledby="contact-heading">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-sky/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-sky/10 border border-neon-sky/20 mb-6">
            <Mail className="w-4 h-4 text-neon-sky" />
            <span className="text-neon-sky text-sm font-medium">Get in Touch</span>
          </div>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            프로젝트를 <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-sky to-purple-400">시작하세요</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            AI와 자동화로 비즈니스를 혁신할 준비가 되셨나요?
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-sky/20 via-purple-500/20 to-neon-sky/20 rounded-3xl blur-xl opacity-50" />

          <div
            className="relative bg-[#0A1628]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10"
            role="region"
            aria-label="문의 폼"
            onKeyDown={handleKeyDown}
          >
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-4 py-12 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">감사합니다!</h3>
                <p className="text-white/60">담당자가 24시간 내에 연락드리겠습니다.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Fields */}
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-white/80">성</label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="홍"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-neon-sky focus:bg-white/10 focus:ring-1 focus:ring-neon-sky/50 transition-all"
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-white/80">이름</label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="길동"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-neon-sky focus:bg-white/10 focus:ring-1 focus:ring-neon-sky/50 transition-all"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">이메일</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-neon-sky focus:bg-white/10 focus:ring-1 focus:ring-neon-sky/50 transition-all"
                    suppressHydrationWarning
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/80">문의 내용</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="프로젝트에 대해 알려주세요..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-neon-sky focus:bg-white/10 focus:ring-1 focus:ring-neon-sky/50 transition-all resize-none"
                    suppressHydrationWarning
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group w-full bg-gradient-to-r from-neon-sky to-cyan-400 hover:from-cyan-400 hover:to-neon-sky text-[#050B1B] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-neon-sky/20 hover:shadow-neon-sky/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  suppressHydrationWarning
                >
                  {status === "loading" ? (
                    <span className="w-5 h-5 border-2 border-[#050B1B]/30 border-t-[#050B1B] rounded-full animate-spin" />
                  ) : (
                    <>
                      문의하기
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-6 text-white/50 text-sm">
              <a
                href="mailto:reedo.dev@dmssolution.co.kr"
                className="flex items-center gap-2 hover:text-neon-sky transition-colors"
              >
                <Mail className="w-4 h-4" />
                reedo.dev@dmssolution.co.kr
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
