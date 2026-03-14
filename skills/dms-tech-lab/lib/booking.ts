const configuredBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

export const BOOKING_URL = configuredBookingUrl && configuredBookingUrl.length > 0
  ? configuredBookingUrl
  : "#contact";

export const BOOKING_COMPLETION_QUERY_KEY = "booking_status";
export const BOOKING_COMPLETION_QUERY_VALUE = "complete";

export function isExternalBookingUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}
