import { EDUCATION_TRACKS } from "@/lib/education-data";
import { getCourseStructure } from "@/lib/education-fs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock,  ChevronDown } from "lucide-react";
import EducationAccordion from "@/components/education/EducationAccordion";

interface PageProps {
    params: Promise<{
        trackId: string;
    }>;
}

export default async function EducationTrackPage({ params }: PageProps) {
    const { trackId } = await params;
    const track = EDUCATION_TRACKS[trackId];
    
    // Validate Track
    if (!track) {
        return notFound();
    }

    // Get Dynamic Curriculum from File System
    const course = getCourseStructure(trackId);
    if (!course || course.chapters.length === 0) {
        // Fallback or empty state
        return (
             <main className="min-h-screen bg-[#050B1B] text-white pt-32 pb-20">
                 <div className="text-center">Course content is being prepared.</div>
             </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#050B1B] text-white pt-32 pb-20">
            {/* Header / Hero */}
            <div className="max-w-4xl mx-auto px-6 mb-16">
                <Link href="/education" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tracks
                </Link>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className={`relative w-24 h-32 md:w-32 md:h-44 rounded-xl overflow-hidden shadow-2xl shrink-0 border-2 border-${track.color}-500/30`}>
                        <Image src={track.image} alt={track.title} fill className="object-cover" />
                        <div className={`absolute inset-0 bg-${track.color}-900/40`} />
                    </div>
                    
                    <div>
                        <div className={`inline-block px-3 py-1 rounded-full bg-${track.color}-500/20 text-${track.color}-400 text-xs font-bold tracking-widest mb-4 border border-${track.color}-500/30`}>
                            VOL. {track.vol}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{track.title}</h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                            {track.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Dynamic Chapter List (Accordion) */}
            <div className="max-w-3xl mx-auto px-6">
                <EducationAccordion 
                    chapters={course.chapters} 
                    trackId={trackId} 
                    color={track.color} 
                />
            </div>
        </main>
    );
}
