"use client";

import { PromptItem } from "@/lib/prompt-data";
import { ArrowLeft, Copy, ChevronRight, Heart } from "lucide-react";
import { useState } from "react";

interface TextPromptListProps {
  category: string;
  prompts: PromptItem[];
  onSelectPrompt: (prompt: PromptItem) => void;
  onBack: () => void;
}

export default function TextPromptList({ category, prompts, onSelectPrompt, onBack }: TextPromptListProps) {
  
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-white" />
        </button>
        <h2 className="text-2xl font-bold text-white">{category} 프롬프트</h2>
        <span className="text-sm text-gray-500">{prompts.length}개의 프롬프트</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
            <div 
                key={prompt.id}
                onClick={() => onSelectPrompt(prompt)}
                className="group bg-[#1A1D24] p-6 rounded-xl border border-white/5 hover:border-amber-400/50 hover:bg-white/5 transition-all cursor-pointer flex flex-col h-full"
            >
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded uppercase">
                        {category}
                    </span>
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {prompt.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-6">
                    {prompt.description}
                </p>

                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <span>{prompt.author}</span>
                    </div>
                    <div className="text-amber-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        자세히 보기 <ChevronRight className="w-3 h-3" />
                    </div>
                </div>
            </div>
        ))}
      </div>
      
      {prompts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
              이 카테고리에는 아직 프롬프트가 없습니다.
          </div>
      )}
    </div>
  );
}
