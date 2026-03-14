# Analytics Event Spec

This document defines event names and recommended parameters for GA4 tracking in the homepage funnel.

## Event Names

| Event | Purpose | Required Params |
| --- | --- | --- |
| `cta_primary_click` | Primary CTA click (hero, sticky, ROI) | `section`, `label` |
| `cta_secondary_click` | Secondary CTA click (hero case-study link) | `section`, `label` |
| `roi_calculator_submit` | ROI calculator estimate action | `team_size`, `weekly_hours`, `hourly_cost`, `automation_rate`, `estimated_monthly_saving` |
| `case_study_open` | Case-study card action to contact | `case_id`, `industry` |
| `lead_magnet_download_start` | Lead magnet download click | `section`, `asset` |
| `contact_form_start` | First meaningful input in contact form | `section` |
| `contact_form_submit` | Successful contact form submit | `section`, `has_message` |
| `newsletter_form_start` | First meaningful input in newsletter form | `section` |
| `newsletter_form_submit` | Successful newsletter submit | `section` |
| `calendar_booking_start` | Booking CTA click (hero, sticky, ROI) | `section`, `destination` |
| `calendar_booking_complete` | Booking completed via callback or Calendly postMessage | `section` |

## Naming Rules

- Use snake_case for event names and parameter keys.
- Do not send personal data (email, name, message text, phone, address).
- Keep values primitive (`string`, `number`, `boolean`).

## Current Implementation Locations

- Event constants: `lib/analytics-events.ts`
- Event dispatcher: `lib/analytics.ts`
- Hero CTA: `components/sections/Hero.tsx`
- Sticky CTA: `components/sections/StickyConsultCTA.tsx`
- ROI calculator: `components/sections/ROICalculator.tsx`
- Case studies + lead magnet: `components/sections/CaseStudies.tsx`
- Contact form events: `components/sections/Contact.tsx`
- Newsletter form events: `components/sections/Newsletter.tsx`

## Booking URL Configuration

- Environment variable: `NEXT_PUBLIC_BOOKING_URL`
- If not set, booking CTAs fallback to `#contact`.
- Completion callback URL format:

```text
https://your-domain.com/?booking_status=complete
```

This triggers `calendar_booking_complete` once and removes the query parameter from the URL.
