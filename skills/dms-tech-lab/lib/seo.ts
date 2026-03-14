export const SITE_CONFIG = {
  name: "DMS.LAB",
  title: "DMS | Innovation Through AI",
  description:
    "Automotive Retail AI & 3D Engineering Solutions. AI 기반 업무 자동화, 3D 엔지니어링, 기술 교육 서비스를 제공합니다.",
  url: "https://dmssolution.co.kr",
  locale: "ko_KR",
  type: "website",
  keywords: [
    "AI",
    "자동화",
    "3D 엔지니어링",
    "자동차 리테일",
    "N8N",
    "워크플로우 자동화",
    "웹GL",
    "프롬프트 엔지니어링",
    "기술 교육",
    "DMS",
  ],
  author: {
    name: "DMS Solution",
    url: "https://dmssolution.co.kr",
  },
  social: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com/@reedoinvest",
    kakao: "https://open.kakao.com/o/sSPHn33g",
  },
  og: {
    title: "DMS | Innovation Through AI",
    description:
      "Automotive Retail AI & 3D Engineering Solutions. AI 기반 업무 자동화, 3D 엔지니어링, 기술 교육 서비스를 제공합니다.",
    image:
      "https://dmssolution.co.kr/og-image.png",
    alt: "DMS.LAB - AI & 3D Engineering Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "DMS | Innovation Through AI",
    description:
      "Automotive Retail AI & 3D Engineering Solutions.",
    image:
      "https://dmssolution.co.kr/og-image.png",
    creator: "@reedoinvest",
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
