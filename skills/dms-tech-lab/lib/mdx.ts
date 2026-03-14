import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface MDXPost {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    excerpt: string;
    coverImage?: string; // Optional
    series?: string;     // Optional (Series ID)
    chapter?: string;    // Optional (Chapter number)
    readTime?: string;   // Optional (Can be calculated or manual)
    tags?: string[];
    [key: string]: unknown;
  };
  content: string;
}

async function loadPostBySlug(slug: string): Promise<MDXPost | null> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      frontMatter: data as MDXPost['frontMatter'],
      content,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

const getCachedAllPosts = unstable_cache(
  async (): Promise<MDXPost[]> => {
    try {
      const files = await fs.readdir(postsDirectory);
      const postSlugs = files
        .filter((fileName) => !fileName.startsWith('_') && fileName.endsWith('.mdx'))
        .map((fileName) => fileName.replace(/\.mdx$/, ''));

      const loadedPosts = await Promise.all(postSlugs.map((slug) => loadPostBySlug(slug)));

      return loadedPosts
        .filter((post): post is MDXPost => post !== null)
        .sort((post1, post2) => (post1.frontMatter.date > post2.frontMatter.date ? -1 : 1));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }

      throw error;
    }
  },
  ['all-posts'],
  { revalidate: 300 }
);

const getCachedPostsBySlugIndex = unstable_cache(
  async (): Promise<Record<string, MDXPost>> => {
    const posts = await getCachedAllPosts();
    return posts.reduce<Record<string, MDXPost>>((acc, post) => {
      acc[post.slug] = post;
      return acc;
    }, {});
  },
  ['posts-by-slug-index'],
  { revalidate: 300 }
);

const getCachedPostsBySeries = unstable_cache(
  async (seriesId: string): Promise<MDXPost[]> => {
    const allPosts = await getCachedAllPosts();
    return allPosts
      .filter((post) => post.frontMatter.series === seriesId)
      .sort((a, b) => {
        if (a.frontMatter.chapter && b.frontMatter.chapter) {
          return a.frontMatter.chapter.localeCompare(b.frontMatter.chapter);
        }
        return a.frontMatter.date > b.frontMatter.date ? -1 : 1;
      });
  },
  ['posts-by-series'],
  { revalidate: 300 }
);

const getCachedRelatedPosts = unstable_cache(
  async (slug: string, maxCount: number): Promise<MDXPost[]> => {
    const postsBySlug = await getCachedPostsBySlugIndex();
    const currentPost = postsBySlug[slug];
    if (!currentPost) {
      return [];
    }

    const allPosts = (await getCachedAllPosts()).filter((post) => post.slug !== slug);
    const related: MDXPost[] = [];

    if (currentPost.frontMatter.series) {
      const sameSeries = allPosts.filter(
        (post) => post.frontMatter.series === currentPost.frontMatter.series
      );
      related.push(...sameSeries);
    }

    const currentTags = Array.isArray(currentPost.frontMatter.tags)
      ? currentPost.frontMatter.tags
      : [];

    if (currentTags.length > 0) {
      const addedSlugs = new Set(related.map((post) => post.slug));
      const sameTag = allPosts
        .filter((post) => !addedSlugs.has(post.slug))
        .map((post) => {
          const postTags = Array.isArray(post.frontMatter.tags)
            ? post.frontMatter.tags
            : [];
          const overlap = postTags.filter((tag) => currentTags.includes(tag)).length;
          return { post, overlap };
        })
        .filter((item) => item.overlap > 0)
        .sort((a, b) => b.overlap - a.overlap)
        .map((item) => item.post);
      related.push(...sameTag);
    }

    return related.slice(0, maxCount);
  },
  ['related-posts'],
  { revalidate: 300 }
);

export async function getPostBySlug(slug: string): Promise<MDXPost | null> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const postsBySlug = await getCachedPostsBySlugIndex();
  const post = postsBySlug[realSlug];

  if (!post) {
    return null;
  }

  return post;
}

export async function getAllPosts(): Promise<MDXPost[]> {
  return getCachedAllPosts();
}

export async function getPostsBySeries(seriesId: string): Promise<MDXPost[]> {
  return getCachedPostsBySeries(seriesId);
}

export async function getRelatedPosts(slug: string, maxCount: number = 3): Promise<MDXPost[]> {
  const realSlug = slug.replace(/\.mdx$/, '');
  return getCachedRelatedPosts(realSlug, maxCount);
}

