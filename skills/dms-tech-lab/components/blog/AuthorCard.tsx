import { Share2, Bookmark } from "lucide-react";

export default function AuthorCard() {
  return (
    <div className="mt-24 p-8 rounded-2xl bg-[#0A1124] border border-white/10 flex items-center gap-6 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative shrink-0">
            <img 
                src="/reedo-profile-high.png" 
                alt="Reedo"
                className="w-24 h-24 rounded-full object-cover border-2 border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500"
            />
        </div>
        <div className="flex-grow relative z-10">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Written by Reedo</h3>
            <p className="text-gray-400 text-sm mb-2">Global Field Engineer & Automation Architect</p>
            <p className="text-gray-500 text-xs leading-relaxed max-w-md">
                복잡한 코드 속에 담긴 단순한 진심을 찾습니다. 때론 실패하고 넘어지지만, 그 과정들이 모여 더 나은 내일을 만든다고 믿으며 묵묵히 기록합니다.
            </p>
        </div>
        <div className="flex flex-col gap-4 text-gray-400 relative z-10">
                <button className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" aria-label="Share">
                <Share2 className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" aria-label="Bookmark">
                <Bookmark className="w-5 h-5" />
                </button>
        </div>
    </div>
  );
}
