import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://example.com",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "mock",
});

// Create rate limiter with sliding window algorithm
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
  analytics: true,
});

export const authRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "60 s"), // Increased to 60 requests per 60 seconds
  analytics: true,
});

export const apiRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "60 s"), // 20 requests per 60 seconds
  analytics: true,
});

// Fallback rate limiter for when Redis is not configured (memory-based)
export const memoryRatelimit = {
  requests: new Map<string, number[]>(),
  check: async (identifier: string, limit: number, window: number) => {
    const now = Date.now();
    const requests = memoryRatelimit.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = requests.filter((time) => time > now - window * 1000);

    if (validRequests.length >= limit) {
      return { success: false, limit, remaining: 0, reset: now };
    }

    validRequests.push(now);
    memoryRatelimit.requests.set(identifier, validRequests);

    return {
      success: true,
      limit,
      remaining: limit - validRequests.length,
      reset: now + window * 1000,
    };
  },
};

// Get appropriate rate limiter based on configuration
export async function checkRateLimit(
  identifier: string,
  type: "general" | "auth" | "api" = "general"
) {
  // If Redis is configured, use it
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const limiter = type === "auth" ? authRatelimit : type === "api" ? apiRatelimit : ratelimit;
    return await limiter.limit(identifier);
  }

  // Fallback to memory-based rate limiting
  const limits = {
    general: { limit: 10, window: 10 },
    auth: { limit: 5, window: 60 },
    api: { limit: 20, window: 60 },
  };

  const { limit, window } = limits[type];
  return await memoryRatelimit.check(identifier, limit, window);
}
