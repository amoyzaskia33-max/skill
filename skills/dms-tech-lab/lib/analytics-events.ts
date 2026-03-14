export const ANALYTICS_EVENTS = {
  CTA_PRIMARY_CLICK: "cta_primary_click",
  CTA_SECONDARY_CLICK: "cta_secondary_click",
  ROI_CALCULATOR_SUBMIT: "roi_calculator_submit",
  CASE_STUDY_OPEN: "case_study_open",
  LEAD_MAGNET_DOWNLOAD_START: "lead_magnet_download_start",
  CONTACT_FORM_START: "contact_form_start",
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  NEWSLETTER_FORM_START: "newsletter_form_start",
  NEWSLETTER_FORM_SUBMIT: "newsletter_form_submit",
  ASSESSMENT_START: "assessment_start",
  ASSESSMENT_COMPLETE: "assessment_complete",
  ASSESSMENT_TO_CONTACT: "assessment_to_contact",
  CONTENT_TEASER_CLICK: "content_teaser_click",
  TESTIMONIAL_FILTER_SELECT: "testimonial_filter_select",
  HOME_VARIANT_VIEW: "home_variant_view",
  CALENDAR_BOOKING_START: "calendar_booking_start",
  CALENDAR_BOOKING_COMPLETE: "calendar_booking_complete",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
