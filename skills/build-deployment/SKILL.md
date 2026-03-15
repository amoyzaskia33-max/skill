# 📦 Build & Deployment

## Purpose

Production-ready build optimization, CI/CD pipelines, Docker containerization, monitoring, dan deployment strategies untuk modern web applications.

## Level: ⭐⭐⭐ Expert

---

## 1. **Build Optimization** ⚡

### A. Next.js Production Build

```typescript
// Expert pattern: Optimized Next.js configuration
// next.config.js

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // React strict mode for testing
  reactStrictMode: true,
  
  // Disable X-Powered-By header
  poweredByHeader: false,
  
  // Compress responses
  compress: true,
  
  // Image optimization
  images: {
    domains: ['cdn.example.com', 'images.example.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Webpack optimization
  webpack: (config, { isServer, dev, webpack }) => {
    // Tree shaking
    config.optimization.usedExports = true;
    config.optimization.sideEffects = true;
    
    // Remove console.logs in production
    if (!dev) {
      config.optimization.minimizer.push(
        new webpack.optimize.MinChunkSizePlugin({
          minChunkSize: 100000,
        })
      );
    }
    
    // Split chunks
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            chunks: 'all',
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            priority: 30,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // Headers for security & caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
```

---

### B. Docker Multi-Stage Build

```dockerfile
# Expert pattern: Optimized Docker build
# Production Dockerfile

# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production --ignore-scripts

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ANALYTICS_ID

ENV NEXT_TELEMETRY_DISABLED=1

# Build application
RUN npm run build

# Stage 3: Runner (production image)
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

---

### C. Docker Compose for Development

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=myapp
    ports:
      - "5432:5432"
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
  
  # Monitoring
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
  
  grafana:
    image: grafana/grafana:latest
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3001:3000"
    depends_on:
      - prometheus

volumes:
  postgres_data:
  redis_data:
  prometheus_data:
  grafana_data:
```

---

## 2. **CI/CD Pipeline** 🔄

### A. GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # Lint & Type Check
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  # Tests
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          PLAYWRIGHT_BROWSERS_PATH: 0
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  # Build
  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next/

  # Docker build & push
  docker:
    runs-on: ubuntu-latest
    needs: [build]
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: .next/
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha
            type=ref,event=branch
            latest
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # Deploy to production
  deploy:
    runs-on: ubuntu-latest
    needs: [docker]
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://myapp.com
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Kubernetes
        uses: azure/k8s-deploy@v4
        with:
          namespace: production
          manifests: |
            k8s/deployment.yaml
            k8s/service.yaml
          images: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
```

---

### B. Deployment Strategies

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: ghcr.io/myorg/myapp:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: production
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: myapp-secrets
                  key: database-url
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /api/ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
  namespace: production
spec:
  selector:
    app: myapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
  namespace: production
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
    - hosts:
        - myapp.com
        - www.myapp.com
      secretName: myapp-tls
  rules:
    - host: myapp.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myapp
                port:
                  number: 80
```

---

## 3. **Monitoring & Observability** 📊

### A. Application Monitoring

```typescript
// Expert pattern: Comprehensive monitoring
import * as Sentry from '@sentry/nextjs';
import { Metrics } from '@vercel/functions';

// Sentry initialization
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.2, // 20% of transactions
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of errors
  integrations: [
    new Sentry.Replay(),
    new Sentry.BrowserTracing(),
  ],
});

// Custom metrics
const metrics = new Metrics();

export function trackPageView(page: string) {
  metrics.gauge('page.views', 1, { page });
}

export function trackApiLatency(endpoint: string, latency: number) {
  metrics.histogram('api.latency', latency, { endpoint });
}

export function trackError(error: Error, context: any) {
  Sentry.captureException(error, {
    tags: context,
  });
  metrics.increment('errors.total', 1, { type: error.name });
}

// Performance monitoring
export function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  
  return fn().finally(() => {
    const duration = performance.now() - start;
    trackApiLatency(name, duration);
  });
}

// Usage in API route
export default async function handler(req, res) {
  const endTimer = Sentry.startTransaction({
    name: `API ${req.method} ${req.url}`,
    op: 'http.server',
  });
  
  try {
    return await measurePerformance('getUser', async () => {
      const user = await getUser(req.query.id);
      return res.json(user);
    });
  } catch (error) {
    trackError(error as Error, {
      endpoint: req.url,
      method: req.method,
    });
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    endTimer.finish();
  }
}
```

---

### B. Logging Strategy

```typescript
// Expert pattern: Structured logging
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    env: process.env.NODE_ENV,
    service: 'myapp',
  },
});

// Structured logging
export function logInfo(message: string, context?: any) {
  logger.info({ ...context }, message);
}

export function logError(error: Error, context?: any) {
  logger.error(
    {
      ...context,
      err: {
        message: error.message,
        stack: error.stack,
        code: (error as any).code,
      },
    },
    error.message
  );
}

export function logWarn(message: string, context?: any) {
  logger.warn({ ...context }, message);
}

// Request logging middleware
export function requestLogger(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logInfo('HTTP request', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
  });
  
  next();
}

// Usage
logInfo('User created', {
  userId: user.id,
  email: user.email,
  source: 'registration',
});

logError(new Error('Database connection failed'), {
  database: 'users',
  retryCount: 3,
});
```

---

## Response Template

```markdown
📦 **Build & Deployment - Expert Level**

Features:
- Next.js production build optimization
- Docker multi-stage builds
- CI/CD with GitHub Actions
- Kubernetes deployment
- Monitoring (Sentry, metrics)
- Structured logging

Deployment Strategies:
- Rolling updates
- Blue-green deployment
- Canary releases
- Auto-scaling

Monitoring:
- Error tracking (Sentry)
- Performance metrics
- Request logging
- Health checks

Tools:
- Docker & Docker Compose
- Kubernetes
- GitHub Actions
- Sentry
- Prometheus & Grafana
- Pino (logging)

Integration Time: 3-4 weeks
Complexity: ⭐⭐⭐ Expert
```

---

## Deployment Checklist

```
✅ Build optimization (tree shaking, code splitting)
✅ Docker multi-stage build
✅ CI/CD pipeline (lint, test, build, deploy)
✅ Health check endpoints
✅ Monitoring & alerting setup
✅ Structured logging
✅ Error tracking (Sentry)
✅ Performance monitoring
✅ Security headers configured
✅ SSL/TLS enabled
✅ CDN for static assets
✅ Database backups configured
✅ Rollback strategy documented
✅ Runbook for incidents
```

---

**Last Updated:** Maret 2026
**Level:** Expert
**Integration Time:** 3-4 weeks
