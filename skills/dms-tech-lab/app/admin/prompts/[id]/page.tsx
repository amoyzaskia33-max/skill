"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { IMAGE_SUBCATEGORIES, TEXT_SUBCATEGORIES, VIDEO_SUBCATEGORIES, VIBE_CODING_SUBCATEGORIES, GENERATION_TOOLS, getGenerationTool } from "@/lib/prompt-data";

export default function EditPromptPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  // Unwrap params using React.use()
  const { id } = use(params);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "Text",
    subcategory: "",
    description: "",
    promptContent: "",
    tags: "",
    isPremium: false,
    image: "",
    useCase: "",
    exampleOutput: "",
    tips: ""
  });
  
  const [selectedTool, setSelectedTool] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Handle Tool Change: Sync with Tags
  useEffect(() => {
    if (!isInitialized || !selectedTool) return;

    const currentTags = formData.tags.split(",").map(t => t.trim()).filter(Boolean);
    const cleanTags = currentTags.filter(t => !GENERATION_TOOLS.includes(t));
    cleanTags.push(selectedTool);
    
    setFormData(prev => ({
        ...prev,
        tags: cleanTags.join(", ")
    }));
  }, [selectedTool]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/prompts/${id}`);
        if (!res.ok) {
            if (res.status === 404) {
                alert("Prompt not found");
                router.push("/admin/prompts");
                return;
            }
            throw new Error("Failed to fetch prompt");
        }
        const data = await res.json();
        
        setFormData({
            title: data.title || "",
            category: data.category || "Text",
            subcategory: data.subcategory || "",
            description: data.description || "",
            promptContent: data.promptContent || "",
            tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
            isPremium: data.isPremium || false,
            image: data.image || "",
            useCase: data.useCase || "",
            exampleOutput: data.exampleOutput || "",
            tips: Array.isArray(data.tips) ? data.tips.join("\n") : ""
        });

        // Extract tool from tags
        const tools = (data.tags || []).filter((t: string) => GENERATION_TOOLS.includes(t));
        if (tools.length > 0) {
            setSelectedTool(tools[0]);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Error fetching prompt:", error);
        alert("Failed to load prompt data");
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/prompts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
            tips: formData.tips.split("\n").map(t => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) throw new Error("Failed to update prompt");
      
      router.push("/admin/prompts");
      router.refresh();
    } catch (error) {
      alert("프롬프트 수정 실패");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 이 프롬프트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) return;
    
    setLoading(true);
    try {
        const res = await fetch(`/api/admin/prompts/${id}`, {
            method: "DELETE",
        });
        
        if (!res.ok) throw new Error("Failed to delete prompt");
        
        router.push("/admin/prompts");
        router.refresh();
    } catch (error) {
        alert("삭제 실패");
        console.error(error);
        setLoading(false);
    }
  };

  if (fetching) {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-neon-sky" />
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32">
      <div className="flex items-center gap-4">
        <Link href="/admin/prompts" className="p-3 hover:bg-white/10 rounded-full text-white/50 transition-colors">
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold text-white">프롬프트 수정</h1>
            <p className="text-white/50 text-sm">등록된 프롬프트 내용을 수정합니다.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-10 shadow-2xl">
        
        {/* 기본 정보 */}
        <section className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-neon-sky rounded-full"></span>
                기본 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">제목 (Title) <span className="text-neon-sky">*</span></label>
                    <input 
                        required
                        type="text" 
                        className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-neon-sky/50 transition-all font-medium text-lg"
                        placeholder="예: 인스타그램 감성 글귀 생성기"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">카테고리 (Category) <span className="text-neon-sky">*</span></label>
                    <div className="relative">
                        <select 
                            className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors font-medium"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="Text" className="bg-gray-800">Text (글쓰기)</option>
                            <option value="Image" className="bg-gray-800">Image (이미지 생성)</option>
                            <option value="Video" className="bg-gray-800">Video (영상 생성)</option>
                            <option value="Vibe Coding" className="bg-gray-800">Vibe Coding (코드)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                            ▼
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">상세분류 (Subcategory)</label>
                <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">상세분류 (Subcategory)</label>
                    {formData.category === "Image" ? (
                        <div className="relative">
                            <select 
                                className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors font-medium"
                                value={formData.subcategory}
                                onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                            >
                                <option value="" className="bg-gray-800">선택 안함</option>
                                {IMAGE_SUBCATEGORIES.map(sub => (
                                    <option key={sub} value={sub} className="bg-gray-800">{sub}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                ▼
                            </div>
                        </div>
                    ) : formData.category === "Video" ? (
                        <div className="relative">
                            <select 
                                className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors font-medium"
                                value={formData.subcategory}
                                onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                            >
                                <option value="" className="bg-gray-800">선택 안함</option>
                                {VIDEO_SUBCATEGORIES.map(sub => (
                                    <option key={sub} value={sub} className="bg-gray-800">{sub}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                ▼
                            </div>
                        </div>
                    ) : formData.category === "Vibe Coding" ? (
                        <div className="relative">
                            <select 
                                className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors font-medium"
                                value={formData.subcategory}
                                onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                            >
                                <option value="" className="bg-gray-800">선택 안함</option>
                                {VIBE_CODING_SUBCATEGORIES.map(sub => (
                                    <option key={sub} value={sub} className="bg-gray-800">{sub}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                ▼
                            </div>
                        </div>
                    ) : formData.category === "Text" ? (
                        <div className="relative">
                            <select 
                                className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors font-medium"
                                value={formData.subcategory}
                                onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                            >
                                <option value="" className="bg-gray-800">선택 안함</option>
                                {TEXT_SUBCATEGORIES.map(sub => (
                                    <option key={sub.id} value={sub.id} className="bg-gray-800">{sub.name} ({sub.id})</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                ▼
                            </div>
                        </div>
                    ) : (
                        <input 
                            type="text" 
                            className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-neon-sky/50 transition-all"
                            placeholder="예: Marketing, Business, SEO"
                            value={formData.subcategory}
                            onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                        />
                    )}
                </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">태그 (Tags)</label>
                    <input 
                        type="text" 
                        className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-neon-sky/50 transition-all"
                        placeholder="예: SNS, Viral (쉼표로 구분)"
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    />
                </div>
            </div>

             <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">설명 (Description) <span className="text-neon-sky">*</span></label>
                <textarea 
                    required
                    className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-neon-sky/50 transition-all h-24 resize-none leading-relaxed"
                    placeholder="카드 목록에 표시될 짧은 설명을 입력하세요."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
            </div>


            {/* Image Upload */}
            <div className="space-y-4 pt-4">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-neon-sky" /> 썸네일 이미지 (Thumbnail Image)
                </label>
                
                <div className="flex flex-col gap-4">
                    {/* URL Input Method */}
                    <div className="flex gap-2">
                        <input 
                            type="url" 
                            className="flex-1 p-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-neon-sky/50 transition-all font-mono text-sm"
                            placeholder="이미지 URL을 직접 입력하거나 아래에 파일을 드래그하세요"
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                        />
                    </div>

                    {/* File Drop Area */}
                    <div className="border border-dashed border-white/20 rounded-2xl p-10 text-center hover:bg-white/5 transition-all relative group bg-black/20">
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                setLoading(true);
                                const data = new FormData();
                                data.append("file", file);

                                try {
                                    const res = await fetch("/api/upload", {
                                        method: "POST",
                                        body: data
                                    });
                                    
                                    // 응답 상태 확인
                                    if (!res.ok) {
                                        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
                                        alert(`업로드 실패 (${res.status}): ${errorData.error || '알 수 없는 오류'}\n\n팁: Vercel 배포 환경에서는 파일 직접 업로드가 제한될 수 있습니다. 위쪽 입력창에 이미지 URL을 직접 입력해주세요.`);
                                        return;
                                    }

                                    const json = await res.json();
                                    if(json.success) {
                                        setFormData(prev => ({ ...prev, image: json.url }));
                                    } else {
                                        alert(`Upload failed: ${json.error || 'Unknown error'}`);
                                    }
                                } catch (err) {
                                    console.error("Upload error:", err);
                                    alert(`업로드 중 오류 발생: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        />
                        <div className="pointer-events-none flex flex-col items-center gap-3 text-white/40 group-hover:text-neon-sky transition-colors">
                             <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                <ImageIcon className="w-6 h-6" />
                             </div>
                             <p className="font-medium text-white/80">클릭하거나 이미지를 이곳에 드래그하세요</p>
                             <p className="text-xs">JPG, PNG, GIF files supported</p>
                        </div>
                    </div>

                    {/* Preview Area */}
                    {formData.image && (
                        <div className="relative group w-full max-w-md h-64 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                                    className="px-4 py-2 bg-red-500/80 text-white rounded-lg text-sm hover:bg-red-600 font-bold backdrop-blur-sm"
                                >
                                    삭제
                                </button>
                                <a 
                                    href={formData.image} 
                                    target="_blank" 
                                    className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm hover:bg-white/30 font-bold backdrop-blur-sm"
                                >
                                    보기
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* 상세 내용 */}
        <section className="space-y-6 pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold text-white pb-2 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                프롬프트 상세
            </h2>
            
            <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">프롬프트 내용 (Prompt Content) <span className="text-neon-sky">*</span></label>
                <div className="relative">
                    <textarea 
                        required
                        className="w-full p-6 bg-black/20 border border-white/10 rounded-2xl text-white/90 placeholder:text-white/20 focus:outline-none focus:border-neon-sky/50 transition-all h-[400px] font-mono text-sm leading-relaxed resize-y"
                        placeholder="실제 프롬프트 내용을 입력하세요. (Markdown 지원)"
                        value={formData.promptContent}
                        onChange={(e) => setFormData({...formData, promptContent: e.target.value})}
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-white/30 pointer-events-none">
                        Markdown Supported
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-3">
                     <label className="text-sm font-medium text-white/70">사용 시점 (When to use)</label>
                     <input 
                        type="text"
                        className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-neon-sky/50 transition-all"
                        placeholder="예: 인스타그램 광고 문구를 작성할 때"
                        value={formData.useCase}
                        onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                    />
                </div>
                <div className="space-y-3">
                     <label className="text-sm font-medium text-white/70">결과 예시 (Example Output)</label>
                     <textarea 
                        className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-neon-sky/50 transition-all h-32 resize-none"
                        placeholder="프롬프트 실행 결과 예시를 간단히 적어주세요."
                        value={formData.exampleOutput}
                        onChange={(e) => setFormData({...formData, exampleOutput: e.target.value})}
                    />
                </div>
                 <div className="space-y-3">
                     <label className="text-sm font-medium text-white/70">활용 팁 (Tips)</label>
                     <textarea 
                        className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-neon-sky/50 transition-all h-24 resize-none"
                        placeholder="팁을 줄바꿈(Enter)으로 구분해서 입력하세요."
                        value={formData.tips}
                        onChange={(e) => setFormData({...formData, tips: e.target.value})}
                    />
                </div>
            </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/10 sticky bottom-0 bg-[#050B1B]/95 backdrop-blur-xl p-6 -mx-8 -mb-8 z-30 border-b border-white/5 rounded-b-3xl">
             <div className="flex items-center gap-2">
                 <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-white/80 hover:bg-white/5 px-4 py-2 rounded-lg transition-colors select-none">
                    <input 
                        type="checkbox"
                        checked={formData.isPremium}
                        onChange={(e) => setFormData({...formData, isPremium: e.target.checked})}
                        className="w-5 h-5 rounded border-white/30 bg-white/10 text-neon-sky focus:ring-neon-sky/50"
                    />
                    프리미엄 컨텐츠(Premium)
                 </label>
             </div>
             
             <div className="flex items-center gap-4">
                 <button 
                    type="button"
                    onClick={handleDelete}
                    className="px-6 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-medium transition-colors flex items-center gap-2"
                 >
                    <Trash2 className="w-5 h-5" />
                    삭제
                 </button>
                 <button type="button" onClick={() => router.back()} className="px-6 py-3 text-white/50 hover:text-white font-medium transition-colors">
                     취소
                 </button>
                 <button 
                    type="submit" 
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-neon-sky to-blue-600 text-[#050B1B] rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center gap-2 font-bold shadow-lg shadow-neon-sky/20 transition-all hover:-translate-y-0.5"
                 >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    저장하기
                 </button>
             </div>
        </div>

      </form>
    </div>
  );
}
