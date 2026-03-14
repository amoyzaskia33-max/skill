"use client";

import { PROMPT_CATEGORIES, CATEGORY_ICONS, PromptCategory } from "@/lib/prompt-data";
import { cn } from "@/lib/utils";

interface PromptSidebarProps {
  selectedCategory: PromptCategory;
  onSelectCategory: (category: PromptCategory) => void;
}

export default function PromptSidebar({ selectedCategory, onSelectCategory }: PromptSidebarProps) {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
      <div className="sticky top-24">
        <h2 className="text-3xl font-bold text-white mb-8 font-caveat relative inline-block z-10">
            <span className="relative z-10">카테고리</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-neon-purple/50 -z-10 -rotate-2 rounded-sm" />
        </h2>
        
        <nav className="space-y-2">
          {PROMPT_CATEGORIES.map((category) => {
             const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || CATEGORY_ICONS["All"];
             return (
                <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={cn(
                    "w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 group",
                    selectedCategory === category
                    ? "bg-gradient-to-r from-neon-purple/20 to-transparent text-white font-bold border-l-4 border-neon-purple"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                )}
                >
                <Icon className={cn("w-5 h-5", selectedCategory === category ? "text-neon-purple" : "text-gray-500 group-hover:text-gray-300")} />
                <span className="text-lg tracking-wide">{category}</span>
                {selectedCategory === category && (
                     <span className="ml-auto w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
                )}
                </button>
             );
          })}
        </nav>
      </div>
    </aside>
  );
}
