"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Clock, PlayCircle } from "lucide-react";
import { FSChapter } from "@/lib/education-fs";

interface EducationAccordionProps {
  chapters: FSChapter[];
  trackId: string;
  color: string;
}

export default function EducationAccordion({ chapters, trackId, color }: EducationAccordionProps) {
  // State to track which chapter is open. null means all closed. 
  // defaulting to first chapter open? or all closed? Let's default to first open.
  const [openChapterId, setOpenChapterId] = useState<string | null>(chapters[0]?.id || null);

  const toggleChapter = (id: string) => {
    setOpenChapterId(openChapterId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {chapters.map((chapter, index) => {
        const isOpen = openChapterId === chapter.id;

        return (
          <div 
            key={chapter.id} 
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'bg-teal-900/40 border-teal-500/40' : 'bg-teal-900/20 border-teal-500/20 hover:border-teal-500/30'}`}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm border transition-colors
                  ${isOpen 
                    ? `bg-${color}-500 text-white border-${color}-500` 
                    : `bg-white/5 text-gray-400 border-white/10`
                  }`}
                >
                  {index + 1}
                </span>
                <span className={`text-xl font-bold transition-colors ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                  {chapter.title}
                </span>
              </div>
              
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
            </button>

            {/* Accordion Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2 space-y-2 border-t border-white/5">
                    {chapter.lessons.length === 0 ? (
                        <div className="py-4 text-gray-600 text-sm ml-12 italic">
                            Coming Soon
                        </div>
                    ) : (
                        chapter.lessons.map((lesson) => (
                        <Link 
                            key={lesson.slug} 
                            href={`/education/${trackId}/${lesson.slug}`}
                            className="group flex items-start justify-between p-3 rounded-lg hover:bg-white/5 transition-colors ml-0 md:ml-12"
                        >
                            <div className="flex items-start gap-3">
                                <PlayCircle className="w-5 h-5 text-gray-600 group-hover:text-neon-sky mt-1 transition-colors" />
                                <div>
                                    <h4 className="text-gray-300 group-hover:text-white transition-colors font-medium">
                                        {lesson.title}
                                    </h4>
                                    {lesson.description && (
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                            {lesson.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center text-xs text-gray-600 group-hover:text-gray-400 transition-colors bg-white/5 px-2 py-1 rounded shrink-0">
                                <Clock className="w-3 h-3 mr-1" />
                                {lesson.duration}
                            </div>
                        </Link>
                        ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
