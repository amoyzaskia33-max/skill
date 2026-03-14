import VibeContainer from "@/components/vibe/VibeMain";

export default function VibeCodingPage() {
  return (
    <main className="w-full min-h-screen bg-[#050B1B] text-white font-poppins relative selection:bg-neon-sky selection:text-[#050B1B]">
      
      {/* Hero Section */}
      <section className="relative w-full pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B1B] via-[#050B1B]/80 to-[#050B1B] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.1),transparent_70%)] z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                Vibe <span className="text-neon-sky drop-shadow-[0_0_20px_rgba(14,165,233,0.5)]">Coding</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed drop-shadow-md">
                상상을 현실로 만드는 가장 빠른 방법.<br />
                AI와 함께 코딩의 바이브를 느껴보세요.
            </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-32 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B1B]/50 to-[#050B1B] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
            <VibeContainer />
        </div>
      </section>
    </main>
  );
}
