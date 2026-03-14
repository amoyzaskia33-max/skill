import { prisma } from "@/lib/prisma";
import { ArrowLeft, CheckCircle2, Download, PlayCircle, Star, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

// Force dynamic
export const dynamic = 'force-dynamic';

export default async function AutomationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const automation = await prisma.automation.findUnique({
    where: { id },
  });

  if (!automation) return notFound();

  // Cast detail to any to access the JSON structure
  const detail = automation.detail as any || {};
  
  const {
    howItWorks = "",
    keyFeatures = [],
    prerequisites = [],
    steps = [],
    jsonUrl = "",
    videoUrl = "",
    previewImage = ""
  } = detail;

  return (
    <div className="min-h-screen bg-[#050B1B] pb-32">
      {/* Navbar Placeholder/Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/automations" className="inline-flex items-center text-white/50 hover:text-white transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Templates
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Header Content */}
            <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    {automation.title}
                </h1>
                <p className="text-xl text-white/60 leading-relaxed">
                    {automation.description}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                    {jsonUrl && (
                        <a 
                            href={jsonUrl} 
                            target="_blank"
                            className="px-6 py-3 bg-[#FF4F26] text-white font-bold rounded-lg hover:bg-[#ff6b47] transition-colors flex items-center gap-2 shadow-lg shadow-[#FF4F26]/20"
                        >
                            <Download className="w-5 h-5" /> JSON Download
                        </a>
                    )}
                    {videoUrl && (
                        <a 
                            href={videoUrl}
                            target="_blank"
                            className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                            <PlayCircle className="w-5 h-5" /> Video
                        </a>
                    )}
                </div>
                
                {/* Meta */}
                <div className="border-t border-white/10 pt-8 mt-8 grid grid-cols-2 gap-8">
                    <div>
                        <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Created By</div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                                {automation.author.substring(0,2)}
                            </div>
                            <span className="text-white font-medium">{automation.author}</span>
                        </div>
                    </div>
                     <div>
                        <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Category</div>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
                            {automation.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl aspect-video">
                {previewImage ? (
                    <img 
                        src={previewImage} 
                        alt={automation.title} 
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                        No Preview Image
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-20 mt-20">
          
          {/* How It Works */}
          {howItWorks && (
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white">How it works</h2>
                <div className="text-white/80 leading-relaxed whitespace-pre-wrap text-lg">
                    {howItWorks}
                </div>
            </section>
          )}

          {/* Key Features */}
          {keyFeatures.length > 0 && (
            <section className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {keyFeatures.map((feature: any, idx: number) => (
                        <div key={idx} className="bg-[#0A1020] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors">
                            <div className="text-neon-sky font-bold text-lg mb-2 flex items-center gap-2">
                                <Star className="w-4 h-4 fill-neon-sky" />
                                {feature.title}
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
          )}

            {/* Prerequisites */}
          {prerequisites.length > 0 && (
            <section className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Prerequisites (선행 지식)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prerequisites.map((item: any, idx: number) => (
                        <div key={idx} className="bg-[#0A1020] border border-white/5 p-6 rounded-2xl flex items-start gap-4">
                             <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                             <div>
                                <div className="text-white font-bold mb-1">
                                    {item.title}
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                             </div>
                        </div>
                    ))}
                </div>
            </section>
          )}

          {/* Step by Step */}
          {steps.length > 0 && (
            <section className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Step-by-step</h2>
                <div className="space-y-6 relative">
                    <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/5" />
                    {steps.map((step: any, idx: number) => (
                        <div key={idx} className="relative flex gap-8 items-start group">
                             <div className="relative z-10 w-10 h-10 rounded-full bg-[#1A1D24] border border-white/10 flex items-center justify-center text-white font-bold shrink-0 group-hover:border-neon-sky group-hover:text-neon-sky transition-colors">
                                {idx + 1}
                             </div>
                             <div className="pt-2">
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-white/70 leading-relaxed">
                                    {step.description}
                                </p>
                             </div>
                        </div>
                    ))}
                </div>
            </section>
          )}

      </div>
    </div>
  );
}
