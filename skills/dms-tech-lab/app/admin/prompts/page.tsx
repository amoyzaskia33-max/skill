import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import type { Prompt } from "@prisma/client";

// Force dynamic rendering to always check session
export const dynamic = 'force-dynamic';

async function PromptsList() {
  // Fetch prompts from DB with error handling
  let prompts: Prompt[] = [];
  try {
    const result = await prisma.prompt.findMany({
      orderBy: { createdAt: "desc" },
    });
    prompts = result;
  } catch (error) {
    console.error("Failed to fetch prompts:", error);
    // Continue with empty array instead of crashing
    prompts = [];
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-black/20 text-white/40 text-xs uppercase tracking-wider">
          <tr>
            <th className="px-8 py-5 font-semibold">Title</th>
            <th className="px-8 py-5 font-semibold">Category</th>
            <th className="px-8 py-5 font-semibold">Created</th>
            <th className="px-8 py-5 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {prompts.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-8 py-12 text-center text-white/30">
                등록된 프롬프트가 없습니다.<br />
                우측 상단 버튼을 눌러 새로 만들어보세요!
              </td>
            </tr>
          ) : (
            prompts.map(prompt => (
              <tr key={prompt.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-white text-lg group-hover:text-neon-sky transition-colors">
                      {prompt.title}
                    </div>
                    {prompt.isPremium && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-[10px] font-bold border border-yellow-500/30">
                        PREMIUM
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                      {prompt.category}
                    </span>
                    {prompt.subcategory && (
                      <span className="text-white/40 text-xs">
                        / {prompt.subcategory}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-5 text-white/40 font-mono text-xs">
                  {formatDate(prompt.createdAt)}
                </td>
                <td className="px-8 py-5 text-right">
                  <Link href={`/admin/prompts/${prompt.id}`} prefetch={false} className="text-white/50 hover:text-white transition-colors underline decoration-white/30 hover:decoration-white underline-offset-4">
                    수정
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default async function AdminPromptsPage() {
  // Layout guard is sufficient (admin/layout.tsx)
  // No need to fetch session again here, reducing TTFB

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between relative z-10">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">프롬프트 관리</h1>
            <p className="text-white/50 text-sm">등록된 프롬프트를 조회하고 관리합니다.</p>
        </div>
        <a href="/admin/prompts/new" className="px-6 py-3 bg-neon-sky text-[#050B1B] font-bold rounded-xl flex items-center gap-2 hover:bg-white transition-all shadow-lg shadow-neon-sky/20 cursor-pointer relative z-50">
            <Plus className="w-5 h-5" /> 새 프롬프트 작성
        </a>
      </div>

      <Suspense fallback={
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center">
          <div className="text-white/50">로딩 중...</div>
        </div>
      }>
        <PromptsList />
      </Suspense>
    </div>
  );
}
