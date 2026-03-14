'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

interface AssessmentPrefill {
  source?: string;
  assessmentScore?: string;
  assessmentTier?: string;
  assessmentIndustry?: string;
  assessmentSummary?: string;
  assessmentRecommendation?: string;
}

interface ContactMainSectionProps {
  assessmentPrefill?: AssessmentPrefill;
}

const inquiryTypes = [
  '서비스 문의',
  'SaaS·앱 제휴',
  '3D·디자인 프로젝트',
  '자동화·개발 의뢰',
  '기타',
];

const budgetRanges = [
  '500만원 미만',
  '500만원 ~ 1,000만원',
  '1,000만원 ~ 3,000만원',
  '3,000만원 ~ 5,000만원',
  '5,000만원 이상',
  '미정 / 협의 필요',
];

export default function ContactMainSection({ assessmentPrefill }: ContactMainSectionProps) {
  const prefill = useMemo(() => {
    const source = assessmentPrefill?.source;
    if (source !== 'assessment') {
      return { inquiryType: '', message: '' };
    }

    const assessmentScore = assessmentPrefill?.assessmentScore || '';
    const assessmentTier = assessmentPrefill?.assessmentTier || '';
    const assessmentIndustry = assessmentPrefill?.assessmentIndustry || '';
    const assessmentSummary = assessmentPrefill?.assessmentSummary || '';
    const assessmentRecommendation = assessmentPrefill?.assessmentRecommendation || '';

    if (!assessmentScore && !assessmentTier && !assessmentIndustry && !assessmentSummary && !assessmentRecommendation) {
      return { inquiryType: '', message: '' };
    }

    const summaryLines = [
      '[자동화 우선순위 진단 결과]',
      assessmentScore ? `- 점수: ${assessmentScore}` : '',
      assessmentTier ? `- 단계: ${assessmentTier}` : '',
      assessmentIndustry ? `- 업종: ${assessmentIndustry}` : '',
      assessmentSummary ? `- 요약: ${assessmentSummary}` : '',
      assessmentRecommendation ? `- 권장 시나리오: ${assessmentRecommendation}` : '',
      '',
      '위 진단 결과를 바탕으로 초기 도입 범위와 예상 ROI를 상담받고 싶습니다.',
    ].filter(Boolean);

    return {
      inquiryType: '자동화·개발 의뢰',
      message: summaryLines.join('\n'),
    };
  }, [assessmentPrefill]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:reedo.dev@dmssolution.co.kr';
  };

  return (
    <section className="relative py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info Card - Left Side */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-panel rounded-2xl p-8 h-full">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Info</h2>
              
              {/* Email */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-neon-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-400 text-sm">이메일</span>
                </div>
                <a 
                  href="mailto:reedo.dev@dmssolution.co.kr"
                  className="text-white hover:text-neon-sky transition-colors font-mono text-lg"
                >
                  reedo.dev@dmssolution.co.kr
                </a>
              </div>

              {/* Response Time */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-400 text-sm">응답 시간</span>
                </div>
                <p className="text-white text-lg">영업일 기준 1~2일</p>
              </div>

              {/* Inquiry Tags */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <span className="text-gray-400 text-sm">문의 유형</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {inquiryTypes.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-gray-300"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Email Button */}
              <motion.button
                onClick={handleEmailClick}
                className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-neon-sky to-cyan-400 text-[#050B1B] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                이메일로 바로 문의하기
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Form Card - Right Side */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-panel rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">문의하기</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">이름 *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-neon-sky focus:outline-none focus:ring-1 focus:ring-neon-sky/50 transition-all"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">이메일 *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-neon-sky focus:outline-none focus:ring-1 focus:ring-neon-sky/50 transition-all"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">회사 / 팀</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-neon-sky focus:outline-none focus:ring-1 focus:ring-neon-sky/50 transition-all"
                    placeholder="(선택) 소속 회사 또는 팀명"
                  />
                </div>

                {/* Inquiry Type & Budget Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">문의 유형 *</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType || prefill.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-neon-sky focus:outline-none focus:ring-1 focus:ring-neon-sky/50 transition-all appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em' }}
                    >
                      <option value="" className="bg-[#050B1B]">선택해 주세요</option>
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#050B1B]">{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">예산 범위</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-neon-sky focus:outline-none focus:ring-1 focus:ring-neon-sky/50 transition-all appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em' }}
                    >
                      <option value="" className="bg-[#050B1B]">(선택) 예산 범위</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-[#050B1B]">{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">희망 일정</label>
                  <input
                    type="text"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-neon-sky focus:outline-none focus:ring-1 focus:ring-neon-sky/50 transition-all"
                    placeholder="(선택) 예: 2024년 3월까지, 최대한 빨리 등"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">문의 내용 *</label>
                    <textarea
                      name="message"
                      value={formData.message || prefill.message}
                      onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-neon-sky focus:outline-none focus:ring-1 focus:ring-neon-sky/50 transition-all resize-none"
                    placeholder="프로젝트에 대해 자세히 알려주세요. 목적, 기능, 참고 사례 등을 포함해 주시면 더욱 정확한 답변이 가능합니다."
                  />
                </div>

                {/* Privacy Notice */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">
                    <span className="text-neon-sky">*</span> 입력하신 정보는 문의 답변 목적으로만 사용되며, 답변 완료 후 안전하게 삭제됩니다.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-neon-sky to-cyan-400 text-[#050B1B] font-semibold hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    문의 보내기
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleEmailClick}
                    className="glass-button px-6 py-4 rounded-xl text-gray-300 font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    이메일
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
