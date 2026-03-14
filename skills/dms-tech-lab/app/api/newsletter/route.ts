import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const ADMIN_EMAIL = process.env.CONTACT_EMAIL || "reedo.dev@dmssolution.co.kr";

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();
    const ip = firstForwardedIp || request.headers.get("x-real-ip") || "unknown";

    const rateLimitResult = await checkRateLimit(ip, "auth");
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "유효한 이메일을 입력해주세요." },
        { status: 400 }
      );
    }

    if (resend) {
      // 관리자에게 새 구독자 알림
      await resend.emails.send({
        from: "DMS.LAB Newsletter <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `[DMS.LAB] 새 뉴스레터 구독자: ${email}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0ea5e9;">📬 새 뉴스레터 구독자</h2>
            <p style="font-size: 18px; padding: 16px; background: #f9f9f9; border-radius: 8px;">${email}</p>
            <p style="color: #999; font-size: 12px;">DMS.LAB 홈페이지에서 구독</p>
          </div>
        `,
      });

      // 구독자에게 환영 이메일
      await resend.emails.send({
        from: "DMS.LAB <onboarding@resend.dev>",
        to: [email],
        subject: "DMS.LAB 뉴스레터에 오신 것을 환영합니다! 🎉",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0ea5e9;">환영합니다! 🙌</h2>
            <p>DMS.LAB 뉴스레터를 구독해주셔서 감사합니다.</p>
            <p>AI, 자동화, 기술 트렌드에 대한 깊이 있는 인사이트를 정기적으로 전달해드리겠습니다.</p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #999; font-size: 12px;">
              DMS.LAB | <a href="https://dmssolution.co.kr" style="color: #0ea5e9;">dmssolution.co.kr</a>
            </p>
          </div>
        `,
      });
    } else {
      console.log(`📬 새 뉴스레터 구독자: ${email}`);
      console.log("⚠️ RESEND_API_KEY 미설정 — 이메일 발송 생략");
    }

    return NextResponse.json({
      success: true,
      message: "구독이 완료되었습니다.",
    });
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      { error: "구독 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
