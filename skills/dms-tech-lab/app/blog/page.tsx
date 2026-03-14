import SeriesList from "@/components/blog/SeriesList";
import { BLOG_SERIES } from "@/lib/blog-data";
import { getAllPosts } from "@/lib/mdx";

export default async function BlogPage() {
  const allPosts = await getAllPosts();

  const seriesCountMap = allPosts.reduce<Record<string, number>>((acc, post) => {
    const seriesId = post.frontMatter.series;
    if (!seriesId) {
      return acc;
    }

    acc[seriesId] = (acc[seriesId] || 0) + 1;
    return acc;
  }, {});

  // Calculate post count for each series
  const seriesWithCount = Object.values(BLOG_SERIES).map((series) => {
    const count = seriesCountMap[series.id] || 0;
    return {
      ...series,
      postCount: count,
    };
  });

  return (
    <main className="w-full min-h-screen bg-[#050B1B] text-white font-poppins selection:bg-neon-sky selection:text-[#050B1B] relative">
      {/* Content wrapper */}
      <div>
        {/* 1. Hero Section */}
        <section className="relative w-full pt-40 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050B1B] via-[#050B1B]/80 to-[#050B1B] z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,209,255,0.15),transparent_70%)] z-0" />

          <div className="max-w-7xl mx-auto relative z-10 text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up drop-shadow-lg">
                  Reedo <span className="text-neon-sky drop-shadow-[0_0_20px_rgba(0,209,255,0.5)]">Insights</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-100 drop-shadow-md">
                  기술과 예술, 그리고 인간의 경계에서.
                  <br />
                  깊이 있는 시선을 담은 연재 시리즈.
              </p>
          </div>
        </section>

        {/* 2. Series Gallery (Client Component) */}
        <SeriesList series={seriesWithCount} />
      </div>

    </main>
  );
}
