"use client";

import { PromptItem, getGenerationTool } from "@/lib/prompt-data";
import { ArrowLeft, Copy, Share2, Check, ExternalLink, Zap, Lightbulb } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import NextImage from "next/image";

interface TextPromptDetailProps {
  prompt: PromptItem;
  onBack: () => void;
}

export default function TextPromptDetail({ prompt, onBack }: TextPromptDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        목록으로 돌아가기
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-400/20">
                {prompt.subcategory || prompt.category || "General"}
            </span>
            <span className="text-gray-500 text-sm">{prompt.author}</span>
            {getGenerationTool(prompt.tags) && (
                <span className="ml-2 px-2 py-0.5 rounded bg-white/10 text-white text-xs border border-white/10 flex items-center gap-1">
                    ⚡ Created with <strong>{getGenerationTool(prompt.tags)}</strong>
                </span>
            )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {prompt.title}
        </h1>

      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Prompt Box */}
        <div className="lg:col-span-8 space-y-8">
            
            {/* Description Card */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {prompt.description}
                </p>
            </div>

            {/* 결과 예시 - 이미지와 텍스트 모두 표시 */}
            {(prompt.detail?.exampleOutput || prompt.image) && (
                <div className="bg-[#1A1D24] rounded-xl border border-white/5 p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-gray-400" /> 결과 예시
                    </h3>
                    
                    {/* 이미지가 있으면 먼저 표시 */}
                    {prompt.image && (
                        <div className="rounded-lg overflow-hidden border border-white/10 relative w-full aspect-video bg-black/20">
                            <NextImage 
                                src={prompt.image} 
                                alt={prompt.title} 
                                fill 
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                            />
                        </div>
                    )}
                    
                    {/* 텍스트 예시도 함께 표시 (이미지가 있어도) */}
                    {prompt.detail?.exampleOutput && (
                        <div className="bg-white/5 rounded-lg p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans border border-white/10">
                            {prompt.detail.exampleOutput}
                        </div>
                    )}
                </div>
            )}

            <div className="bg-[#1A1D24] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="bg-black/20 p-4 border-b border-white/5 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                        <Zap className="w-3 h-3 text-amber-400" /> Prompt Code
                    </span>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleCopy} 
                            className="flex items-center gap-2 px-3 py-1.5 rounded bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition-colors"
                        >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? "복사됨" : "복사하기"}
                        </button>
                    </div>
                </div>
                <div className="p-6 bg-black/10">
                    <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {prompt.promptContent}
                    </pre>
                </div>
            </div>
        </div>

        {/* Right Sidebar: Meta & Tips */}
        <div className="lg:col-span-4 space-y-6">
            
            {/* Use Case */}
            {prompt.detail?.useCase && (
                <div className="group relative rounded-xl p-[1px] bg-gradient-to-br from-white/10 to-transparent hover:from-neon-sky/50 transition-all duration-500">
                    <div className="bg-[#1A1D24] rounded-xl p-6 h-full relative z-10">
                        <h3 className="text-sm font-bold text-neon-sky uppercase mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> 언제 쓰나요?
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                            {prompt.detail.useCase}
                        </p>
                    </div>
                </div>
            )}

            {/* Tips */}
            {prompt.detail?.tips && prompt.detail.tips.length > 0 && (
                <div className="bg-gradient-to-br from-amber-400/5 to-transparent rounded-xl p-6 border border-amber-400/10 hover:border-amber-400/30 transition-colors">
                    <h3 className="text-sm font-bold text-amber-400 uppercase mb-4 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> 실전 노하우
                    </h3>
                    <ul className="space-y-4">
                        {prompt.detail.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                                <span className="leading-relaxed">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tags */}
            {prompt.tags && prompt.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {prompt.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-white/5">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}



        </div>
      </div>
    </div>
  );
}
