import { SITE_CONFIG } from "@/lib/seo";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageMetadata) {
  const fullTitle = title === SITE_CONFIG.title
    ? title
    : `${title} | DMS.LAB`;

  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image || SITE_CONFIG.og.image;

  return {
    title: fullTitle,
    description,
    keywords: SITE_CONFIG.keywords.join(", "),
    authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.author.url }],
    creator: SITE_CONFIG.author.name,
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.og.alt,
        },
      ],
    },
    twitter: {
      card: SITE_CONFIG.twitter.card,
      title: fullTitle,
      description,
      images: [ogImage],
      creator: SITE_CONFIG.twitter.creator,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification-token-here",
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * JSON-LD 구조화된 데이터 생성
 */
export function generateStructuredData(type: "Organization" | "WebSite", data?: any) {
  const base = {
    "@context": "https://schema.org",
  };

  if (type === "Organization") {
    return {
      ...base,
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/logo.png`,
      description: SITE_CONFIG.description,
      sameAs: [
        SITE_CONFIG.social.instagram,
        SITE_CONFIG.social.youtube,
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "reedo.dev@dmssolution.co.kr",
        contactType: "customer service",
        availableLanguage: ["Korean", "English"],
      },
    };
  }

  if (type === "WebSite") {
    return {
      ...base,
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
  }
}

/**
 * 블로그 포스트 메타데이터 생성
 */
export function generateBlogMetadata({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  image,
  authors,
}: PageMetadata & {
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}) {
  const fullTitle = `${title} | DMS.LAB`;
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    ...generateMetadata({ title, description, path, image }),
    openGraph: {
      ...generateMetadata({ title, description, path, image }).openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      authors,
    },
  };
}
