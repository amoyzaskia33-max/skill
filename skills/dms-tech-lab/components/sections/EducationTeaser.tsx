"use client";

import Link from "next/link";
import type { EducationTrack } from "@/lib/education-data";
import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

interface EducationTeaserProps {
  tracks: EducationTrack[];
  variant: "a" | "b";
}

export default function EducationTeaser({ tracks, variant }: EducationTeaserProps) {
  if (tracks.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-20 px-6 bg-[#050B1B]" aria-label="교육 트랙 미리보기">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-neon-sky text-sm font-semibold tracking-widest uppercase mb-3">Learning Tracks</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">교육 트랙 미리보기</h2>
            <p className="text-white/60 mt-3">팀의 실무 역량을 빠르게 끌어올릴 수 있는 핵심 트랙을 먼저 확인하세요.</p>
          </div>
          <Link
            href="/education"
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.CONTENT_TEASER_CLICK, {
                section: "education_teaser",
                content_type: "list",
                item_id: "all",
                position: "header",
                destination: "/education",
                variant,
              })
            }
            className="hidden md:inline-flex px-5 py-2.5 rounded-xl border border-white/15 text-white/85 hover:border-neon-sky/40 hover:text-white transition-colors"
          >
            전체 커리큘럼 보기
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <article key={track.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 group">
              <p className="text-xs text-neon-sky mb-3">VOL. {track.vol}</p>
              <h3 className="text-white text-xl font-bold mb-3">{track.title}</h3>
              <p className="text-white/60 text-sm line-clamp-3 mb-4">{track.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {track.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-xs border border-white/15 text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
              {track.externalLink ? (
                <a
                  href={track.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent(ANALYTICS_EVENTS.CONTENT_TEASER_CLICK, {
                      section: "education_teaser",
                      content_type: "track",
                      item_id: track.id,
                      position: index + 1,
                      destination: track.externalLink || "",
                      variant,
                    })
                  }
                  className="inline-flex px-4 py-2 rounded-lg border border-neon-sky/35 text-neon-sky hover:bg-neon-sky/10 transition-colors"
                >
                  바로가기
                </a>
              ) : (
              <Link
                href={`/education/${track.id}`}
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.CONTENT_TEASER_CLICK, {
                    section: "education_teaser",
                    content_type: "track",
                    item_id: track.id,
                    position: index + 1,
                    destination: `/education/${track.id}`,
                    variant,
                  })
                }
                className="inline-flex px-4 py-2 rounded-lg border border-neon-sky/35 text-neon-sky hover:bg-neon-sky/10 transition-colors"
              >
                트랙 상세 보기
              </Link>
              )}
            </article>
          ))}
        </div>

        <div className="md:hidden mt-6">
          <Link
            href="/education"
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.CONTENT_TEASER_CLICK, {
                section: "education_teaser",
                content_type: "list",
                item_id: "all",
                position: "footer",
                destination: "/education",
                variant,
              })
            }
            className="inline-flex px-5 py-2.5 rounded-xl border border-white/15 text-white/85 hover:border-neon-sky/40 hover:text-white transition-colors"
          >
            전체 커리큘럼 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
