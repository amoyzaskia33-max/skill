import { prisma } from "@/lib/prisma";
import { PromptItem } from "@/lib/prompt-data";
import { unstable_cache } from "next/cache";

const ALLOWED_PROMPT_CATEGORIES = new Set<PromptItem["category"]>([
  "All",
  "Text",
  "Image",
  "Video",
  "Vibe Coding",
]);

function normalizePromptCategory(value: unknown): PromptItem["category"] {
  if (typeof value === "string" && ALLOWED_PROMPT_CATEGORIES.has(value as PromptItem["category"])) {
    return value as PromptItem["category"];
  }

  return "Text";
}

// Cached database query - revalidates every 60 seconds
const getCachedPrompts = unstable_cache(
  async () => {
    return prisma.prompt.findMany({
      orderBy: { createdAt: "desc" }
    });
  },
  ["prompts-list"],
  { revalidate: 300 }
);

export async function getPromptsFromDB(): Promise<PromptItem[]> {
  try {
    const dbPrompts = await getCachedPrompts();

    return dbPrompts.map(p => {
      const tips = p.tips || [];
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        category: normalizePromptCategory(p.category),
        subcategory: p.subcategory || undefined,
        promptContent: p.promptContent,
        tags: p.tags || [],
        author: p.author,
        // Map flat DB fields to nested 'detail' object for Text Prompts
        detail: (p.useCase || p.exampleOutput || tips.length > 0) ? {
          useCase: p.useCase || "",
          exampleOutput: p.exampleOutput || "",
          tips: tips
        } : undefined,
        // Map other fields
        image: p.image || undefined,
        // isPremium is not in PromptItem yet, but good to have in DB
      };
    });
  } catch (error) {
    console.error("Failed to fetch prompts from DB:", error);
    return [];
  }
}
