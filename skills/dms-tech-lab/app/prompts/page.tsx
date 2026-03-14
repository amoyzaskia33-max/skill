import PromptContainer from "@/components/prompts/PromptMain";
import { Suspense } from "react";
import { getAllPromptsFromFiles } from "@/lib/prompt-content";
import { PROMPTS as STATIC_PROMPTS } from "@/lib/prompt-data";
import { getPromptsFromDB } from "@/lib/prompt-db";

// Cache the page for 5 minutes, then regenerate in background
export const revalidate = 300;

export default async function PromptLibraryPage() {
  // 1. Fetch File-based Prompts (Text Prompts from content/prompts)
  const filePrompts = await getAllPromptsFromFiles();

  // 2. Fetch DB Prompts (From Admin Dashboard)
  const dbPrompts = await getPromptsFromDB();

  // 3. Get Static Prompts (Image, Video, Vibe, etc.)
  // Exclude "Text" category from static if we are fully migrating Text to files/db
  const staticPrompts = STATIC_PROMPTS.filter(p => p.category !== "Text");

  // 4. Combine (DB First, then Files, then Static)
  const allPrompts = [...dbPrompts, ...filePrompts, ...staticPrompts];

  return (
    <main className="w-full min-h-screen bg-[#050B1B] text-white font-poppins relative selection:bg-neon-purple selection:text-white">
      
      {/* Hero Section */}
      <section className="relative w-full pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B1B] via-[#050B1B]/80 to-[#050B1B] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_70%)] z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                Prompt <span className="text-neon-purple drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">Library</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed drop-shadow-md">
                검증된 프롬프트로 업무 효율을 극대화하세요.<br />
                Text, Image, Video, Coding까지 모든 영역을 커버합니다.
            </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-32 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B1B]/50 to-[#050B1B] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
            <Suspense fallback={<div className="text-white text-center py-20">Loading prompts...</div>}>
                <PromptContainer initialPrompts={allPrompts} />
            </Suspense>
        </div>
      </section>
    </main>
  );
}
