"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

type AssessmentTier = "priority" | "growth" | "optimize";
type Industry = "b2b_sales" | "ecommerce" | "education" | "healthcare" | "manufacturing" | "other";

interface Answers {
  industry: Industry;
  teamSize: "small" | "medium" | "large";
  repeatHours: "low" | "mid" | "high";
  toolMaturity: "manual" | "partial" | "advanced";
  responseSpeed: "slow" | "normal" | "fast";
  dataReadiness: "messy" | "partly" | "clean";
}

interface AssessmentCopy {
  summary: string;
  recommendation: string;
}

const INDUSTRY_LABELS: Record<Industry, string> = {
  b2b_sales: "B2B 영업/운영",
  ecommerce: "이커머스",
  education: "교육",
  healthcare: "의료/상담",
  manufacturing: "제조/디자인",
  other: "기타",
};

const TIER_LABELS: Record<AssessmentTier, string> = {
  priority: "즉시 자동화 우선",
  growth: "핵심 병목 개선",
  optimize: "정밀 고도화",
};

const INITIAL_VALUES: Answers = {
  industry: "b2b_sales",
  teamSize: "small",
  repeatHours: "mid",
  toolMaturity: "manual",
  responseSpeed: "normal",
  dataReadiness: "partly",
};

const INDUSTRY_COPY: Record<Industry, Record<AssessmentTier, AssessmentCopy>> = {
  b2b_sales: {
    priority: {
      summary: "리드 수집/정리/리포트에서 즉시 절감 가능한 병목이 큽니다.",
      recommendation: "CRM 입력 자동화 + 주간 파이프라인 리포트 자동 생성부터 시작하세요.",
    },
    growth: {
      summary: "핵심 세일즈 운영을 자동화하면 응답 속도와 누락률을 빠르게 개선할 수 있습니다.",
      recommendation: "리드 라우팅 규칙 고도화와 후속 액션 리마인드 자동화를 우선 적용하세요.",
    },
    optimize: {
      summary: "기본 운영은 안정적이며 전환율 고도화 중심 접근이 적합합니다.",
      recommendation: "세그먼트별 제안서/메일 시퀀스 개인화 자동화를 적용해 효율을 높이세요.",
    },
  },
  ecommerce: {
    priority: {
      summary: "CS/주문/재고 관련 반복 응답 업무가 큰 비용으로 누적되는 상태입니다.",
      recommendation: "문의 분류 자동화 + 주문 상태/환불 안내 템플릿 자동응답을 먼저 구축하세요.",
    },
    growth: {
      summary: "운영 핵심은 돌아가지만 피크 타임 병목이 여전히 존재합니다.",
      recommendation: "리뷰/문의 우선순위 분류와 재고 알림 워크플로우를 연동하세요.",
    },
    optimize: {
      summary: "기초 자동화는 안정적이며 고객 경험 고도화 단계입니다.",
      recommendation: "고객 세그먼트별 리텐션 캠페인 자동화로 LTV를 개선하세요.",
    },
  },
  education: {
    priority: {
      summary: "수강/문의/운영 공지 흐름에서 반복 커뮤니케이션 비용이 큽니다.",
      recommendation: "수강 문의 접수-분류-답변 자동화와 일정 리마인드를 우선 도입하세요.",
    },
    growth: {
      summary: "핵심 과정은 운영되지만 운영자가 직접 처리하는 구간이 남아 있습니다.",
      recommendation: "코호트별 안내 발송 자동화와 학습 진행 리포트 자동화를 연결하세요.",
    },
    optimize: {
      summary: "운영 기반은 안정적이며 학습 성과 최적화 단계입니다.",
      recommendation: "수강자 행동 기반 맞춤 콘텐츠 추천 자동화를 확장하세요.",
    },
  },
  healthcare: {
    priority: {
      summary: "예약/리마인드/사후 안내에서 즉시 개선 가능한 자동화 영역이 큽니다.",
      recommendation: "예약 확인/리마인드 자동화와 반복 안내 메시지 템플릿화를 먼저 적용하세요.",
    },
    growth: {
      summary: "기본 프로세스는 있으나 응답 지연과 누락 리스크가 남아 있습니다.",
      recommendation: "채널별 문의 통합 분류와 내원 후속 안내 자동화를 고도화하세요.",
    },
    optimize: {
      summary: "운영 안정성이 높아 서비스 품질 최적화 단계로 볼 수 있습니다.",
      recommendation: "고객군별 커뮤니케이션 시나리오 자동화를 정밀 튜닝하세요.",
    },
  },
  manufacturing: {
    priority: {
      summary: "요청 접수/변경 공유/보고 체계에서 반복 커뮤니케이션 비용이 큽니다.",
      recommendation: "요청 접수 양식 표준화 + 작업 상태 보고 자동화를 우선 도입하세요.",
    },
    growth: {
      summary: "핵심 공정은 유지되지만 협업 구간의 수기 처리 비율이 높습니다.",
      recommendation: "협업 승인 플로우와 변경 이력 요약 리포트 자동화를 적용하세요.",
    },
    optimize: {
      summary: "기본 자동화가 갖춰져 있어 생산성 고도화에 집중할 단계입니다.",
      recommendation: "프로젝트별 예측 지표 대시보드와 알림 자동화를 결합하세요.",
    },
  },
  other: {
    priority: {
      summary: "반복 업무 비중이 높아 단기 ROI가 큰 자동화 과제가 우선입니다.",
      recommendation: "반복 빈도가 가장 높은 1-2개 프로세스부터 자동화해 빠른 성과를 확보하세요.",
    },
    growth: {
      summary: "핵심 병목을 먼저 자동화하면 운영 효율과 응답 속도를 빠르게 개선할 수 있습니다.",
      recommendation: "요청 접수-분류-후속 조치까지 하나의 흐름으로 연결하는 것을 권장합니다.",
    },
    optimize: {
      summary: "기존 시스템이 안정적이며, 정밀 최적화와 고도화 중심 전략이 적합합니다.",
      recommendation: "성과 지표 기반 자동화 튜닝과 예외 처리 자동화를 추가하세요.",
    },
  },
};

function scoreByAnswer(answers: Answers) {
  const scoreMap = {
    teamSize: { small: 10, medium: 20, large: 30 },
    repeatHours: { low: 10, mid: 20, high: 30 },
    toolMaturity: { manual: 30, partial: 20, advanced: 10 },
    responseSpeed: { slow: 25, normal: 15, fast: 8 },
    dataReadiness: { messy: 25, partly: 15, clean: 8 },
  } as const;

  return (
    scoreMap.teamSize[answers.teamSize] +
    scoreMap.repeatHours[answers.repeatHours] +
    scoreMap.toolMaturity[answers.toolMaturity] +
    scoreMap.responseSpeed[answers.responseSpeed] +
    scoreMap.dataReadiness[answers.dataReadiness]
  );
}

function getTier(score: number): AssessmentTier {
  if (score >= 110) {
    return "priority";
  }
  if (score >= 80) {
    return "growth";
  }
  return "optimize";
}

export default function AutomationAssessment() {
  const [answers, setAnswers] = useState<Answers>(INITIAL_VALUES);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasTrackedStart = useRef(false);

  const score = useMemo(() => scoreByAnswer(answers), [answers]);
  const tier = getTier(score);
  const assessmentCopy = INDUSTRY_COPY[answers.industry][tier];

  const contactHref = useMemo(() => {
    const params = new URLSearchParams({
      source: "assessment",
      assessmentScore: String(score),
      assessmentTier: tier,
      assessmentIndustry: INDUSTRY_LABELS[answers.industry],
      assessmentSummary: assessmentCopy.summary,
      assessmentRecommendation: assessmentCopy.recommendation,
    });
    return `/contact?${params.toString()}`;
  }, [answers.industry, assessmentCopy.recommendation, assessmentCopy.summary, score, tier]);

  const onStart = () => {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    trackEvent(ANALYTICS_EVENTS.ASSESSMENT_START, {
      section: "automation_assessment",
    });
  };

  const onSubmit = () => {
    setIsSubmitted(true);
    trackEvent(ANALYTICS_EVENTS.ASSESSMENT_COMPLETE, {
      section: "automation_assessment",
      assessment_score: score,
      assessment_tier: tier,
      assessment_industry: answers.industry,
    });
  };

  return (
    <section className="w-full py-24 px-6 bg-[#050B1B]" aria-label="자동화 우선순위 진단">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
        >
          <p className="text-neon-sky text-sm font-semibold tracking-widest uppercase mb-4">Automation Assessment</p>
          <h2 className="text-3xl font-bold text-white mb-3">우리 팀 자동화 우선순위 진단</h2>
          <p className="text-white/60 mb-8">업종 특성을 포함한 6가지 질문으로, 지금 가장 효과적인 자동화 시작점을 찾습니다.</p>

          <div className="space-y-5" onFocusCapture={onStart}>
            <label className="block">
              <span className="text-white/80 text-sm">업종</span>
              <select
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                value={answers.industry}
                onChange={(event) => setAnswers((prev) => ({ ...prev, industry: event.target.value as Industry }))}
                suppressHydrationWarning
              >
                <option value="b2b_sales">B2B 영업/운영</option>
                <option value="ecommerce">이커머스</option>
                <option value="education">교육</option>
                <option value="healthcare">의료/상담</option>
                <option value="manufacturing">제조/디자인</option>
                <option value="other">기타</option>
              </select>
            </label>

            <label className="block">
              <span className="text-white/80 text-sm">팀 규모</span>
              <select
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                value={answers.teamSize}
                onChange={(event) => setAnswers((prev) => ({ ...prev, teamSize: event.target.value as Answers["teamSize"] }))}
                suppressHydrationWarning
              >
                <option value="small">1-5명</option>
                <option value="medium">6-20명</option>
                <option value="large">21명 이상</option>
              </select>
            </label>

            <label className="block">
              <span className="text-white/80 text-sm">주간 반복 업무 시간</span>
              <select
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                value={answers.repeatHours}
                onChange={(event) => setAnswers((prev) => ({ ...prev, repeatHours: event.target.value as Answers["repeatHours"] }))}
                suppressHydrationWarning
              >
                <option value="low">5시간 미만</option>
                <option value="mid">5-20시간</option>
                <option value="high">20시간 이상</option>
              </select>
            </label>

            <label className="block">
              <span className="text-white/80 text-sm">현재 자동화 도구 활용도</span>
              <select
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                value={answers.toolMaturity}
                onChange={(event) => setAnswers((prev) => ({ ...prev, toolMaturity: event.target.value as Answers["toolMaturity"] }))}
                suppressHydrationWarning
              >
                <option value="manual">거의 수작업</option>
                <option value="partial">일부 자동화</option>
                <option value="advanced">대부분 자동화</option>
              </select>
            </label>

            <label className="block">
              <span className="text-white/80 text-sm">고객/내부 요청 평균 응답 속도</span>
              <select
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                value={answers.responseSpeed}
                onChange={(event) => setAnswers((prev) => ({ ...prev, responseSpeed: event.target.value as Answers["responseSpeed"] }))}
                suppressHydrationWarning
              >
                <option value="slow">24시간 이상</option>
                <option value="normal">4-24시간</option>
                <option value="fast">4시간 이내</option>
              </select>
            </label>

            <label className="block">
              <span className="text-white/80 text-sm">데이터 정리 상태</span>
              <select
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                value={answers.dataReadiness}
                onChange={(event) => setAnswers((prev) => ({ ...prev, dataReadiness: event.target.value as Answers["dataReadiness"] }))}
                suppressHydrationWarning
              >
                <option value="messy">산발적/수기 위주</option>
                <option value="partly">핵심 데이터만 정리</option>
                <option value="clean">체계적으로 정리됨</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            className="mt-7 w-full rounded-xl bg-gradient-to-r from-neon-sky to-cyan-400 text-[#050B1B] font-bold py-3.5"
            suppressHydrationWarning
          >
            진단 결과 보기
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="rounded-2xl border border-neon-sky/20 bg-gradient-to-br from-[#07162B] to-[#081E36] p-7 flex flex-col"
        >
          <h3 className="text-2xl font-bold text-white mb-4">진단 결과</h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-4">
            <p className="text-white/60 text-sm mb-1">자동화 우선순위 점수</p>
            <p className="text-4xl text-neon-sky font-bold">{score}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-4">
            <p className="text-white/60 text-sm mb-1">진단 기준</p>
            <p className="text-white font-semibold">{INDUSTRY_LABELS[answers.industry]}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-6">
            <p className="text-white/60 text-sm mb-1">추천 단계</p>
            <p className="text-white font-semibold text-lg">{TIER_LABELS[tier]}</p>
            <p className="text-white/70 text-sm mt-3">{assessmentCopy.summary}</p>
            <p className="text-neon-sky text-sm mt-3">권장 시나리오: {assessmentCopy.recommendation}</p>
          </div>

          <Link
            href={contactHref}
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.ASSESSMENT_TO_CONTACT, {
                section: "automation_assessment",
                assessment_score: score,
                assessment_tier: tier,
                assessment_industry: answers.industry,
              })
            }
            className="mt-auto inline-flex items-center justify-center rounded-xl border border-neon-sky/40 text-neon-sky font-semibold py-3.5 hover:bg-neon-sky/10 transition-colors"
          >
            이 결과로 문의하기
          </Link>

          {!isSubmitted && (
            <p className="text-xs text-white/40 mt-4">왼쪽 질문을 선택하면 업종별 추천 문구가 실시간으로 업데이트됩니다.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
