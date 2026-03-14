import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  // Meta sends signed_request for data deletion
  const signedRequest = body.signed_request;

  const confirmationCode = crypto.randomUUID();

  return NextResponse.json({
    url: "https://dmssolution.co.kr/data-deletion",
    confirmation_code: confirmationCode,
  });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
