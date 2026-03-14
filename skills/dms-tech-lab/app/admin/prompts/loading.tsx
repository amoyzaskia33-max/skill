import { Loader2 } from "lucide-react";

export default function AdminPromptsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between relative z-10">
        <div>
            <div className="h-8 w-48 bg-white/10 rounded-lg mb-2"></div>
            <div className="h-4 w-64 bg-white/5 rounded-lg"></div>
        </div>
        <div className="w-40 h-12 bg-white/10 rounded-xl"></div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white/30">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm">데이터를 불러오는 중...</span>
        </div>
      </div>
    </div>
  );
}
