import type { AnalyticsEventName } from "@/lib/analytics-events";

type AnalyticsValue = string | number | boolean;

export type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: "event", eventName: string, params?: Record<string, unknown>) => void;
  }
}

export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}
