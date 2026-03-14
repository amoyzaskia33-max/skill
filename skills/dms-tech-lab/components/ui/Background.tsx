"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full bg-[#030014] overflow-hidden">
      {/* Aurora Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-indigo/20 blur-[120px] animate-aurora-1" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/20 blur-[120px] animate-aurora-2" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] rounded-full bg-neon-sky/10 blur-[120px] animate-aurora-3" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 z-[1] opacity-20 bg-noise mix-blend-overlay pointer-events-none" />
      
      {/* Grid Overlay (Optional for structure) */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />
    </div>
  );
}
