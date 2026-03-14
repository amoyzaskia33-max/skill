import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/mdx/MDXComponents";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedPosts from "@/components/blog/RelatedPosts";
import Newsletter from "@/components/sections/Newsletter";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";


export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
      return;
  }

  const { title, excerpt, coverImage, date, tags } = post.frontMatter;

  return {
    title: `${title} | DMS Future Arts`,
    description: excerpt,
    keywords: tags,
    openGraph: {
      title: title,
      description: excerpt,
      type: 'article',
      publishedTime: date,
      authors: ['DMS Solution'],
      images: [
        {
          url: coverImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: excerpt,
      images: [coverImage || '/og-image.png'],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // 관련 글 가져오기
  const relatedPosts = (await getRelatedPosts(params.slug, 3)).map((p) => ({
    slug: p.slug,
    title: p.frontMatter.title,
    excerpt: p.frontMatter.excerpt,
    coverImage: p.frontMatter.coverImage,
    series: p.frontMatter.series,
  }));
  
  return (
    <main className="w-full min-h-screen bg-[#050B1B] text-white font-poppins selection:bg-neon-sky selection:text-[#050B1B]">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex flex-col justify-end pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-t from-[#050B1B] via-[#050B1B]/40 to-transparent z-10" />
             {post.frontMatter.coverImage && (
                 <Image
                    src={post.frontMatter.coverImage}
                    alt={post.frontMatter.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover opacity-60 scale-105"
                 />
             )}
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-20">
            <Link href="/blog" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>

            <div>
                <div className="flex items-center gap-4 mb-6">
                    {post.frontMatter.series && (
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                            {post.frontMatter.series}
                        </span>
                    )}
                    <span className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-2" /> {post.frontMatter.date}
                    </span>
                    {post.frontMatter.readTime && (
                        <span className="flex items-center text-gray-400 text-sm">
                            <Clock className="w-4 h-4 mr-2" /> {post.frontMatter.readTime}
                        </span>
                    )}
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
                    {post.frontMatter.title}
                </h1>

                <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                   {post.frontMatter.excerpt}
                </p>
            </div>
        </div>
      </section>

      {/* Content Body */}
      <section className="relative px-6 py-20">
        <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none font-serif">
                <MDXRemote source={post.content} components={MDXComponents} />
            </article>

            <AuthorCard />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}

