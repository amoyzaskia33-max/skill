import { NextRequest, NextResponse } from "next/server";
import { readPostFile } from "@/lib/blog-storage";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");
  
  if (!filePath) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }
  
  // Security: prevent directory traversal
  if (filePath.includes("..") || filePath.includes("/") || filePath.includes("\\")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  
  if (!filePath.endsWith(".mdx")) {
    return NextResponse.json({ error: "Only MDX files are allowed" }, { status: 400 });
  }
  
  try {
    const content = await readPostFile(filePath);
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
