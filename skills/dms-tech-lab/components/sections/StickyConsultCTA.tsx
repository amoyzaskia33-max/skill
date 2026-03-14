"use client";

import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { BOOKING_URL, isExternalBookingUrl } from "@/lib/booking";

const isExternalBooking = isExternalBookingUrl(BOOKING_URL);

export default function StickyConsultCTA() {
  return (
    <a
      href={BOOKING_URL}
      target={isExternalBooking ? "_blank" : undefined}
      rel={isExternalBooking ? "noreferrer" : undefined}
      onClick={() => {
        trackEvent(ANALYTICS_EVENTS.CTA_PRIMARY_CLICK, {
          section: "sticky_cta",
          label: "free_audit",
        });
        trackEvent(ANALYTICS_EVENTS.CALENDAR_BOOKING_START, {
          section: "sticky_cta",
          destination: isExternalBooking ? "external" : "onsite",
        });
      }}
      className="fixed z-50 bottom-6 right-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-neon-sky to-cyan-400 text-[#050B1B] font-bold shadow-xl shadow-neon-sky/25 hover:shadow-neon-sky/40 transition-all hover:-translate-y-0.5"
      aria-label="무료 15분 진단 예약"
    >
      <MessageCircle className="w-4 h-4" />
      무료 15분 진단 예약
    </a>
  );
}
