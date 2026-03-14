import { EDUCATION_TRACKS } from "@/lib/education-data";
import { getLessonBySlug } from "@/lib/education-fs";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { EducationMDXComponents } from "@/components/education/EducationMDXComponents";

interface PageProps {
    params: Promise<{
        trackId: string;
        lessonId: string;
    }>;
}

export default async function LessonPage({ params }: PageProps) {
    const { trackId, lessonId } = await params;
    const track = EDUCATION_TRACKS[trackId];
    
    if (!track) return notFound();

    // Use FS utility to find lesson in any chapter folder
    const lessonData = getLessonBySlug(trackId, lessonId);
    
    // Fallback if MDX file doesn't exist yet
    if (!lessonData) {
        return (
            <main className="min-h-screen bg-[#050B1B] text-white pt-32 px-6 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Lesson Content Not Found</h1>
                <p className="text-gray-400 mb-8">This lesson content is being prepared.</p>
                <Link href={`/education/${trackId}`} className="text-neon-sky hover:underline">
                    Back to Curriculum
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#050B1B] font-sans selection:bg-neon-sky selection:text-[#050B1B] py-20 relative overflow-x-hidden">
            
            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-[800px] z-0 pointer-events-none">
                {lessonData.frontmatter.coverImage ? (
                    <>
                        <Image
                            src={lessonData.frontmatter.coverImage}
                            alt="Background"
                            fill
                            className="object-cover opacity-50"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050B1B]/50 via-[#050B1B]/80 to-[#050B1B]" />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-b from-blue-900/10 to-transparent" />
                )}
            </div>
            
            {/* Navigation / Back Button (Floating) */}
            <div className="fixed top-8 left-8 z-50">
                <Link 
                    href={`/education/${trackId}`}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-[#0A1124]/50 backdrop-blur-md border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                    {track.title}
                </Link>
            </div>

            {/* Hero / Header Section (Original Style) */}
            <section className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-12 w-full text-center">
                <div className={`inline-block px-4 py-1.5 rounded-full bg-${track.color}-500/10 text-${track.color}-400 text-xs font-bold tracking-widest mb-6 border border-${track.color}-500/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                    {track.title.toUpperCase()} — LESSON
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8 break-keep">
                    {lessonData.frontmatter.title || "Untitled Lesson"}
                </h1>
                
                <div className="flex items-center justify-center gap-6 text-sm text-gray-400 font-medium">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        {lessonData.frontmatter.date || "2024.01.28"}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        {lessonData.frontmatter.duration || "10 min read"}
                    </div>
                </div>
            </section>

            {/* Main Content Card (White Paper) */}
            <article className="relative z-10 max-w-[900px] mx-auto bg-white rounded-[40px] shadow-2xl shadow-blue-900/10 overflow-hidden mb-20">
                
                {/* Content Body */}
                <div className="px-12 py-20">
                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-loose prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-md prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg">
                        <MDXRemote source={lessonData.content} components={EducationMDXComponents} />
                    </div>
                </div>

                {/* Footer / Pagination */}
                <div className="px-12 py-10 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-sm font-semibold text-slate-500">
                     <span>DMS Engineering Academy</span>
                     {/* Could add Next/Prev buttons here later */}
                </div>

            </article>
            
            {/* Bottom Spacing */}
            <div className="h-20" />
        </main>
    );
}
