"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
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
            <div className="w-12 h-12 rounded-xl bg-neon-sky/10 border border-neon-sky/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-neon-sky" />
            </div>
            <h1 className="text-4xl font-bold">개인정보처리방침</h1>
          </div>

          <p className="text-white/60 mb-12">
            최종 수정일: 2024년 1월 1일
          </p>

          <div className="space-y-12 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. 개인정보의 수집 및 이용 목적</h2>
              <p className="mb-4">
                DMS Solution(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>서비스 제공 및 계약의 이행</li>
                <li>회원 관리 및 본인 확인</li>
                <li>마케팅 및 광고에의 활용</li>
                <li>서비스 개선 및 신규 서비스 개발</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. 수집하는 개인정보 항목</h2>
              <p className="mb-4">회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-3">필수 수집 항목</h3>
                <ul className="list-disc pl-6 space-y-2 text-white/70">
                  <li>이메일 주소</li>
                  <li>이름 (성, 이름)</li>
                  <li>문의 내용</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. 개인정보의 보유 및 이용 기간</h2>
              <p>
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mt-4">
                <li>서비스 이용 기록: 3년</li>
                <li>문의 내역: 3년</li>
                <li>마케팅 수신 동의: 동의 철회 시까지</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. 개인정보의 제3자 제공</h2>
              <p>
                회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. 정보주체의 권리·의무 및 행사방법</h2>
              <p className="mb-4">정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리정지 요구</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. 개인정보의 안전성 확보조치</h2>
              <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mt-4">
                <li>개인정보의 암호화</li>
                <li>해킹 등에 대비한 기술적 대책</li>
                <li>개인정보에 대한 접근 제한</li>
                <li>개인정보 취급 직원의 최소화 및 교육</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. 개인정보 보호책임자</h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="mb-2"><strong className="text-white">담당자:</strong> 개인정보 보호 담당</p>
                <p><strong className="text-white">이메일:</strong> reedo.dev@dmssolution.co.kr</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. 개인정보 처리방침 변경</h2>
              <p>
                이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다. 이전의 개인정보 처리방침은 본 방침으로 대체됩니다.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
