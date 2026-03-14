'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ServiceCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: '🧊',
      title: '3D Engineering & Product Design',
      summary: '제품 아이디어를 3D로 빠르게 구현하고 완성도를 높입니다.',
      description: '제품 디자인, 3D 모델링, 구조/조립 고려, 시각화 자료 제작까지 프로젝트 목적에 맞게 지원합니다.',
      scope: [
        '제품 디자인 & 3D 모델링',
        '컨셉/프로토타입 시각화',
        '제작/조립 관점의 설계 검토',
        '발표/제안용 렌더·이미지 제작'
      ],
      cta: '3D 프로젝트 문의',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🤖',
      title: 'AI & Automation',
      summary: '반복 업무를 AI와 자동화로 줄이고 생산성을 끌어올립니다.',
      description: '업무 흐름에 맞춰 AI 도구 연결, 문서/콘텐츠 자동화, 워크플로우 최적화를 설계합니다.',
      scope: [
        '업무 자동화(문서/정리/보고)',
        'AI 기반 콘텐츠 생성 파이프라인',
        'API 연동 및 자동화 시나리오 설계',
        '내부 툴/대시보드 구축'
      ],
      cta: '자동화 상담',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '💻',
      title: 'AI SaaS Platform',
      summary: '다양한 AI를 한곳에서 활용하는 웹 기반 SaaS를 만듭니다.',
      description: '여러 AI 기능을 하나의 웹 환경으로 통합해, 사용자가 목적에 따라 손쉽게 AI를 활용할 수 있게 설계합니다.',
      scope: [
        'AI 기능 통합(텍스트/이미지/영상/음악 등)',
        '프로젝트 기반 워크스페이스',
        '결과물 관리/버전 관리 구조',
        '팀 협업 및 권한 관리(확장 가능)'
      ],
      cta: '데모/기획 논의',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🌐',
      title: 'Custom Digital Solutions',
      summary: '사업 목적에 맞춘 맞춤형 웹/시스템을 구축합니다.',
      description: '서비스 기획부터 개발·운영까지 현실적인 목표에 맞춰 단계적으로 구현합니다.',
      scope: [
        '웹 서비스/관리자 페이지 구축',
        '데이터 구조 설계 및 운영 도구화',
        '유지보수/개선 로드맵',
        '기능 확장(모듈형)'
      ],
      cta: '맞춤 개발 문의',
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a3f] to-[#0a0a1f]" />

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-cyan-400 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Services
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            주요 서비스
          </motion.h2>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="glass-panel p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${service.color}`}>
                {service.title}
              </h3>

              {/* Summary */}
              <p className="text-lg text-white font-semibold mb-4">
                {service.summary}
              </p>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Scope */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">제공 범위</h4>
                <ul className="space-y-2">
                  {service.scope.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="mailto:Reedo.dev@dmssolution.co.kr"
                className={`inline-block px-6 py-3 rounded-lg text-base font-semibold bg-gradient-to-r ${service.color} hover:scale-105 transition-transform duration-300`}
              >
                {service.cta}
              </a>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${service.color} blur-xl -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
}
