"use client";

import Link from "next/link";
import Image from "next/image";
import type { MDXPost } from "@/lib/mdx";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

interface BlogTeaserProps {
  posts: MDXPost[];
  variant: "a" | "b";
}

export default function BlogTeaser({ posts, variant }: BlogTeaserProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-20 px-6 bg-[#050B1B]" aria-label="최신 인사이트">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-neon-sky text-sm font-semibold tracking-widest uppercase mb-3">Latest Insights</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">최신 인사이트</h2>
            <p className="text-white/60 mt-3">실무에서 바로 적용 가능한 자동화, AI, 엔지니어링 콘텐츠를 확인하세요.</p>
          </div>
          <Link
            href="/blog"
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.CONTENT_TEASER_CLICK, {
                section: "blog_teaser",
                content_type: "list",
                item_id: "all",
                position: "header",
                destination: "/blog",
                variant,
              })
            }
            className="hidden md:inline-flex px-5 py-2.5 rounded-xl border border-white/15 text-white/85 hover:border-neon-sky/40 hover:text-white transition-colors"
          >
            인사이트 더 보기
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <article key={post.slug} className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] group">
              <Link
                href={`/blog/${post.slug}`}
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.CONTENT_TEASER_CLICK, {
                    section: "blog_teaser",
                    content_type: "post",
                    item_id: post.slug,
                    position: index + 1,
                    destination: `/blog/${post.slug}`,
                    variant,
                  })
                }
                className="block"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={post.frontMatter.coverImage || "/og-image.png"}
                    alt={String(post.frontMatter.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-neon-sky mb-2">{String(post.frontMatter.date)}</p>
                  <h3 className="text-white font-bold text-lg leading-snug line-clamp-2 mb-2">{String(post.frontMatter.title)}</h3>
                  <p className="text-white/60 text-sm line-clamp-3">{String(post.frontMatter.excerpt)}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="md:hidden mt-6">
          <Link
            href="/blog"
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.CONTENT_TEASER_CLICK, {
                section: "blog_teaser",
                content_type: "list",
                item_id: "all",
                position: "footer",
                destination: "/blog",
                variant,
              })
            }
            className="inline-flex px-5 py-2.5 rounded-xl border border-white/15 text-white/85 hover:border-neon-sky/40 hover:text-white transition-colors"
          >
            인사이트 더 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
