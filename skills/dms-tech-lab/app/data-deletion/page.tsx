"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Trash2, Mail } from "lucide-react";

export default function DataDeletionPage() {
  return (
    <main className="w-full min-h-screen bg-[#050B1B] text-white font-poppins selection:bg-neon-sky selection:text-[#050B1B] relative">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="inline-flex items-center text-white/60 hover:text-neon-sky mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            홈으로 돌아가기
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <h1 className="text-4xl font-bold">데이터 삭제 요청</h1>
          </div>

          <p className="text-white/60 mb-12">
            DMS Solution은 사용자의 개인정보 보호를 중요하게 생각합니다.
          </p>

          <div className="space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-4">삭제 요청 방법</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                아래 이메일로 데이터 삭제를 요청하실 수 있습니다.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-neon-sky" />
                  <span className="text-white/60">이메일:</span>
                  <a href="mailto:reedo.dev@gmail.com?subject=[데이터 삭제 요청]" className="text-neon-sky hover:underline">
                    reedo.dev@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-white/60 shrink-0 mt-0.5">제목:</span>
                  <span className="text-white font-medium">[데이터 삭제 요청]</span>
                </div>
              </div>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-4">처리 절차</h2>
              <p className="text-white/70 leading-relaxed">
                요청 접수 후 확인 절차를 거쳐 처리 결과를 회신합니다.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
