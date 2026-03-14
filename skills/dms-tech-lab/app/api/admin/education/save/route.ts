import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path: filePath, content } = body;
    
    if (!filePath || content === undefined) {
      return NextResponse.json({ error: "Path and content are required" }, { status: 400 });
    }
    
    // Security: prevent directory traversal
    if (filePath.includes("..")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    
    const educationDir = path.join(process.cwd(), "content", "education");
    const fullPath = path.join(educationDir, filePath);
    
    // Ensure path is within education directory
    if (!fullPath.startsWith(educationDir)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    
    // Only allow .mdx files
    if (!fullPath.endsWith(".mdx")) {
      return NextResponse.json({ error: "Only MDX files are allowed" }, { status: 400 });
    }
    
    // Write the file
    fs.writeFileSync(fullPath, content, "utf-8");
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to save file:", error);
    return NextResponse.json(
      { error: `파일 저장 실패: ${error.message || "알 수 없는 오류"}` },
      { status: 500 }
    );
  }
}
