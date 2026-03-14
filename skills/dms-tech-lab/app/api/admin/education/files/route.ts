import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Get all MDX files from education content directory
function getMDXFiles(dir: string, baseDir: string): { path: string; name: string }[] {
  const files: { path: string; name: string }[] = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getMDXFiles(fullPath, baseDir));
      } else if (item.endsWith(".mdx")) {
        const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
        files.push({
          path: relativePath,
          name: item,
        });
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }
  
  return files;
}

export async function GET() {
  const educationDir = path.join(process.cwd(), "content", "education");
  const files = getMDXFiles(educationDir, educationDir);
  
  return NextResponse.json({ files });
}
