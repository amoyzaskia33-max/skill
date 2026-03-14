import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Callback received" });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json({ success: true, message: "Callback received" });
}
