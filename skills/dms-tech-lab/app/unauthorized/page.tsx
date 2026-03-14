import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
        <ShieldAlert className="w-10 h-10 text-red-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">접근 권한이 없습니다</h1>
        <p className="text-white/60 max-w-md mx-auto">
          이 페이지에 접근할 수 있는 권한이 확인되지 않았습니다.<br />
          관리자 계정으로 로그인해 주세요.
        </p>
      </div>
      <div className="flex gap-4">
        <Link 
            href="/"
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
        >
            홈으로 돌아가기
        </Link>
        <Link 
            href="/auth/signin?callbackUrl=/admin/prompts"
            className="px-6 py-3 rounded-xl bg-neon-sky text-[#050B1B] font-bold hover:bg-white transition-colors"
        >
            로그인 페이지로 이동
        </Link>
      </div>
    </div>
  );
}
