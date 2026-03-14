"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

interface HomeVariantTrackerProps {
  variant: "a" | "b";
}

export default function HomeVariantTracker({ variant }: HomeVariantTrackerProps) {
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.HOME_VARIANT_VIEW, {
      section: "home",
      variant,
    });
  }, [variant]);

  return null;
}
