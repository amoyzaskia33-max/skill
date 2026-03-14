import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import { PromptItem } from './prompt-data';

const promptsDirectory = path.join(process.cwd(), 'content/prompts');

const ALLOWED_PROMPT_CATEGORIES = new Set<PromptItem['category']>([
  'All',
  'Text',
  'Image',
  'Video',
  'Vibe Coding',
]);

function normalizePromptCategory(value: unknown): PromptItem['category'] {
  if (typeof value === 'string' && ALLOWED_PROMPT_CATEGORIES.has(value as PromptItem['category'])) {
    return value as PromptItem['category'];
  }

  return 'Text';
}

const getCachedPromptsFromFiles = unstable_cache(
  async (): Promise<PromptItem[]> => {
    try {
      const files = await fs.readdir(promptsDirectory);
      const mdxFiles = files.filter((fileName) => fileName.endsWith('.mdx'));

      const promptResults = await Promise.all(
        mdxFiles.map(async (fileName) => {
          const id = fileName.replace(/\.mdx$/, '');
          const fullPath = path.join(promptsDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            id,
            title: typeof data.title === 'string' ? data.title : 'Untitled',
            description: typeof data.description === 'string' ? data.description : '',
            category: normalizePromptCategory(data.category),
            subcategory: typeof data.subcategory === 'string' ? data.subcategory : undefined,
            promptContent: content.trim(),
            tags: Array.isArray(data.tags)
              ? data.tags.filter((tag): tag is string => typeof tag === 'string')
              : [],
            author: typeof data.author === 'string' ? data.author : 'Anonymous',
            image: typeof data.image === 'string' ? data.image : undefined,
            detail: {
              useCase: typeof data.useCase === 'string' ? data.useCase : '',
              exampleOutput: typeof data.exampleOutput === 'string' ? data.exampleOutput : '',
              tips: Array.isArray(data.tips)
                ? data.tips.filter((tip): tip is string => typeof tip === 'string')
                : [],
            },
          } as PromptItem;
        })
      );

      return promptResults;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }

      throw error;
    }
  },
  ['file-prompts'],
  { revalidate: 300 }
);

export async function getAllPromptsFromFiles(): Promise<PromptItem[]> {
  return getCachedPromptsFromFiles();
}
