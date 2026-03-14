import { promises as fs } from "fs";
import path from "path";

const sourcePostsDir = path.join(process.cwd(), "content", "posts");
const runtimePostsDir =
  process.env.BLOG_RUNTIME_POSTS_DIR?.trim() || path.join(process.cwd(), ".runtime", "content", "posts");

const FALLBACK_ERROR_CODES = new Set(["EROFS", "EACCES", "EPERM", "ENOENT"]);

function isExpectedMdxFileName(fileName: string) {
  return fileName.endsWith(".mdx") && !fileName.includes("/") && !fileName.includes("\\") && !fileName.includes("..");
}

async function safeReadDir(dirPath: string) {
  try {
    return await fs.readdir(dirPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function getSourcePostsDir() {
  return sourcePostsDir;
}

export function getRuntimePostsDir() {
  return runtimePostsDir;
}

export async function listMergedPostFiles() {
  const [sourceFiles, runtimeFiles] = await Promise.all([
    safeReadDir(sourcePostsDir),
    safeReadDir(runtimePostsDir),
  ]);

  const merged = new Set<string>();

  for (const fileName of sourceFiles) {
    if (isExpectedMdxFileName(fileName)) {
      merged.add(fileName);
    }
  }

  for (const fileName of runtimeFiles) {
    if (isExpectedMdxFileName(fileName)) {
      merged.add(fileName);
    }
  }

  return Array.from(merged).sort((left, right) => left.localeCompare(right));
}

export async function readPostFile(fileName: string) {
  if (!isExpectedMdxFileName(fileName)) {
    throw new Error("Invalid post filename");
  }

  const runtimePath = path.join(runtimePostsDir, fileName);
  if (await fileExists(runtimePath)) {
    return fs.readFile(runtimePath, "utf-8");
  }

  const sourcePath = path.join(sourcePostsDir, fileName);
  return fs.readFile(sourcePath, "utf-8");
}

export async function writePostFile(fileName: string, content: string) {
  if (!isExpectedMdxFileName(fileName)) {
    throw new Error("Invalid post filename");
  }

  const sourcePath = path.join(sourcePostsDir, fileName);

  try {
    await fs.writeFile(sourcePath, content, "utf-8");
    return { storage: "source" as const };
  } catch (error) {
    const errorCode = (error as NodeJS.ErrnoException).code;
    if (!errorCode || !FALLBACK_ERROR_CODES.has(errorCode)) {
      throw error;
    }

    await fs.mkdir(runtimePostsDir, { recursive: true });
    const runtimePath = path.join(runtimePostsDir, fileName);
    await fs.writeFile(runtimePath, content, "utf-8");
    return { storage: "runtime" as const, fallbackFrom: errorCode };
  }
}
