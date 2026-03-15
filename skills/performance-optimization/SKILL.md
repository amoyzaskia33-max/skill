# ⚡ Performance Optimization

## Purpose

Advanced patterns untuk optimize web performance - dari lazy loading, code splitting, caching, hingga Core Web Vitals optimization.

## Level: ⭐⭐⭐ Expert

---

## 1. **Advanced Lazy Loading** 🦥

### A. Intersection Observer dengan Preloading

```tsx
// Expert pattern: Lazy load dengan smart preloading
import { useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  preloadOffset?: number; // Preload before visible
}

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  placeholder = <div className="animate-pulse bg-gray-200" />,
  rootMargin = '0px',
  threshold = 0,
  preloadOffset = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Start preloading when element is near viewport
        if (entry.isIntersecting && !hasLoaded) {
          // Preload resources
          preloadResources();
          setHasLoaded(true);
        }
        
        // Show when actually visible
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        rootMargin,
        threshold,
        root: null,
      }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, [hasLoaded, rootMargin, threshold]);
  
  const preloadResources = async () => {
    // Preload images
    const images = elementRef.current?.querySelectorAll('img[data-src]');
    images?.forEach(img => {
      const dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = dataSrc;
        document.head.appendChild(link);
      }
    });
    
    // Preload fonts
    const fonts = elementRef.current?.querySelectorAll('[data-font]');
    fonts?.forEach(font => {
      const fontUrl = font.getAttribute('data-font');
      if (fontUrl) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.href = fontUrl;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  };
  
  return (
    <div ref={elementRef} style={{ minHeight: '100px' }}>
      {isVisible ? children : placeholder}
    </div>
  );
};

// Usage
<LazyLoad 
  rootMargin="200px" // Start loading 200px before visible
  placeholder={<Skeleton />}
>
  <HeavyComponent />
  <img data-src="/heavy-image.jpg" alt="Lazy loaded" />
</LazyLoad>
```

---

### B. Component-Level Code Splitting

```tsx
// Expert pattern: Load components on demand
import { lazy, Suspense, ComponentType } from 'react';

interface LazyComponentProps {
  fallback: React.ReactNode;
  componentPath: string;
  [key: string]: any;
}

// Dynamic import dengan error handling
const LazyComponent = ({ 
  fallback, 
  componentPath, 
  ...props 
}: LazyComponentProps) => {
  const Component = lazy(() => 
    import(`../../components/${componentPath}`)
      .then(module => ({ default: module.default }))
      .catch(error => {
        console.error(`Failed to load component ${componentPath}:`, error);
        // Return fallback component
        return { default: () => <ErrorFallback component={componentPath} /> };
      })
  );
  
  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

// Usage - Load components only when needed
const Dashboard = () => {
  return (
    <div>
      {/* Heavy chart component - only load when user scrolls to it */}
      <LazyComponent
        fallback={<ChartSkeleton />}
        componentPath="charts/AnalyticsChart"
      />
      
      {/* Heavy map component - only load when user clicks tab */}
      {activeTab === 'map' && (
        <LazyComponent
          fallback={<MapSkeleton />}
          componentPath="maps/InteractiveMap"
        />
      )}
    </div>
  );
};
```

---

## 2. **Intelligent Caching Strategies** 💾

### A. Multi-Layer Cache System

```tsx
// Expert pattern: L1 + L2 + Network cache
class CacheManager {
  private l1Cache = new Map<string, any>(); // Memory cache
  private l2CacheName = 'app-cache-v1'; // IndexedDB cache
  private cacheTimeouts = new Map<string, number>();
  
  // Cache configuration
  private configs = {
    l1: { maxSize: 100, ttl: 60 * 1000 }, // 1 minute
    l2: { maxSize: 1000, ttl: 60 * 60 * 1000 }, // 1 hour
    network: { ttl: 24 * 60 * 60 * 1000 }, // 24 hours
  };
  
  async get<T>(key: string): Promise<T | null> {
    // Try L1 cache first (fastest)
    const l1Item = this.l1Cache.get(key);
    if (l1Item && !this.isExpired(l1Item)) {
      console.log('Cache hit: L1');
      return l1Item.data as T;
    }
    
    // Try L2 cache (IndexedDB)
    const l2Item = await this.getFromL2(key);
    if (l2Item && !this.isExpired(l2Item)) {
      console.log('Cache hit: L2');
      // Promote to L1
      this.setL1(key, l2Item.data);
      return l2Item.data as T;
    }
    
    // Fetch from network
    console.log('Cache miss: Fetching from network');
    return null;
  }
  
  async set(key: string, data: any, ttl?: number) {
    // Set in L1
    this.setL1(key, data, ttl);
    
    // Set in L2
    await this.setL2(key, data, ttl);
  }
  
  private setL1(key: string, data: any, ttl?: number) {
    // LRU eviction if cache is full
    if (this.l1Cache.size >= this.configs.l1.maxSize) {
      const firstKey = this.l1Cache.keys().next().value;
      this.l1Cache.delete(firstKey);
    }
    
    this.l1Cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.configs.l1.ttl,
    });
  }
  
  private async setL2(key: string, data: any, ttl?: number) {
    const cache = await caches.open(this.l2CacheName);
    const response = new Response(JSON.stringify({
      data,
      timestamp: Date.now(),
      ttl: ttl || this.configs.l2.ttl,
    }));
    
    await cache.put(key, response);
  }
  
  private async getFromL2(key: string) {
    const cache = await caches.open(this.l2CacheName);
    const response = await cache.match(key);
    
    if (!response) return null;
    
    const data = await response.json();
    return data;
  }
  
  private isExpired(item: any) {
    return Date.now() - item.timestamp > item.ttl;
  }
  
  // Prefetch data before needed
  async prefetch(key: string, fetchFn: () => Promise<any>) {
    const existing = await this.get(key);
    if (existing) return existing;
    
    const data = await fetchFn();
    await this.set(key, data);
    return data;
  }
  
  // Clear cache
  async clear(pattern?: string) {
    if (pattern) {
      // Clear specific keys
      const keys = Array.from(this.l1Cache.keys()).filter(k => k.includes(pattern));
      keys.forEach(k => this.l1Cache.delete(k));
      
      const cache = await caches.open(this.l2CacheName);
      const requests = await cache.keys();
      await Promise.all(
        requests
          .filter(r => r.url.includes(pattern))
          .map(r => cache.delete(r))
      );
    } else {
      // Clear all
      this.l1Cache.clear();
      await caches.delete(this.l2CacheName);
    }
  }
}

// Usage
const cache = new CacheManager();

// Fetch with cache
const fetchData = async (url: string) => {
  // Try cache first
  const cached = await cache.get(url);
  if (cached) return cached;
  
  // Fetch from network
  const response = await fetch(url);
  const data = await response.json();
  
  // Cache for next time
  await cache.set(url, data);
  
  return data;
};

// Prefetch data
cache.prefetch('/api/user/profile', () => 
  fetch('/api/user/profile').then(r => r.json())
);
```

---

### B. Service Worker dengan Strategies

```typescript
// Expert pattern: Different caching strategies per resource type
const CACHE_NAME = 'app-v1';

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/main.js',
        '/static/css/main.css',
        '/static/fonts/main.woff2',
      ]);
    })
  );
});

// Fetch event - apply different strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Strategy based on resource type
  if (request.destination === 'image') {
    // Cache First for images
    event.respondWith(cacheFirst(request));
  } else if (request.destination === 'font') {
    // Cache First for fonts
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith('/api/')) {
    // Network First for API calls
    event.respondWith(networkFirst(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    // Stale While Revalidate for JS/CSS
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // Default: Cache First
    event.respondWith(cacheFirst(request));
  }
});

// Cache First strategy
async function cacheFirst(request: Request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return new Response('Offline', { status: 503 });
  }
}

// Network First strategy
async function networkFirst(request: Request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    
    // Return offline fallback
    return caches.match('/offline.html');
  }
}

// Stale While Revalidate strategy
async function staleWhileRevalidate(request: Request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  const networkFetch = fetch(request).then(async (response) => {
    cache.put(request, response.clone());
    return response;
  });
  
  return cached || networkFetch;
}
```

---

## 3. **Image Optimization** 🖼️

### A. Responsive Images dengan Modern Formats

```tsx
// Expert pattern: Serve optimal image based on device
interface OptimizedImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  formats?: ('webp' | 'avif' | 'jpg')[];
}

export const OptimizedImage: React.FC<OptimizedizedImageProps> = ({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  quality = 80,
  formats = ['avif', 'webp', 'jpg'],
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Generate srcset for different sizes
  const generateSrcSet = (baseUrl: string) => {
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes
      .map(size => `${baseUrl}?w=${size}&q=${quality} ${size}w`)
      .join(', ');
  };
  
  // Detect supported formats
  const getSupportedFormat = () => {
    const canvas = document.createElement('canvas');
    
    if (canvas.toDataURL('image/avif').includes('avif')) {
      return 'avif';
    }
    if (canvas.toDataURL('image/webp').includes('webp')) {
      return 'webp';
    }
    return 'jpg';
  };
  
  const format = formats.find(f => f === getSupportedFormat()) || formats[0];
  const optimizedSrc = `${src}?f=${format}&q=${quality}`;
  
  return (
    <div className="relative" style={{ aspectRatio: '16/9' }}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-20"
          style={{
            backgroundImage: `url(${src}?w=10&q=1)`,
          }}
        />
      )}
      
      {/* Actual image */}
      <img
        src={optimizedSrc}
        srcSet={generateSrcSet(optimizedSrc)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />
      
      {/* Fallback for older browsers */}
      <noscript>
        <img src={src} alt={alt} />
      </noscript>
    </div>
  );
};

// Usage
<OptimizedizedImage
  src="/hero-image.jpg"
  alt="Hero"
  priority={true} // Above the fold
  quality={85}
  formats={['avif', 'webp', 'jpg']}
/>
```

---

### B. Lazy Decode Images

```tsx
// Expert pattern: Progressive image loading
export const ProgressiveImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imageState, setImageState] = useState<'loading' | 'thumbnail' | 'full'>('loading');
  const [imageSrc, setImageSrc] = useState('');
  
  useEffect(() => {
    // Load thumbnail first (low quality)
    const thumbnailSrc = `${src}?w=100&q=10`;
    const thumbnail = new Image();
    thumbnail.src = thumbnailSrc;
    
    thumbnail.onload = () => {
      setImageSrc(thumbnailSrc);
      setImageState('thumbnail');
      
      // Then load full image
      const fullImage = new Image();
      fullImage.src = src;
      
      fullImage.onload = () => {
        setImageSrc(src);
        setImageState('full');
      };
    };
  }, [src]);
  
  return (
    <div className="relative">
      <img
        src={imageSrc}
        alt={alt}
        className={`
          w-full h-auto transition-all duration-500
          ${imageState === 'full' ? 'blur-0' : 'blur-md'}
        `}
      />
      
      {imageState === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
    </div>
  );
};
```

---

## 4. **Bundle Optimization** 📦

### A. Dynamic Imports dengan webpackChunkName

```tsx
// Expert pattern: Named chunks for better caching
const loadDashboard = () => import(
  /* webpackChunkName: "dashboard" */
  /* webpackPrefetch: true */
  './Dashboard'
);

const loadAnalytics = () => import(
  /* webpackChunkName: "analytics" */
  /* webpackPreload: true */
  './Analytics'
);

const loadSettings = () => import(
  /* webpackChunkName: "settings" */
  './Settings'
);

// Usage with loading states
const DashboardPage = () => {
  const [Dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadDashboard().then(module => {
      setDashboard(() => module.default);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <DashboardSkeleton />;
  return <Dashboard />;
};
```

---

### B. Tree Shaking Optimization

```typescript
// Expert pattern: Only import what you use

// ❌ BAD - Imports entire library
import _ from 'lodash';
import { Chart } from 'chart.js';
import { ALL_ICONS } from 'react-icons';

// ✅ GOOD - Import only what you need
import debounce from 'lodash/debounce';
import { Line } from 'react-chartjs-2';
import { FaHome, FaUser } from 'react-icons/fa';

// ✅ EVEN BETTER - Use ES6 named imports
import { debounce, throttle, memoize } from 'lodash-es';
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js';

// Configure webpack for tree shaking
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true, // Mark unused exports
    sideEffects: true, // Enable tree shaking
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        common: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

---

## 5. **Core Web Vitals Optimization** 📊

### A. Real-Time Monitoring

```tsx
// Expert pattern: Monitor and optimize Core Web Vitals
import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export const useWebVitals = (onReport?: (metric: any) => void) => {
  useEffect(() => {
    const reportMetric = (metric: any) => {
      console.log('Web Vital:', metric);
      
      // Send to analytics
      sendToAnalytics(metric);
      
      // Custom callback
      if (onReport) onReport(metric);
    };
    
    // Monitor all Core Web Vitals
    getCLS(reportMetric);
    getFID(reportMetric);
    getFCP(reportMetric);
    getLCP(reportMetric);
    getTTFB(reportMetric);
  }, [onReport]);
};

const sendToAnalytics = (metric: any) => {
  // Send to Google Analytics, Mixpanel, etc.
  const body = {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
    navigationType: metric.navigationType,
  };
  
  // Use sendBeacon for reliable delivery
  navigator.sendBeacon('/api/analytics/web-vitals', JSON.stringify(body));
};

// Usage
function App() {
  useWebVitals((metric) => {
    // Alert if performance is poor
    if (metric.rating === 'poor') {
      console.warn(`Poor ${metric.name}: ${metric.value}`);
      
      // Take corrective action
      if (metric.name === 'LCP') {
        // Preload LCP element
        preloadLCPElement();
      }
    }
  });
  
  return <div>...</div>;
}
```

---

### B. LCP Optimization

```tsx
// Expert pattern: Optimize Largest Contentful Paint
export const LCPOptimizer = () => {
  useEffect(() => {
    // Preload LCP image
    const preloadLCPImage = () => {
      const lcpImage = document.querySelector('[data-lcp]');
      if (lcpImage) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = lcpImage.getAttribute('data-src');
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      }
    };
    
    // Preconnect to image CDN
    const preconnectCDN = () => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://cdn.example.com';
      document.head.appendChild(link);
    };
    
    // Optimize fonts
    const optimizeFonts = () => {
      // Use font-display: swap
      // Preload critical fonts
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = '/fonts/critical.woff2';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };
    
    preloadLCPImage();
    preconnectCDN();
    optimizeFonts();
  }, []);
  
  return null;
};

// Usage in component
const Hero = () => {
  return (
    <section>
      <img
        data-lcp // Mark as LCP element
        data-src="/hero.jpg"
        alt="Hero"
      />
      <LCPOptimizer />
    </section>
  );
};
```

---

## Response Template

```markdown
⚡ **Performance Optimization - Expert Level**

Features:
- Advanced lazy loading dengan preloading
- Multi-layer caching (L1 + L2 + Network)
- Service Worker dengan strategies
- Image optimization (AVIF, WebP)
- Bundle optimization
- Core Web Vitals monitoring

Impact:
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- Bundle size: -50%
- Cache hit rate: > 80%

Tools:
- web-vitals
- Workbox
- webpack-bundle-analyzer
- Lighthouse CI

Integration Time: 2-3 weeks
Complexity: ⭐⭐⭐ Expert
```

---

## Performance Budget

```json
{
  "budget": {
    "maxBundleSize": "250KB",
    "maxInitialLoad": "3s",
    "maxLCP": "2.5s",
    "maxFID": "100ms",
    "maxCLS": "0.1",
    "maxImageSize": "200KB",
    "minCacheHitRate": "80%"
  },
  "alerts": {
    "bundleSize": "warn at 200KB, error at 250KB",
    "LCP": "warn at 2.0s, error at 2.5s"
  }
}
```

---

**Last Updated:** Maret 2026
**Level:** Expert
**Integration Time:** 2-3 weeks
