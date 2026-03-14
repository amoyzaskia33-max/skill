import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  // Meta sends signed_request when user removes the app
  const signedRequest = body.signed_request;

  return NextResponse.json({
    url: "https://dmssolution.co.kr/data-deletion",
    confirmation_code: crypto.randomUUID(),
  });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
