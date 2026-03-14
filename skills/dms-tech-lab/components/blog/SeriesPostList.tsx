"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

interface PostItem {
  slug: string;
  chapter?: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

interface SeriesPostListProps {
  posts: PostItem[];
  color: string;
}

export default function SeriesPostList({ posts, color }: SeriesPostListProps) {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {posts.map((post, index) => (
        <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group block relative pl-8 md:pl-0"
        >
          {/* Vertical Line Connector */}
          {index !== posts.length - 1 && (
            <div className={`absolute left-[4px] md:left-[-24px] top-6 bottom-[-32px] w-[1px] bg-white/10 group-hover:bg-${color}-500/50 transition-colors`} />
          )}

          <div className="flex items-start gap-6">
             {/* Chapter Number Badge */}
             {post.chapter && (
               <div className="hidden md:flex flex-col items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-[#0A1124] group-hover:border-neon-sky/50 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all z-10 shrink-0">
                  <span className={`text-[10px] text-gray-500 font-bold uppercase`}>No.</span>
                  <span className={`text-lg font-bold text-white group-hover:text-neon-sky`}>{post.chapter}</span>
               </div>
             )}

             {/* Content */}
             <div className="flex-grow p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                    <div>
                      {post.chapter && (
                        <span className={`text-xs font-bold text-${color}-400 px-2 py-1 rounded bg-${color}-500/10`}>
                            Chapter {post.chapter}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-neon-sky transition-colors">
                    {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                </p>
                
                <div className="flex items-center text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                    {post.chapter ? 'Read Chapter' : 'Read Article'} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
