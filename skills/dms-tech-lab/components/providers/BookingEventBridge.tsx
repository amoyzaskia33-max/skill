"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import {
  BOOKING_COMPLETION_QUERY_KEY,
  BOOKING_COMPLETION_QUERY_VALUE,
} from "@/lib/booking";

function isCalendlyScheduledEvent(data: unknown) {
  if (!data || typeof data !== "object") {
    return false;
  }

  const event = (data as { event?: unknown }).event;
  return event === "calendly.event_scheduled";
}

export default function BookingEventBridge() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const bookingStatus = url.searchParams.get(BOOKING_COMPLETION_QUERY_KEY);

    if (bookingStatus === BOOKING_COMPLETION_QUERY_VALUE) {
      trackEvent(ANALYTICS_EVENTS.CALENDAR_BOOKING_COMPLETE, {
        section: "url_callback",
      });

      url.searchParams.delete(BOOKING_COMPLETION_QUERY_KEY);
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }

    const onMessage = (event: MessageEvent<unknown>) => {
      if (!isCalendlyScheduledEvent(event.data)) {
        return;
      }

      trackEvent(ANALYTICS_EVENTS.CALENDAR_BOOKING_COMPLETE, {
        section: "calendly_embed",
      });
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
