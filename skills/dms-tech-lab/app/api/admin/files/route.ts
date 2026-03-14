import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Root content directory
const CONTENT_DIR = path.join(process.cwd(), 'content');

// Helper to recursively get files
function getFiles(dir: string, fileList: any[] = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      if (file.endsWith('.mdx')) {
        // Return relative path from content dir
        const relativePath = path.relative(CONTENT_DIR, filePath);
        fileList.push({
            path: relativePath,
            name: file
        });
      }
    }
  });
  return fileList;
}

export async function GET() {
    try {
        const files = getFiles(CONTENT_DIR);
        return NextResponse.json({ files });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to scan files' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { filePath, content } = await req.json();
        
        // Security check: ensure path is within content dir
        const fullPath = path.join(CONTENT_DIR, filePath);
        if (!fullPath.startsWith(CONTENT_DIR)) {
             return NextResponse.json({ error: 'Invalid path' }, { status: 403 });
        }

        fs.writeFileSync(fullPath, content, 'utf8');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
    }
}
