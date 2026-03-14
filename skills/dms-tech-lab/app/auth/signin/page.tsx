"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAdmin, setShowAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check for OAuth errors in URL
  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError === "OAuthCallback") {
      setError("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } else if (urlError === "OAuthAccountNotLinked") {
      setError("이미 다른 방법으로 가입된 이메일입니다. 기존 로그인 방식을 사용해주세요.");
    } else if (urlError) {
      setError("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  }, [searchParams]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setLoading(false);
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        return;
      }

      if (result?.ok) {
        // Get callbackUrl from URL or default to /admin/users
        const callbackUrl = searchParams.get("callbackUrl") || "/admin/users";
        
        // Refresh session ensuring cookies are set
        try {
            await fetch("/api/auth/session");
        } catch (e) {
            // ignore session fetch error
        }
        
        // Use client-side navigation instead of full reload for speed
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("로그인 처리 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 w-full max-w-md"
    >
      {/* Logo & Header */}
      <div className="text-center mb-10">
        <Link href="/" className="inline-block mb-6">
          <span className="text-3xl font-bold text-white">DMS<span className="text-neon-sky">.LAB</span></span>
        </Link>
        <h1 className="text-2xl font-bold text-white mb-2">로그인</h1>
        <p className="text-white/50 text-sm">소셜 계정으로 간편하게 시작하세요</p>
      </div>

      {/* Login Card */}
      <div className="glass-panel rounded-2xl p-8 space-y-4 relative z-20">
        {/* OAuth Error Message */}
        {error && !showAdmin && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Google Login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-medium py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Google로 계속하기</span>
        </button>

        {/* Kakao Login */}
        <button
          onClick={() => signIn("kakao", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] font-medium py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#191919"
              d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.88 5.31 4.7 6.7-.15.56-.95 3.56-1 3.76 0 .06.02.13.07.17.06.05.14.06.21.03.28-.05 3.23-2.11 3.73-2.46.75.11 1.52.17 2.29.17 5.52 0 10-3.58 10-8s-4.48-8-10-8z"
            />
          </svg>
          <span>카카오로 계속하기</span>
        </button>

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-transparent text-white/30">또는</span>
          </div>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/60 hover:text-white font-medium py-4 px-6 rounded-xl transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>홈으로 돌아가기</span>
        </Link>

        {/* Admin Login Toggle */}
        <div className="pt-4 text-center">
          <button
              onClick={() => setShowAdmin(!showAdmin)}
              className="text-xs text-white/20 hover:text-white/50 transition-colors"
          >
              {showAdmin ? "소셜 로그인으로 돌아가기" : "관리자 로그인"}
          </button>
        </div>

        {/* Admin Login Form */}
        {showAdmin && (
          <form onSubmit={handleAdminLogin} className="space-y-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div>
                  <input
                      type="email"
                      placeholder="Admin Email"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-neon-sky/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div>
                  <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-neon-sky/50"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                  {loading ? "로그인 중..." : "Admin Login"}
              </button>
          </form>
        )}

      </div>

      {/* Footer */}
      <p className="text-center text-white/30 text-xs mt-8">
        로그인 시 <Link href="/terms" className="text-white/50 hover:text-neon-sky transition-colors underline underline-offset-2">이용약관</Link> 및{" "}
        <Link href="/privacy" className="text-white/50 hover:text-neon-sky transition-colors underline underline-offset-2">개인정보처리방침</Link>에 동의합니다.
      </p>
    </motion.div>
  );
}

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-deep-space flex items-center justify-center px-6 relative overflow-hidden z-10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-deep-space to-neon-sky/5" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-sky/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-purple/10 blur-[100px] rounded-full" />

      <Suspense fallback={
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="text-white/50">로딩 중...</div>
        </div>
      }>
        <SignInContent />
      </Suspense>
    </main>
  );
}
