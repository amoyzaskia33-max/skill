# 🔐 Web Security Essentials

## Purpose

Advanced security patterns untuk protect web applications dari common vulnerabilities - XSS, CSRF, injection attacks, dan security best practices.

## Level: ⭐⭐⭐ Expert

---

## 1. **XSS Prevention** 🛡️

### A. Content Security Policy (CSP)

```tsx
// Expert pattern: Strict CSP configuration
export const CSPConfig = {
  // CSP header untuk production
  contentSecurityPolicy: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Avoid if possible
      'https://trusted-cdn.com',
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com',
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:',
    ],
    'connect-src': [
      "'self'",
      'https://api.yoursite.com',
      'https://analytics.yoursite.com',
    ],
    'frame-src': ["'none'"], // Disable iframes
    'object-src': ["'none'"], // Disable Flash/plugins
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"], // Prevent clickjacking
    'upgrade-insecure-requests': [],
  },
};

// Middleware untuk Express
export const CSPMiddleware = (req, res, next) => {
  const cspHeader = Object.entries(CSPConfig.contentSecurityPolicy)
    .map(([directive, sources]) => 
      `${directive} ${sources.join(' ')}`
    )
    .join('; ');
  
  res.setHeader('Content-Security-Policy', cspHeader);
  next();
};

// Usage in Next.js (next.config.js)
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: https: blob:;
              connect-src 'self' https://api.yoursite.com;
              frame-ancestors 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s+/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};
```

---

### B. Sanitize User Input

```tsx
// Expert pattern: Multi-layer sanitization
import DOMPurify from 'dompurify';
import { escape } from 'lodash';

// Sanitize HTML content
export const sanitizeHTML = (html: string): string => {
  // Server-side sanitization
  if (typeof window === 'undefined') {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      ADD_ATTR: ['target'],
      FORCE_BODY: true,
    });
  }
  
  // Client-side sanitization
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ADD_ATTR: ['target'],
  });
};

// Sanitize for React
export const SafeHTML = ({ html }: { html: string }) => {
  const sanitized = sanitizeHTML(html);
  
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitized }}
      suppressHydrationWarning
    />
  );
};

// Sanitize URLs
export const sanitizeURL = (url: string): string => {
  try {
    const parsed = new URL(url);
    
    // Only allow http/https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '#';
    }
    
    return parsed.toString();
  } catch {
    return '#';
  }
};

// Sanitize user input for display
export const escapeHTML = (input: string): string => {
  return escape(input);
};

// Usage
const UserComment = ({ comment }) => {
  // Safe: Escaped
  const safeText = escapeHTML(comment.text);
  
  // Safe: Sanitized HTML
  const safeHTML = sanitizeHTML(comment.richText);
  
  return (
    <div>
      <p>{safeText}</p>
      <SafeHTML html={safeHTML} />
      <a href={sanitizeURL(comment.link)}>Link</a>
    </div>
  );
};
```

---

## 2. **CSRF Protection** 🔒

### A. Double Submit Cookie Pattern

```tsx
// Expert pattern: CSRF token validation
import { v4 as uuidv4 } from 'uuid';

// Generate CSRF token
export const generateCSRFToken = (): string => {
  return uuidv4();
};

// Set CSRF cookie
export const setCSRFToken = (token: string) => {
  document.cookie = `csrf_token=${token}; Path=/; Secure; SameSite=Strict`;
};

// Get CSRF token from cookie
export const getCSRFToken = (): string | null => {
  const match = document.cookie.match(/csrf_token=([^;]+)/);
  return match ? match[1] : null;
};

// CSRF-protected fetch
export const secureFetch = async (url: string, options: RequestInit = {}) => {
  const token = getCSRFToken();
  
  if (!token) {
    throw new Error('CSRF token missing');
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'X-CSRF-Token': token,
    },
    credentials: 'include', // Include cookies
  });
  
  return response;
};

// Server-side validation (Express)
export const CSRFMiddleware = (req, res, next) => {
  // Skip for GET requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  const token = req.headers['x-csrf-token'];
  const cookieToken = req.cookies.csrf_token;
  
  if (!token || !cookieToken) {
    return res.status(403).json({ error: 'CSRF token missing' });
  }
  
  if (token !== cookieToken) {
    return res.status(403).json({ error: 'CSRF token mismatch' });
  }
  
  next();
};

// Usage in React
const DeleteButton = ({ itemId }) => {
  const handleDelete = async () => {
    try {
      await secureFetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };
  
  return <button onClick={handleDelete}>Delete</button>;
};
```

---

### B. SameSite Cookie Configuration

```typescript
// Expert pattern: Secure cookie configuration
export const CookieConfig = {
  // Most secure: SameSite=Strict
  strict: {
    httpOnly: true,
    secure: true, // HTTPS only
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
  
  // Balanced: SameSite=Lax (allows top-level navigation)
  lax: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  
  // For cross-site (use with caution)
  none: {
    httpOnly: true,
    secure: true, // Required for SameSite=None
    sameSite: 'none' as const,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  },
};

// Set secure cookie
export const setSecureCookie = (
  name: string,
  value: string,
  config = CookieConfig.strict
) => {
  const cookie = `${name}=${value}; ${Object.entries(config)
    .map(([key, val]) => `${key}=${val}`)
    .join('; ')}`;
  
  document.cookie = cookie;
};

// Usage
setSecureCookie('session_id', 'abc123', CookieConfig.strict);
setSecureCookie('user_preference', 'dark_mode', CookieConfig.lax);
```

---

## 3. **Rate Limiting** 🚦

### A. Adaptive Rate Limiter

```typescript
// Expert pattern: Multi-tier rate limiting
class RateLimiter {
  private requests = new Map<string, number[]>();
  private limits = {
    anonymous: { requests: 100, window: 60 * 1000 }, // 100/min
    authenticated: { requests: 1000, window: 60 * 1000 }, // 1000/min
    admin: { requests: 10000, window: 60 * 1000 }, // 10000/min
  };
  
  checkLimit(identifier: string, tier: 'anonymous' | 'authenticated' | 'admin'): boolean {
    const now = Date.now();
    const limit = this.limits[tier];
    
    // Get request history
    const requestHistory = this.requests.get(identifier) || [];
    
    // Remove old requests
    const recentRequests = requestHistory.filter(
      timestamp => now - timestamp < limit.window
    );
    
    // Check if over limit
    if (recentRequests.length >= limit.requests) {
      return false; // Rate limited
    }
    
    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    
    return true; // Allowed
  }
  
  // Get remaining requests
  getRemaining(identifier: string, tier: string): number {
    const now = Date.now();
    const limit = this.limits[tier];
    const requestHistory = this.requests.get(identifier) || [];
    const recentRequests = requestHistory.filter(
      timestamp => now - timestamp < limit.window
    );
    
    return limit.requests - recentRequests.length;
  }
  
  // Get retry-after time
  getRetryAfter(identifier: string, tier: string): number {
    const requestHistory = this.requests.get(identifier) || [];
    const oldestRequest = Math.min(...requestHistory);
    const limit = this.limits[tier];
    
    return Math.ceil((oldestRequest + limit.window - Date.now()) / 1000);
  }
}

// Middleware usage
const rateLimiter = new RateLimiter();

export const RateLimitMiddleware = (req, res, next) => {
  const identifier = req.user?.id || req.ip; // User ID or IP
  const tier = req.user?.role || 'anonymous';
  
  if (!rateLimiter.checkLimit(identifier, tier)) {
    const retryAfter = rateLimiter.getRetryAfter(identifier, tier);
    
    res.setHeader('Retry-After', retryAfter.toString());
    res.setHeader('X-RateLimit-Limit', rateLimiter.limits[tier].requests.toString());
    res.setHeader('X-RateLimit-Remaining', '0');
    
    return res.status(429).json({
      error: 'Too many requests',
      retryAfter,
    });
  }
  
  // Set headers
  res.setHeader('X-RateLimit-Limit', rateLimiter.limits[tier].requests.toString());
  res.setHeader(
    'X-RateLimit-Remaining',
    rateLimiter.getRemaining(identifier, tier).toString()
  );
  
  next();
};
```

---

### B. API Endpoint Protection

```typescript
// Expert pattern: Different limits per endpoint
export const EndpointRateLimits = {
  '/api/auth/login': { requests: 5, window: 60 * 1000 }, // 5/min
  '/api/auth/register': { requests: 3, window: 60 * 60 * 1000 }, // 3/hour
  '/api/auth/password-reset': { requests: 3, window: 60 * 60 * 1000 }, // 3/hour
  '/api/search': { requests: 30, window: 60 * 1000 }, // 30/min
  '/api/upload': { requests: 10, window: 60 * 1000 }, // 10/min
  'default': { requests: 100, window: 60 * 1000 }, // 100/min
};

export const EndpointRateLimit = (req, res, next) => {
  const endpoint = req.path;
  const limit = EndpointRateLimits[endpoint] || EndpointRateLimits['default'];
  const identifier = req.user?.id || req.ip;
  
  const requestKey = `${identifier}:${endpoint}`;
  
  // Check limit (similar to RateLimiter above)
  // ...
  
  next();
};
```

---

## 4. **Input Validation** ✅

### A. Zod Schema Validation

```typescript
// Expert pattern: Type-safe validation with Zod
import { z } from 'zod';

// User registration schema
export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[0-9]/, 'Password must contain number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain special character'),
  name: z.string().min(1).max(100),
  age: z.number().min(18).max(120).optional(),
});

// API endpoint with validation
export const registerHandler = async (req, res) => {
  try {
    // Validate input
    const validatedData = RegisterSchema.parse(req.body);
    
    // Use validated data
    const user = await createUser(validatedData);
    
    res.json({ success: true, user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    
    throw error;
  }
};

// Nested object validation
export const ProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  categories: z.array(z.string()).min(1),
  metadata: z.record(z.string(), z.any()).optional(),
  variants: z.array(
    z.object({
      size: z.enum(['S', 'M', 'L', 'XL']),
      color: z.string(),
      stock: z.number().nonnegative(),
    })
  ),
});
```

---

### B. SQL Injection Prevention

```typescript
// Expert pattern: Parameterized queries
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ❌ BAD: Vulnerable to SQL injection
export const unsafeGetUser = async (username: string) => {
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  return prisma.$queryRawUnsafe(query);
};

// ✅ GOOD: Parameterized query
export const safeGetUser = async (username: string) => {
  return prisma.user.findUnique({
    where: { username },
  });
};

// ✅ GOOD: Raw query with parameters
export const safeRawQuery = async (username: string) => {
  return prisma.$queryRaw`
    SELECT * FROM users 
    WHERE username = ${username}
  `;
};

// Validate and sanitize search input
export const searchUsers = async (searchTerm: string) => {
  // Limit search term length
  const sanitized = searchTerm.slice(0, 100);
  
  // Escape special characters
  const escaped = sanitized.replace(/[%_]/g, '\\$&');
  
  return prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: escaped } },
        { email: { contains: escaped } },
      ],
    },
    take: 50, // Limit results
  });
};
```

---

## 5. **Security Headers** 🏷️

### A. Complete Security Headers

```typescript
// Expert pattern: All security headers
export const SecurityHeaders = {
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // Enable XSS filter
  'X-XSS-Protection': '1; mode=block',
  
  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy (formerly Feature-Policy)
  'Permissions-Policy': [
    'accelerometer=()',
    'camera=()',
    'geolocation=()',
    'gyroscope=()',
    'magnetometer=()',
    'microphone=()',
    'payment=()',
    'usb=()',
  ].join(', '),
  
  // HSTS (HTTPS enforcement)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Cross-Origin policies
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

// Next.js middleware
export const SecurityHeadersMiddleware = (req, res, next) => {
  Object.entries(SecurityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  next();
};

// Next.js config
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};
```

---

## Response Template

```markdown
🔐 **Web Security Essentials - Expert Level**

Features:
- XSS prevention (CSP, sanitization)
- CSRF protection (tokens, SameSite)
- Rate limiting (adaptive, per-endpoint)
- Input validation (Zod schemas)
- SQL injection prevention
- Security headers

Protection Against:
- XSS attacks
- CSRF attacks
- DDoS/brute force
- SQL injection
- Clickjacking
- MIME sniffing

Tools:
- DOMPurify
- Zod
- helmet
- express-rate-limit

Integration Time: 1-2 weeks
Complexity: ⭐⭐⭐ Expert
```

---

## Security Checklist

```
✅ Content Security Policy implemented
✅ Input validation on all endpoints
✅ Parameterized queries (no raw SQL)
✅ CSRF tokens for state-changing operations
✅ Rate limiting on sensitive endpoints
✅ Security headers configured
✅ HTTPS enforced (HSTS)
✅ Cookies secured (httpOnly, SameSite)
✅ Error messages don't leak information
✅ Dependencies regularly updated
```

---

**Last Updated:** Maret 2026
**Level:** Expert
**Integration Time:** 1-2 weeks
