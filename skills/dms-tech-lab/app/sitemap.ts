import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

// 블로그 포스트 슬러그를 파일 시스템에서 자동으로 수집
function getBlogSlugs(): string[] {
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  try {
    return fs.readdirSync(postsDir)
      .filter(file => file.endsWith('.mdx') && !file.startsWith('_'))
      .map(file => file.replace('.mdx', ''));
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dmssolution.co.kr';

  // 메인 페이지 + 모든 서브 페이지
  const mainRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/company', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/automation', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/prompts', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/vibe-coding', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/apps', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // 블로그 포스트 자동 수집
  const blogSlugs = getBlogSlugs();

  const sitemap: MetadataRoute.Sitemap = [
    // 메인 페이지
    ...mainRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    // 블로그 포스트 (자동)
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return sitemap;
}
