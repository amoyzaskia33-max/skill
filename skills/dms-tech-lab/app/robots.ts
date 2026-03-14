import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/auth/', '/unauthorized'],
      },
    ],
    sitemap: 'https://dmssolution.co.kr/sitemap.xml',
  };
}
