import { NextRequest, NextResponse } from "next/server";
import { writePostFile } from "@/lib/blog-storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path: filePath, content } = body;
    
    if (!filePath || content === undefined) {
      return NextResponse.json({ error: "Path and content are required" }, { status: 400 });
    }
    
    // Security: prevent directory traversal
    if (filePath.includes("..") || filePath.includes("/") || filePath.includes("\\")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    
    // Only allow .mdx files
    if (!filePath.endsWith(".mdx")) {
      return NextResponse.json({ error: "Only MDX files are allowed" }, { status: 400 });
    }

    const writeResult = await writePostFile(filePath, content);

    return NextResponse.json({ success: true, storage: writeResult.storage });
  } catch (error: any) {
    console.error("Failed to save file:", error);

    const errorCode = (error as NodeJS.ErrnoException).code;
    const isWriteDenied = errorCode === "EROFS" || errorCode === "EACCES" || errorCode === "EPERM";

    return NextResponse.json(
      {
        error: isWriteDenied
          ? "파일 저장 권한이 없는 환경입니다. 관리자에게 BLOG_RUNTIME_POSTS_DIR 설정을 요청해주세요."
          : `파일 저장 실패: ${error.message || "알 수 없는 오류"}`,
      },
      { status: 500 }
    );
  }
}
