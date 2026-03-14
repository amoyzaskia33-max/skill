import { NextResponse } from "next/server";
import { listMergedPostFiles, readPostFile } from "@/lib/blog-storage";

interface FileWithMeta {
  path: string;
  name: string;
  title: string;
  series: string;
}

async function getMDXFiles(): Promise<FileWithMeta[]> {
  const fileNames = await listMergedPostFiles();
  const files = await Promise.all(
    fileNames.map(async (item) => {
      const content = await readPostFile(item);
      const frontmatterMatch = content.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---/);

      let title = item.replace(".mdx", "");
      let series = "기타";

      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];

        const lines = frontmatter.split(/\r?\n/);
        for (const line of lines) {
          const titleMatch = line.match(/^title:\s*["']?(.+?)["']?\s*$/);
          const seriesMatch = line.match(/^series:\s*["']?(.+?)["']?\s*$/);

          if (titleMatch) {
            title = titleMatch[1].trim();
          }
          if (seriesMatch) {
            series = seriesMatch[1].trim();
          }
        }
      }

      return {
        path: item,
        name: item,
        title,
        series,
      };
    })
  );

  return files.sort((a, b) => a.series.localeCompare(b.series) || a.title.localeCompare(b.title));
}

export async function GET() {
  const files = await getMDXFiles();
  
  // Group by series
  const grouped: Record<string, FileWithMeta[]> = {};
  for (const file of files) {
    if (!grouped[file.series]) {
      grouped[file.series] = [];
    }
    grouped[file.series].push(file);
  }
  
  return NextResponse.json({ files, grouped });
}
