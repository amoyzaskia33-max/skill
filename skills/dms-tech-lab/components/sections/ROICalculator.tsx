"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { homeGrowthData } from "@/lib/home-growth-copy";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { BOOKING_URL, isExternalBookingUrl } from "@/lib/booking";

const isExternalBooking = isExternalBookingUrl(BOOKING_URL);

const INITIAL_VALUES = {
  teamSize: 4,
  weeklyHours: 18,
  hourlyCost: 35000,
  automationRate: 35,
};

function formatKrw(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState<number>(INITIAL_VALUES.teamSize);
  const [weeklyHours, setWeeklyHours] = useState<number>(INITIAL_VALUES.weeklyHours);
  const [hourlyCost, setHourlyCost] = useState<number>(INITIAL_VALUES.hourlyCost);
  const [automationRate, setAutomationRate] = useState<number>(INITIAL_VALUES.automationRate);

  const estimate = useMemo(() => {
    const monthlyHours = weeklyHours * teamSize * 4.33;
    const monthlySavedHours = monthlyHours * (automationRate / 100);
    const monthlySavedCost = monthlySavedHours * hourlyCost;
    const annualSavedCost = monthlySavedCost * 12;

    return {
      monthlySavedHours,
      monthlySavedCost,
      annualSavedCost,
      yearlyFte: monthlySavedHours * 12 / 2080,
    };
  }, [automationRate, hourlyCost, teamSize, weeklyHours]);

  return (
    <section id="roi-calculator" className="w-full py-20 px-6 bg-[#050B1B] relative" aria-label="ROI 계산기">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-sky/10 border border-neon-sky/20 mb-5">
            <Calculator className="w-4 h-4 text-neon-sky" />
            <span className="text-neon-sky text-sm font-medium">ROI Calculator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{homeGrowthData.roiCalculator.title}</h2>
          <p className="text-white/60 leading-relaxed mb-8">{homeGrowthData.roiCalculator.description}</p>

          <div className="space-y-5">
            <label className="block">
              <span className="text-white/70 text-sm">팀 인원 (명)</span>
              <input
                type="number"
                min={1}
                value={teamSize}
                onChange={(event) => setTeamSize(Number(event.target.value) || 1)}
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon-sky"
                suppressHydrationWarning
              />
            </label>

            <label className="block">
              <span className="text-white/70 text-sm">주간 반복 업무 시간 (시간)</span>
              <input
                type="number"
                min={1}
                value={weeklyHours}
                onChange={(event) => setWeeklyHours(Number(event.target.value) || 1)}
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon-sky"
                suppressHydrationWarning
              />
            </label>

            <label className="block">
              <span className="text-white/70 text-sm">평균 시급 (원)</span>
              <input
                type="number"
                min={10000}
                step={1000}
                value={hourlyCost}
                onChange={(event) => setHourlyCost(Number(event.target.value) || 10000)}
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon-sky"
                suppressHydrationWarning
              />
            </label>

            <label className="block">
              <span className="text-white/70 text-sm">자동화 가능 비율 ({automationRate}%)</span>
              <input
                type="range"
                min={10}
                max={80}
                value={automationRate}
                onChange={(event) => setAutomationRate(Number(event.target.value))}
                className="mt-3 w-full accent-neon-sky"
                suppressHydrationWarning
              />
            </label>

            <button
              type="button"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.ROI_CALCULATOR_SUBMIT, {
                  team_size: teamSize,
                  weekly_hours: weeklyHours,
                  hourly_cost: hourlyCost,
                  automation_rate: automationRate,
                  estimated_monthly_saving: Math.round(estimate.monthlySavedCost),
                })
              }
              className="w-full rounded-xl bg-gradient-to-r from-neon-sky to-cyan-400 text-[#050B1B] font-bold py-3.5"
              suppressHydrationWarning
            >
              {homeGrowthData.roiCalculator.primaryButtonLabel}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-3xl border border-neon-sky/20 bg-gradient-to-br from-[#07162B] to-[#081E36] p-8 flex flex-col"
        >
          <h3 className="text-2xl font-bold text-white mb-6">예상 절감 효과</h3>

          <div className="space-y-4 mb-8">
            <div className="rounded-xl bg-white/5 p-5 border border-white/10">
              <p className="text-white/60 text-sm mb-1">월 절감 시간</p>
              <p className="text-3xl font-bold text-neon-sky">{estimate.monthlySavedHours.toFixed(1)}h</p>
            </div>
            <div className="rounded-xl bg-white/5 p-5 border border-white/10">
              <p className="text-white/60 text-sm mb-1">월 절감 비용</p>
              <p className="text-3xl font-bold text-neon-sky">{formatKrw(estimate.monthlySavedCost)}</p>
            </div>
            <div className="rounded-xl bg-white/5 p-5 border border-white/10">
              <p className="text-white/60 text-sm mb-1">연간 절감 비용</p>
              <p className="text-3xl font-bold text-neon-sky">{formatKrw(estimate.annualSavedCost)}</p>
            </div>
            <div className="rounded-xl bg-white/5 p-5 border border-white/10">
              <p className="text-white/60 text-sm mb-1">연간 확보 인력(FTE)</p>
              <p className="text-3xl font-bold text-neon-sky">{estimate.yearlyFte.toFixed(2)}명</p>
            </div>
          </div>

          <a
            href={BOOKING_URL}
            target={isExternalBooking ? "_blank" : undefined}
            rel={isExternalBooking ? "noreferrer" : undefined}
            onClick={() => {
              trackEvent(ANALYTICS_EVENTS.CTA_PRIMARY_CLICK, {
                section: "roi_calculator",
                label: "contact_with_estimate",
              });
              trackEvent(ANALYTICS_EVENTS.CALENDAR_BOOKING_START, {
                section: "roi_calculator",
                destination: isExternalBooking ? "external" : "onsite",
              });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neon-sky/40 text-neon-sky font-semibold py-3.5 hover:bg-neon-sky/10 transition-colors"
          >
            {homeGrowthData.roiCalculator.secondaryButtonLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
