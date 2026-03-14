"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { navLinks } from "@/constants/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLightPage = pathname === "/about";
  const isAdminPage = pathname?.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 메모이제이션: 동적 스타일 계산
  const navStyles = useMemo(() => ({
    container: `w-full pointer-events-auto transition-all duration-300 ${
      isScrolled || isLightPage
      ? "bg-[#050B1B] border-b border-white/5 py-4 shadow-lg"
      : "bg-transparent py-6"
    }`,
    textColor: "text-white",
    linkTextColor: "text-white/80",
    linkHoverColor: "hover:text-white",
    borderColor: "border-white/30",
  }), [isScrolled, isLightPage]);

  // 메모이제이션: 이벤트 핸들러
  const handleMenuOpen = useCallback(() => setIsMobileMenuOpen(true), []);
  const handleMenuClose = useCallback(() => setIsMobileMenuOpen(false), []);

  // Hide Navbar on Admin pages (after all hooks)
  if (isAdminPage) return null;

  // Dynamic colors based on page and scroll state
  // User requested "Like the first image" -> Always White text, Dark Background on About.
  // We remove the "Light Page" text color logic and instead force the Background to be dark on About.

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        role="navigation"
        aria-label="메인 네비게이션"
      >
        <div className={navStyles.container}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            
            {/* Logo - Left */}
            <Link href="/" className="text-2xl font-bold tracking-tight text-white group flex items-center gap-2" aria-label="DMS.LAB 홈으로 이동">
                {/* Logo mark similar to reference dots */}
                <div className="flex flex-col gap-[2px]">
                    <div className="flex gap-[2px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-sky" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </div>
                    <div className="flex gap-[2px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-sky" />
                    </div>
                </div>
                <span className="font-poppins">DMS<span className="text-neon-sky">.LAB</span></span>
            </Link>

            {/* Desktop Menu - Center */}
            <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2" aria-label="메인 메뉴">
                {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[15px] font-medium transition-colors ${navStyles.linkTextColor} ${navStyles.linkHoverColor}`}
                    aria-current={pathname === link.href ? "page" : undefined}
                >
                    {link.name}
                </Link>
                ))}
            </nav>

            {/* Right Group: Auth & Contact */}
            <div className="flex items-center gap-4">
            
            {/* Auth Button (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
                {session ? (
                    <div className="flex items-center gap-3">
                        {session.user?.image && (
                            <Image
                                src={session.user.image}
                                alt="Profile"
                                width={32}
                                height={32}
                                unoptimized
                                className="w-8 h-8 rounded-full border border-white/20"
                            />
                        )}
                        <button
                            onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                            suppressHydrationWarning
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/auth/signin"
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                        Login
                    </Link>
                )}

                {/* Contact CTA */}
                <a
                    href="https://open.kakao.com/o/sSPHn33g"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="무료 상담 신청하기 (새 창에서 열림)"
                    className={`flex items-center gap-2 px-5 py-2 rounded-full border ${navStyles.borderColor} ${navStyles.textColor} font-medium text-sm hover:bg-neon-sky hover:text-[#050B1B] hover:border-neon-sky transition-all`}
                >
                    무료 상담 신청
                </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className={`md:hidden p-2 ${navStyles.textColor}`}
                onClick={handleMenuOpen}
                aria-label="메뉴 열기"
                aria-expanded={isMobileMenuOpen}
                suppressHydrationWarning
            >
                <Menu className="w-6 h-6" />
            </button>
            </div>

            </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#050B1B] p-6 md:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={handleMenuClose}
                className="p-2 text-white"
                aria-label="메뉴 닫기"
                suppressHydrationWarning
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <nav className="flex flex-col gap-8 text-center mt-12" aria-label="모바일 메뉴 네비게이션">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleMenuClose}
                  className="text-2xl font-bold text-white/80 hover:text-neon-sky transition-colors"
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <a
                  href="https://open.kakao.com/o/sSPHn33g"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMenuClose}
                  className="mt-8 px-8 py-4 bg-neon-sky text-[#050B1B] font-bold rounded-full text-lg"
                  aria-label="무료 상담 신청하기 (새 창에서 열림)"
              >
                무료 상담 신청
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
