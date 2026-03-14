"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { BlogSeries } from "@/lib/blog-data";

interface SeriesHeaderProps {
  series: BlogSeries;
  postCount: number;
}

export default function SeriesHeader({ series, postCount }: SeriesHeaderProps) {
  return (
    <section className="relative w-full pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B1B]/80 via-transparent to-[#050B1B] z-0" />

      {/* Background Blur Image */}
      <div className="absolute inset-0 opacity-20 blur-3xl z-[-1]">
        <Image
          src={series.coverImage}
          alt="bg"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Series
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          {/* Book Cover Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 md:w-64 shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-neon-sky/10 border border-white/10"
          >
            <div className="aspect-[3/4] relative">
              <Image
                src={series.coverImage}
                alt={series.title}
                fill
                priority
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-white/60 mb-2">{series.subtitle}</span>
                <h1 className="text-2xl font-bold text-white leading-tight">{series.title}</h1>
              </div>
            </div>
          </motion.div>

          {/* Series Info */}
          <div className="flex-grow text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span
                className={`inline-block px-3 py-1 rounded-full bg-${series.color}-500/20 text-${series.color}-400 text-xs font-bold tracking-wider mb-4 border border-${series.color}-500/30`}
              >
                SERIES
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">{series.title}</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">{series.description}</p>

              <div className="flex flex-wrap gap-8 justify-center md:justify-start text-sm text-gray-400 border-t border-white/10 pt-6">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">Author</span>
                  <span className="text-white font-semibold">Reedo</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">Episodes</span>
                  <span className="text-white font-semibold">{postCount} Chapters</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</span>
                  <span className="text-neon-sky font-semibold">Ongoing</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
