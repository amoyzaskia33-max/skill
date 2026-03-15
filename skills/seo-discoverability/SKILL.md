# 📈 SEO & Discoverability

## Purpose

Advanced SEO techniques untuk maximize visibility di search engines - technical SEO, schema markup, performance optimization, dan content discoverability.

## Level: ⭐⭐⭐ Expert

---

## 1. **Technical SEO** 🔧

### A. Next.js SEO Configuration

```tsx
// Expert pattern: Complete SEO setup with Next.js
import { NextSeo, ArticleJsonLd, BreadcrumbJsonLd } from 'next-seo';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  openGraph?: {
    type: string;
    locale: string;
    siteName: string;
  };
  twitter?: {
    handle: string;
    site: string;
    cardType: string;
  };
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage,
  openGraph,
  twitter,
}) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          type: openGraph?.type || 'website',
          locale: openGraph?.locale || 'en_US',
          url: canonical,
          siteName: openGraph?.siteName || 'My Site',
          images: ogImage ? [ogImage] : undefined,
        }}
        twitter={{
          handle: twitter?.handle || '@handle',
          site: twitter?.site || '@site',
          cardType: twitter?.cardType || 'summary_large_image',
        }}
      />
      
      <Head>
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#3B82F6" />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        
        {/* Google */}
        <meta name="google-site-verification" content="verification-code" />
        
        {/* Bing */}
        <meta name="msvalidate.01" content="verification-code" />
        
        {/* Author */}
        <meta name="author" content="Your Name" />
        
        {/* Category */}
        <meta name="category" content="Technology" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="ID-JK" />
        <meta name="geo.placename" content="Jakarta" />
        <meta name="geo.position" content="-6.208763;106.845599" />
        <meta name="ICBM" content="-6.208763, 106.845599" />
      </Head>
    </>
  );
};

// Usage in page
export default function ArticlePage({ article }) {
  return (
    <>
      <SEO
        title={`${article.title} | My Site`}
        description={article.excerpt}
        canonical={`https://mysite.com/articles/${article.slug}`}
        ogImage={{
          url: `https://mysite.com/og/${article.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: article.title,
        }}
        openGraph={{
          type: 'article',
          locale: 'en_US',
          siteName: 'My Site',
        }}
      />
      
      {/* Structured data */}
      <ArticleJsonLd
        url={`https://mysite.com/articles/${article.slug}`}
        title={article.title}
        images={[article.image]}
        datePublished={article.publishedAt}
        dateModified={article.updatedAt}
        authorName={article.author.name}
        publisherName={article.publisher.name}
        publisherLogo={article.publisher.logo}
        description={article.excerpt}
      />
      
      <article>
        <h1>{article.title}</h1>
        {/* Article content */}
      </article>
    </>
  );
}
```

---

### B. Dynamic Sitemap Generation

```typescript
// Expert pattern: Auto-generate sitemap
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mysite.com';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
  
  // Dynamic pages - articles
  const articles = await fetchArticles();
  const articlePages: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  
  // Dynamic pages - categories
  const categories = await fetchCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(category.updatedAt),
    changeFrequency: 'daily',
    priority: 0.7,
  }));
  
  return [...staticPages, ...articlePages, ...categoryPages];
}

// robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/*.json$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: 'https://mysite.com/sitemap.xml',
    host: 'https://mysite.com',
  };
}
```

---

## 2. **Schema Markup** 📊

### A. Complete Structured Data

```tsx
// Expert pattern: Comprehensive schema markup
import {
  ProductJsonLd,
  AggregateRatingJsonLd,
  ReviewJsonLd,
  FAQJsonLd,
  HowToJsonLd,
  EventJsonLd,
  LocalBusinessJsonLd,
  OrganizationJsonLd,
  PersonJsonLd,
  SiteLinksSearchBoxJsonLd,
} from 'next-seo';

// E-commerce Product Page
export function ProductPage({ product }) {
  return (
    <>
      <ProductJsonLd
        productName={product.name}
        images={product.images}
        description={product.description}
        brand={product.brand}
        reviews={product.reviews?.map(review => ({
          author: review.author,
          datePublished: review.date,
          reviewBody: review.content,
          name: review.title,
          publisherName: 'My Site',
          reviewRating: {
            bestRating: '5',
            ratingValue: review.rating,
            worstRating: '1',
          },
        }))}
        aggregates={{
          ratingValue: product.averageRating,
          reviewCount: product.reviewCount,
        }}
        offers={{
          price: product.price,
          priceCurrency: 'IDR',
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          seller: {
            name: 'My Store',
          },
        }}
      />
      
      <AggregateRatingJsonLd
        ratingValue={product.averageRating}
        reviewCount={product.reviewCount}
        bestRating="5"
        worstRating="1"
      />
      
      <FAQJsonLd
        mainEntity={[
          {
            question: 'Is this product waterproof?',
            acceptedAnswer: 'Yes, this product is IP67 rated.',
          },
          {
            question: 'What is the warranty period?',
            acceptedAnswer: '2 years manufacturer warranty.',
          },
        ]}
      />
    </>
  );
}

// Local Business
export function LocalBusinessPage({ business }) {
  return (
    <LocalBusinessJsonLd
      id={business.id}
      type={business.type}
      name={business.name}
      description={business.description}
      url={business.website}
      telephone={business.phone}
      address={{
        streetAddress: business.address.street,
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        postalCode: business.address.zip,
        addressCountry: business.address.country,
      }}
      geo={{
        latitude: business.coordinates.lat,
        longitude: business.coordinates.lng,
      }}
      images={business.images}
      priceRange={business.priceRange}
      servesCuisine={business.cuisine}
      openingHours={business.hours}
      sameAs={business.socialMedia}
    />
  );
}

// Organization
export function OrganizationPage({ org }) {
  return (
    <>
      <OrganizationJsonLd
        name={org.name}
        url={org.website}
        logo={org.logo}
        sameAs={org.socialMedia}
        contactPoint={[
          {
            contactType: 'customer service',
            telephone: org.phone,
            areaServed: 'ID',
            availableLanguage: ['Indonesian', 'English'],
          },
        ]}
      />
      
      <PersonJsonLd
        id={org.founder.id}
        name={org.founder.name}
        jobTitle={org.founder.title}
        worksFor={org.name}
        sameAs={org.founder.socialMedia}
      />
      
      <SiteLinksSearchBoxJsonLd
        url={org.website}
        potentialAction={{
          queryInput: 'search_query_string',
        }}
      />
    </>
  );
}
```

---

### B. Breadcrumb Schema

```tsx
// Expert pattern: Dynamic breadcrumbs with schema
import { BreadcrumbJsonLd } from 'next-seo';
import Link from 'next/link';

export function Breadcrumbs({ items }: {
  items: { label: string; href: string }[];
}) {
  return (
    <>
      <BreadcrumbJsonLd
        itemListElements={items.map((item, index) => ({
          position: index + 1,
          name: item.label,
          item: `https://mysite.com${item.href}`,
        }))}
      />
      
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              <Link
                href={item.href}
                className={`
                  ${index === items.length - 1
                    ? 'font-bold text-gray-900'
                    : 'text-blue-600 hover:underline'
                  }
                `}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Usage
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Smartphones', href: '/products/electronics/smartphones' },
  ]}
/>
```

---

## 3. **Performance for SEO** ⚡

### A. Core Web Vitals Optimization

```tsx
// Expert pattern: Optimize for Core Web Vitals
import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Report to analytics
function sendToAnalytics(metric: any) {
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
}

export function useWebVitals() {
  useEffect(() => {
    // Track all Core Web Vitals
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }, []);
}

// LCP Optimization
export function OptimizeLCP() {
  useEffect(() => {
    // Preload LCP image
    const lcpImage = document.querySelector('[data-lcp]');
    if (lcpImage) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = lcpImage.getAttribute('data-src');
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    }
    
    // Preconnect to critical origins
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://cdn.example.com';
    document.head.appendChild(preconnect);
    
    // DNS prefetch for analytics
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = 'https://analytics.example.com';
    document.head.appendChild(dnsPrefetch);
  }, []);
  
  return null;
}

// Usage in layout
export default function RootLayout({ children }) {
  useWebVitals();
  
  return (
    <html lang="en">
      <head>
        <OptimizeLCP />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

### B. Image Optimization for SEO

```tsx
// Expert pattern: SEO-friendly images
import Image from 'next/image';

export function SEOOptimizedImage({ src, alt, title, caption, priority = false }) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        title={title || alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-lg shadow-lg"
      />
      
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Usage
<SEOOptimizedImage
  src="/product.jpg"
  alt="Red running shoes side view"
  title="Nike Air Max - Red"
  caption="Nike Air Max available in multiple colors"
  priority={true} // For above-the-fold images
/>
```

---

## 4. **Content Optimization** 📝

### A. Keyword Optimization

```typescript
// Expert pattern: Content analysis for SEO
interface ContentAnalysis {
  keywordDensity: number;
  wordCount: number;
  headingStructure: {
    h1: number;
    h2: number;
    h3: number;
  };
  internalLinks: number;
  externalLinks: number;
  imagesWithoutAlt: number;
  readabilityScore: number;
}

export const analyzeContent = (
  content: string,
  targetKeyword: string
): ContentAnalysis => {
  // Word count
  const wordCount = content.split(/\s+/).length;
  
  // Keyword density
  const keywordMatches = content.toLowerCase().match(
    new RegExp(targetKeyword.toLowerCase(), 'g')
  );
  const keywordDensity = keywordMatches
    ? (keywordMatches.length / wordCount) * 100
    : 0;
  
  // Heading structure
  const headings = {
    h1: (content.match(/<h1[^>]*>/g) || []).length,
    h2: (content.match(/<h2[^>]*>/g) || []).length,
    h3: (content.match(/<h3[^>]*>/g) || []).length,
  };
  
  // Links
  const internalLinks = (content.match(/href="\/[^"]+"/g) || []).length;
  const externalLinks = (content.match(/href="https?:\/\/[^"]+"/g) || []).length;
  
  // Images without alt
  const images = content.match(/<img[^>]*>/g) || [];
  const imagesWithoutAlt = images.filter(
    img => !img.includes('alt=')
  ).length;
  
  // Readability (simplified Flesch Reading Ease)
  const sentences = content.split(/[.!?]+/).length;
  const syllables = countSyllables(content);
  const readabilityScore = 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / wordCount);
  
  return {
    keywordDensity,
    wordCount,
    headingStructure: headings,
    internalLinks,
    externalLinks,
    imagesWithoutAlt,
    readabilityScore: Math.round(readabilityScore),
  };
};

// Usage in CMS
function ContentEditor({ content, targetKeyword }) {
  const analysis = analyzeContent(content, targetKeyword);
  
  return (
    <div className="seo-analysis">
      <h3>SEO Analysis</h3>
      
      <div className={analysis.keywordDensity >= 1 && analysis.keywordDensity <= 3 ? 'good' : 'warning'}>
        Keyword Density: {analysis.keywordDensity.toFixed(2)}%
        (Target: 1-3%)
      </div>
      
      <div className={analysis.wordCount >= 1000 ? 'good' : 'warning'}>
        Word Count: {analysis.wordCount}
        (Target: 1000+)
      </div>
      
      <div className={analysis.headingStructure.h1 === 1 ? 'good' : 'warning'}>
        H1 Tags: {analysis.headingStructure.h1}
        (Target: 1)
      </div>
      
      <div className={analysis.imagesWithoutAlt === 0 ? 'good' : 'warning'}>
        Images without Alt: {analysis.imagesWithoutAlt}
        (Target: 0)
      </div>
      
      <div className={analysis.readabilityScore >= 60 ? 'good' : 'warning'}>
        Readability Score: {analysis.readabilityScore}
        (Target: 60+)
      </div>
    </div>
  );
}
```

---

## Response Template

```markdown
📈 **SEO & Discoverability - Expert Level**

Features:
- Technical SEO setup
- Schema markup (Product, Local Business, FAQ, etc.)
- Dynamic sitemap generation
- Core Web Vitals optimization
- Content analysis
- Image optimization

SEO Targets:
- PageSpeed Score: 90+
- Core Web Vitals: All Green
- Schema: Complete
- Index Coverage: 100%
- Keyword Rankings: Top 3

Tools:
- next-seo
- web-vitals
- Google Search Console
- Ahrefs/SEMrush
- Lighthouse

Integration Time: 2-3 weeks
Complexity: ⭐⭐⭐ Expert
```

---

## SEO Checklist

```
✅ Title tags (unique, 50-60 chars)
✅ Meta descriptions (unique, 150-160 chars)
✅ H1 tag (one per page)
✅ Schema markup implemented
✅ XML sitemap generated
✅ robots.txt configured
✅ Canonical URLs set
✅ Images optimized (alt, title, size)
✅ Internal linking structure
✅ Mobile-friendly design
✅ Page speed optimized
✅ HTTPS enabled
✅ Core Web Vitals green
✅ Breadcrumbs with schema
✅ Open Graph tags
✅ Twitter Card tags
```

---

**Last Updated:** Maret 2026
**Level:** Expert
**Integration Time:** 2-3 weeks
