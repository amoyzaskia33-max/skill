"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface SeriesCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  color: string;
  postCount: number;
  tags: string[];
}

export default function SeriesCard({
  id,
  title,
  subtitle,
  description,
  coverImage,
  color,
  postCount,
  tags,
}: SeriesCardProps) {
  // Map for dynamic tailwind classes to ensure they are generated
  const colorVariants: Record<string, { badge: string; text: string; glow: string }> = {
    purple: { badge: "bg-purple-500", text: "text-purple-400", glow: "from-purple-500/20" },
    rose: { badge: "bg-rose-500", text: "text-rose-400", glow: "from-rose-500/20" },
    teal: { badge: "bg-teal-500", text: "text-teal-400", glow: "from-teal-500/20" },
    blue: { badge: "bg-blue-500", text: "text-blue-400", glow: "from-blue-500/20" },
    emerald: { badge: "bg-emerald-500", text: "text-emerald-400", glow: "from-emerald-500/20" },
    pink: { badge: "bg-pink-500", text: "text-pink-400", glow: "from-pink-500/20" },
    orange: { badge: "bg-orange-500", text: "text-orange-400", glow: "from-orange-500/20" },
    yellow: { badge: "bg-yellow-500", text: "text-yellow-400", glow: "from-yellow-500/20" },
  };

  const currentVariant = colorVariants[color] || colorVariants.purple;

  return (
    <Link href={`/blog/series/${id}`} className="group relative block w-full">
      <div className="relative aspect-[3/4] w-full rounded-[20px] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl hover:shadow-neon-sky/20 perspective-1000">
        
        {/* Book Spine Effect (Left Side) */}
        <div className={`absolute left-0 top-0 bottom-0 w-3 rounded-l-[20px] bg-gradient-to-r from-white/20 to-transparent z-20 pointer-events-none`} />
        
        {/* Cover Image */}
        <div className="absolute inset-0 rounded-[20px] overflow-hidden bg-[#0A1124] border-2 border-white/20 group-hover:border-white/40 transition-colors shadow-lg">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B1B]/70 to-[#050B1B]/90 z-10" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
            {/* Top Badge */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white shadow-md">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Post Count Badge */}
            <div className={`absolute top-6 right-6 w-12 h-16 ${currentVariant.badge} rounded-b-lg shadow-lg flex flex-col items-center justify-center text-white font-bold opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100`}>
                <span className="text-xs opacity-80">Vol.</span>
                <span className="text-lg">{postCount}</span>
            </div>

            {/* Title Section */}
            <div className="transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                <span className={`block ${currentVariant.text} text-sm font-bold tracking-widest uppercase mb-2 opacity-80`}>
                    {subtitle}
                </span>
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-neon-sky transition-colors">
                    {title}
                </h3>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {description}
                    </p>
                    <div className="flex items-center text-white font-semibold text-sm">
                        Read Series <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                </div>
            </div>
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute -inset-1 rounded-[24px] bg-gradient-to-br ${currentVariant.glow} to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
      </div>
      
      {/* Reflection for realism */}
      <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/50 blur-lg rounded-[100%] opacity-0 group-hover:opacity-40 transition-opacity duration-500 transform scale-x-90" />
    </Link>
  );
}
