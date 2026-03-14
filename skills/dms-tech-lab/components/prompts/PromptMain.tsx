"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { PromptCategory, PromptItem, IMAGE_SUBCATEGORIES, TEXT_SUBCATEGORIES, VIDEO_SUBCATEGORIES, VIBE_CODING_SUBCATEGORIES } from "@/lib/prompt-data";
import PromptCard from "./PromptCard";
import TextPromptDetail from "./text/TextPromptDetail";
import { Search, Type, ImageIcon, Video, Code2 } from "lucide-react";

interface PromptContainerProps {
  initialPrompts: PromptItem[];
}

// Category icons mapping
const categoryIcons: Record<PromptCategory, React.ReactNode> = {
  "All": <Type className="w-4 h-4" />,
  "Text": <Type className="w-4 h-4" />,
  "Image": <ImageIcon className="w-4 h-4" />,
  "Video": <Video className="w-4 h-4" />,
  "Vibe Coding": <Code2 className="w-4 h-4" />,
};

export default function PromptContainer({ initialPrompts }: PromptContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>("All");
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // URL State Management
  const activePromptId = searchParams.get("promptId");
  const activePrompt = activePromptId ? initialPrompts.find(p => p.id === activePromptId) : null;

  // Reset subcategory when main category changes
  useEffect(() => {
    setSubCategory(null);
  }, [selectedCategory]);

  // Filter Prompts
  const filteredPrompts = initialPrompts.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSubCategory = !subCategory || p.subcategory === subCategory;
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  const categories: PromptCategory[] = ["All", "Text", "Image", "Video", "Vibe Coding"];



  // Navigation Handlers
  const handlePromptSelect = (prompt: PromptItem) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("promptId", prompt.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("promptId");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">

      {/* Left Sidebar - Always visible */}
      <aside className="lg:w-56 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-500">
        <h3 className="text-neon-sky font-bold text-lg mb-4">카테고리</h3>
        <nav className="space-y-1">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                   setSelectedCategory(category);
                   handleBack(); // Reset detail view when changing category
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isSelected
                    ? "bg-neon-sky/20 text-neon-sky border-l-2 border-neon-sky"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {categoryIcons[category]}
                <span>{category}</span>
                {isSelected && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-neon-sky" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Right Content Area */}
      <div className="flex-1 min-w-0">
        
        {activePrompt ? (
             /* Detail View (In-Page) */
             <TextPromptDetail
                prompt={activePrompt}
                onBack={handleBack}
             />
        ) : (
             /* List View */
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-sky/50 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Header with back button if subcategory selected */}
                <div className="mb-6">
                  {subCategory && (
                    <button
                      onClick={() => setSubCategory(null)}
                      className="text-gray-400 hover:text-white text-sm mb-2 flex items-center gap-1"
                    >
                      ← 카테고리로 돌아가기
                    </button>
                  )}
                  <h2 className="text-2xl font-bold text-white">
                    {subCategory
                      ? (selectedCategory === "Text" 
                          ? TEXT_SUBCATEGORIES.find(s => s.id === subCategory)?.name 
                          : subCategory) || "Prompt Collection"
                      : "Prompt Collection"
                    }
                  </h2>
                  <p className="text-neon-sky text-sm">{filteredPrompts.length} prompts available</p>
                </div>

                {/* Subcategory Filter Pills (Unified for ALL categories) */}
                {selectedCategory !== "All" && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    <button
                      onClick={() => setSubCategory(null)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                        ${!subCategory
                          ? "bg-neon-sky text-[#050B1B]"
                          : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      전체
                    </button>
                    {(selectedCategory === "Text" ? TEXT_SUBCATEGORIES :
                      selectedCategory === "Image" ? IMAGE_SUBCATEGORIES :
                      selectedCategory === "Video" ? VIDEO_SUBCATEGORIES :
                      selectedCategory === "Vibe Coding" ? VIBE_CODING_SUBCATEGORIES : []
                    ).map((sub: any) => {
                      // Handle both string arrays and object arrays (for Text)
                      const subName = typeof sub === 'string' ? sub : sub.name;
                      const subId = typeof sub === 'string' ? sub : sub.id;
                      
                      const isActive = subCategory === subId;
                      return (
                        <button
                          key={subId}
                          onClick={() => setSubCategory(subId)}
                          className={`
                            px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                            ${isActive
                              ? "bg-white text-black"
                              : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                            }
                          `}
                        >
                          {subName}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Prompts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      onSelect={() => handlePromptSelect(prompt)}
                    />
                  ))}

                  {filteredPrompts.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                        <span className="text-2xl text-white/20">?</span>
                      </div>
                      <p className="text-white/40">해당하는 프롬프트가 없습니다.</p>
                    </div>
                  )}
                </div>
             </div>
        )}
      </div>
    </div>
  );
}
