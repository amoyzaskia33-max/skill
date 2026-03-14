"use client";

import { PromptItem } from "@/lib/prompt-data";
import { Copy, Check, Hash } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PromptCardProps {
  prompt: PromptItem;
  index?: number;
  onSelect?: (prompt: PromptItem) => void;
}

export default function PromptCard({ prompt, index, onSelect }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    navigator.clipboard.writeText(prompt.promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isVisual = !!prompt.image;

  // Visual Card (Image/Video) Style
  if (isVisual && prompt.image) {
    return (
        <div 
            onClick={() => {
              // onSelect가 있으면 상세 화면으로 이동, 없으면 토글
              if (onSelect) {
                onSelect(prompt);
              } else {
                setIsRevealed(!isRevealed);
              }
            }}
            className="relative h-80 rounded-xl overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white/40 transition-all shadow-lg"
        >
            {/* Background Image */}
            <Image
                src={prompt.image}
                alt={prompt.title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Default Overlay (Title) */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300",
                isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
                <div className="transform translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-bold text-neon-sky mb-2 block uppercase tracking-wider">{prompt.category} Prompt</span>
                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">{prompt.title}</h3>
                    <p className="text-gray-300 text-xs line-clamp-1">{prompt.description}</p>
                    
                    {onSelect && (
                      <div className="mt-4 flex items-center text-xs text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                          클릭하여 상세 정보 확인
                      </div>
                    )}
                    {!onSelect && (
                      <div className="mt-4 flex items-center text-xs text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                          클릭하여 프롬프트 확인
                      </div>
                    )}
                </div>
            </div>

            {/* Revealed Overlay (Prompt Text) - onSelect가 없을 때만 표시 */}
            {!onSelect && (
              <div className={cn(
                  "absolute inset-0 bg-[#0E0C15]/95 p-6 flex flex-col justify-between transition-opacity duration-300 backdrop-blur-sm",
                  isRevealed ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              )}>
                  <div className="overflow-y-auto custom-scrollbar pr-2 h-full">
                      <p className="text-gray-300 text-sm font-mono leading-relaxed whitespace-pre-wrap">
                          {prompt.promptContent}
                      </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center shrink-0">
                      <span className="text-xs text-gray-500">English Prompt</span>
                      <button 
                          onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(e);
                          }}
                          className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                              copied 
                                  ? "bg-green-500/20 text-green-400 border border-green-500/50" 
                                  : "bg-white text-black hover:bg-gray-200"
                          )}
                      >
                          {copied ? (
                              <>
                                  <Check className="w-4 h-4" /> 복사됨
                              </>
                          ) : (
                              <>
                                  <Copy className="w-4 h-4" /> 프롬프트 복사
                              </>
                          )}
                      </button>
                  </div>
              </div>
            )}
        </div>
    );
  }

  // Text/Code Card Style (Standard) - 이미지가 없을 때
  return (
    <div 
        onClick={() => onSelect && onSelect(prompt)}
        className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border-2 border-white/20 hover:border-neon-purple/50 transition-all duration-300 flex flex-col group overflow-hidden relative p-6 shadow-lg cursor-pointer"
    >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
            
            {/* Header */}
            <div className="flex justify-between items-start mb-4 relative z-10">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded bg-white/20 backdrop-blur-sm text-gray-300 border-2 border-white/30`}>
                    {prompt.category}
                </span>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(e);
                    }}
                    className="text-gray-300 hover:text-white transition-colors p-1.5 hover:bg-white/20 rounded-md backdrop-blur-sm"
                    title="Copy Prompt"
                >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-neon-purple transition-colors drop-shadow-sm relative z-10">
                {prompt.title}
            </h3>
            <p className="text-gray-300 text-sm mb-6 line-clamp-2 relative z-10">
                {prompt.description}
            </p>

            {/* Prompt Preview Area */}
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 mb-4 border-2 border-white/10 font-mono text-xs text-gray-200 leading-relaxed max-h-32 overflow-y-auto custom-scrollbar relative z-10">
                {prompt.promptContent}
            </div>
            
            <div className="mt-auto relative z-10">
                 <div className="flex flex-wrap gap-2">
                    {prompt.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-gray-400 hover:text-gray-300 transition-colors flex items-center font-medium">
                            <Hash className="w-2.5 h-2.5 mr-0.5 opacity-60" /> {tag}
                        </span>
                    ))}
                 </div>
            </div>
    </div>
  );
}
