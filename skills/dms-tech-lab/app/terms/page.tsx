"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
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
              <FileText className="w-6 h-6 text-neon-sky" />
            </div>
            <h1 className="text-4xl font-bold">이용약관</h1>
          </div>

          <p className="text-white/60 mb-12">
            최종 수정일: 2024년 1월 1일
          </p>

          <div className="space-y-12 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제1조 (목적)</h2>
              <p>
                본 약관은 DMS Solution(이하 "회사")이 제공하는 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제2조 (정의)</h2>
              <ul className="list-decimal pl-6 space-y-3 text-white/70">
                <li>
                  <strong className="text-white">"서비스"</strong>란 회사가 제공하는 AI 자동화, 바이브 코딩, 기술 교육 등 모든 관련 서비스를 의미합니다.
                </li>
                <li>
                  <strong className="text-white">"회원"</strong>이란 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 의미합니다.
                </li>
                <li>
                  <strong className="text-white">"이용계약"</strong>이란 본 약관을 포함하여 서비스 이용과 관련하여 회사와 회원 간에 체결하는 모든 계약을 의미합니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제3조 (약관의 효력 및 변경)</h2>
              <ul className="list-decimal pl-6 space-y-3 text-white/70">
                <li>본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.</li>
                <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</li>
                <li>회사가 약관을 변경할 경우에는 적용일자 및 변경사유를 명시하여 현행약관과 함께 서비스 내에 그 적용일자 7일 전부터 적용일자 전일까지 공지합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제4조 (서비스의 제공)</h2>
              <p className="mb-4">회사는 다음과 같은 서비스를 제공합니다.</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <ul className="list-disc pl-6 space-y-2 text-white/70">
                  <li>AI 및 자동화 솔루션 컨설팅</li>
                  <li>워크플로우 자동화 서비스</li>
                  <li>바이브 코딩 웹 애플리케이션 개발</li>
                  <li>기술 교육 및 트레이닝 프로그램</li>
                  <li>기타 회사가 정하는 서비스</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제5조 (서비스 이용)</h2>
              <ul className="list-decimal pl-6 space-y-3 text-white/70">
                <li>서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 운영을 원칙으로 합니다.</li>
                <li>회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스 제공화면에 공지한 바에 따릅니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제6조 (회원의 의무)</h2>
              <p className="mb-4">회원은 다음 행위를 하여서는 안 됩니다.</p>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>신청 또는 변경 시 허위 내용의 등록</li>
                <li>타인의 정보 도용</li>
                <li>회사가 게시한 정보의 변경</li>
                <li>회사 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제7조 (저작권의 귀속)</h2>
              <ul className="list-decimal pl-6 space-y-3 text-white/70">
                <li>서비스에 의해 작성된 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속됩니다.</li>
                <li>회원은 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제8조 (면책조항)</h2>
              <ul className="list-decimal pl-6 space-y-3 text-white/70">
                <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                <li>회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</li>
                <li>회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제9조 (분쟁해결)</h2>
              <p>
                회사와 회원 간에 발생한 분쟁에 관한 소송은 대한민국 법률에 따르며, 회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제10조 (기타)</h2>
              <p>
                본 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.
              </p>
            </section>

            <section className="pt-8 border-t border-white/10">
              <p className="text-white/60">
                <strong className="text-white">부칙</strong><br />
                본 약관은 2024년 1월 1일부터 시행합니다.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
