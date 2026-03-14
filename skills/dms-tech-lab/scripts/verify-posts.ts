
import { getAllPosts } from '@/lib/mdx';

async function main() {
  console.log('Verifying getAllPosts()...');
  try {
    const posts = await getAllPosts();
    console.log(`Successfully loaded ${posts.length} posts.`);
    posts.forEach(post => {
      console.log(`- [${post.slug}] ${post.frontMatter.title} (Date: ${post.frontMatter.date})`);
      if (!post.frontMatter.title) console.warn(`  WARNING: Title missing for ${post.slug}`);
      if (!post.frontMatter.date) console.warn(`  WARNING: Date missing for ${post.slug}`);
    });
    console.log('Verification passed.');
  } catch (error) {
    console.error('Verification FAILED:', error);
    process.exit(1);
  }
}

main();
