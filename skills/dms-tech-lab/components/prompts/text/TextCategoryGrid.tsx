"use client";

import { TEXT_SUBCATEGORIES } from "@/lib/prompt-data";
import { ArrowRight } from "lucide-react";

interface TextCategoryGridProps {
  onSelectCategory: (id: string) => void;
}

export default function TextCategoryGrid({ onSelectCategory }: TextCategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TEXT_SUBCATEGORIES.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className="group p-6 bg-[#1A1D24] rounded-xl border border-white/5 text-left hover:border-neon-sky/30 hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-neon-sky/10 rounded-lg text-neon-sky">
                    <Icon className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
                {category.name}
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2 min-h-[40px]">
                {category.description}
            </p>

            <div className="text-xs font-bold text-gray-500">
                {category.count}개 프롬프트
            </div>
          </button>
        );
      })}
    </div>
  );
}
