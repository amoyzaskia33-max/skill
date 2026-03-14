import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
        return NextResponse.json({ error: 'Path required' }, { status: 400 });
    }

    // Security check
    const fullPath = path.join(CONTENT_DIR, filePath);
    if (!fullPath.startsWith(CONTENT_DIR)) {
         return NextResponse.json({ error: 'Invalid path' }, { status: 403 });
    }

    try {
        if (!fs.existsSync(fullPath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
        const content = fs.readFileSync(fullPath, 'utf8');
        return NextResponse.json({ content });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
    }
}
