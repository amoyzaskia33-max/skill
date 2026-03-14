import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

// Force dynamic rendering to always check session
export const dynamic = 'force-dynamic';

export default async function AdminAutomationPage() {
  const automations = await prisma.automation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">자동화 관리</h1>
            <p className="text-white/50 text-sm">등록된 자동화 템플릿을 조회합니다.</p>
        </div>
        <Link 
            href="/admin/automation/new"
            className="px-4 py-2 bg-gradient-to-r from-neon-sky to-blue-600 text-black font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
        >
            + New Template
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-black/20 text-white/40 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-8 py-5 font-semibold">Title</th>
              <th className="px-8 py-5 font-semibold">Category</th>
              <th className="px-8 py-5 font-semibold">Author</th>
              <th className="px-8 py-5 font-semibold">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {automations.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-white/30">
                  등록된 자동화 템플릿이 없습니다.
                </td>
              </tr>
            ) : (
              automations.map(automation => (
                <tr key={automation.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <Link href={`/admin/automation/${automation.id}`} className="block group-hover:text-neon-sky transition-colors">
                        <div className="font-bold text-white text-lg">
                        {automation.title}
                        </div>
                        <div className="text-white/40 text-xs mt-1 line-clamp-1">
                        {automation.description}
                        </div>
                    </Link>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                      {automation.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-white/70">
                    {automation.author}
                  </td>
                  <td className="px-8 py-5 text-white/40 font-mono text-xs">
                    {formatDate(automation.createdAt)}
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
