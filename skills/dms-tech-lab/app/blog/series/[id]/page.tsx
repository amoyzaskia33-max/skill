
import SeriesPostList from "@/components/blog/SeriesPostList";
import SeriesHeader from "@/components/blog/SeriesHeader";
import Link from "next/link";
import { BLOG_SERIES } from "@/lib/blog-data";
import { getPostsBySeries } from "@/lib/mdx";

export async function generateStaticParams() {
    return Object.keys(BLOG_SERIES).map((id) => ({
        id: id,
    }));
}

export default async function SeriesDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const data = BLOG_SERIES[id];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050B1B] text-white flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Series Not Found</h1>
            <Link href="/blog" className="text-neon-sky hover:underline">Return to Blog</Link>
        </div>
      </div>
    );
  }

  const posts = await getPostsBySeries(id);
  
  // Transform MDX posts to the format SeriesPostList expects
  const formattedPosts = posts.map(post => ({
    slug: post.slug,
    chapter: post.frontMatter.chapter,
    title: post.frontMatter.title,
    excerpt: post.frontMatter.excerpt,
    date: post.frontMatter.date,
    readTime: post.frontMatter.readTime || "5 min"
  }));

  return (
    <main className="w-full min-h-screen bg-[#050B1B] text-white font-poppins selection:bg-neon-sky selection:text-[#050B1B] relative">

      {/* Header Section (Client Component for Animations) */}
      <div className="relative z-10">
        <SeriesHeader series={data} postCount={posts.length} />

        {/* Post List Section */}
        <section className="px-6 pb-32">
          <div className="max-w-4xl mx-auto">
              <SeriesPostList posts={formattedPosts} color={data.color} />
          </div>
        </section>
      </div>

    </main>
  );
}
