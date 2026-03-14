import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");
  
  if (!filePath) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
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
  
  try {
    const content = fs.readFileSync(fullPath, "utf-8");
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
