import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MDXPost } from "@/lib/mdx";

interface RelatedPostsProps {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    series?: string;
  }[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-white/10">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="h-[2px] w-8 bg-neon-sky" />
        이 글도 읽어보세요
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
          >
            {/* Image */}
            {post.coverImage && (
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B1B]/80 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-5">
              {post.series && (
                <span className="inline-block px-2 py-1 rounded-full bg-neon-sky/10 text-neon-sky text-xs font-medium border border-neon-sky/20 mb-3">
                  {post.series}
                </span>
              )}
              <h4 className="text-white font-semibold text-base mb-2 line-clamp-2 group-hover:text-neon-sky transition-colors">
                {post.title}
              </h4>
              <p className="text-white/40 text-sm line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
