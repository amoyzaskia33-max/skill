"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "자동화 도입 비용은 어느 정도인가요?",
    answer: "프로젝트의 규모와 복잡도에 따라 다르지만, 소규모 워크플로우 자동화는 월 5만원 수준부터 시작 가능합니다. 무료 상담을 통해 정확한 견적을 제공해드립니다.",
  },
  {
    question: "기술적 배경 없이도 자동화를 도입할 수 있나요?",
    answer: "네, 물론입니다. 저희가 설계부터 구축, 운영까지 전 과정을 지원합니다. N8N 등의 도구는 코드 없이도 사용 가능하며, 맞춤형 교육도 함께 제공합니다.",
  },
  {
    question: "교육 커리큘럼은 어떻게 구성되나요?",
    answer: "GenAI 기초, 프롬프트 엔지니어링, N8N 워크플로우 자동화, AI Agent 구축 등 실무 중심의 커리큘럼으로 구성됩니다. 기업의 필요에 맞춰 맞춤형으로 조정 가능합니다.",
  },
  {
    question: "프로젝트 진행 기간은 어느 정도 걸리나요?",
    answer: "간단한 워크플로우 자동화는 1~2주, 복합적인 시스템 구축은 4~8주 정도 소요됩니다. 초기 상담 시 상세 일정을 안내드립니다.",
  },
  {
    question: "원격으로도 서비스를 받을 수 있나요?",
    answer: "네, 모든 서비스는 원격으로 진행 가능합니다. 화상 미팅, 원격 교육, 온라인 협업 도구를 활용하여 전국 어디서든 동일한 품질의 서비스를 제공합니다.",
  },
  {
    question: "구축 후 유지보수는 어떻게 되나요?",
    answer: "프로젝트 완료 후 1개월 무상 유지보수를 제공하며, 이후에는 월정액 유지보수 계약을 통해 지속적인 관리와 업데이트를 받으실 수 있습니다.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200 group"
        aria-expanded={isOpen}
        suppressHydrationWarning
      >
        <span className="text-white font-medium text-lg pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-neon-sky flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 py-5 text-white/60 leading-relaxed text-base">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="w-full py-24 px-6 bg-[#050B1B] relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-sky/10 border border-neon-sky/20 mb-6">
            <HelpCircle className="w-4 h-4 text-neon-sky" />
            <span className="text-neon-sky text-sm font-medium">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            자주 묻는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-sky to-purple-400">질문</span>
          </h2>
          <p className="text-white/50 text-lg">
            궁금한 점이 있으시면 언제든지 문의해주세요.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </div>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
