"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  // Hide Footer on Admin pages
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="w-full border-t border-white/10 bg-[#050B1B] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-white text-xl mb-4">DMS.LAB</h4>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              Design the Unseen, 보이지 않는 것을 현실로.<br />
              기술을 만드는 것이 아니라, 비즈니스의 속도와 결과를 만듭니다.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Navigation</h5>
            <ul className="space-y-3 text-white/50 text-sm">
              <li><Link href="/about" className="hover:text-neon-sky transition-colors">About</Link></li>
              <li><Link href="/services" className="hover:text-neon-sky transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-neon-sky transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-neon-sky transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Connect</h5>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-neon-sky hover:border-neon-sky hover:text-[#050B1B] text-white/60 transition-all text-sm font-bold"
              >
                IG
              </a>
              <a
                href="https://youtube.com/@reedoinvest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-neon-sky hover:border-neon-sky hover:text-[#050B1B] text-white/60 transition-all text-sm font-bold"
              >
                YT
              </a>
              <a
                href="https://open.kakao.com/o/sSPHn33g"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FEE500] hover:border-[#FEE500] hover:text-[#3C1E1E] text-white/60 transition-all text-sm font-bold"
              >
                KT
              </a>
            </div>
            <p className="text-white/40 text-xs mt-4 font-mono">Reedo Invest</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} DMS Solution. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/40 text-xs font-mono">
            <Link href="/privacy" className="hover:text-white transition-colors">PRIVACY</Link>
            <Link href="/terms" className="hover:text-white transition-colors">TERMS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
