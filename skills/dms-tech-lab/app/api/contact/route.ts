import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || "reedo.dev@dmssolution.co.kr";

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
    const { email, firstName, lastName, message } = body;

    // 기본 유효성 검사
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "유효한 이메일을 입력해주세요." },
        { status: 400 }
      );
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "문의 내용을 입력해주세요." },
        { status: 400 }
      );
    }

    const fullName = `${lastName || ""} ${firstName || ""}`.trim() || "이름 없음";

    // Resend API 키가 설정된 경우 실제 이메일 발송
    if (resend) {
      // 관리자에게 알림 이메일
      await resend.emails.send({
        from: "DMS.LAB 문의 <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: `[DMS.LAB] 새 문의: ${fullName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0ea5e9;">📩 새로운 문의가 도착했습니다</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; width: 100px;">이름</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">이메일</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">내용</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
            <p style="color: #999; font-size: 12px;">DMS.LAB 홈페이지에서 발송됨</p>
          </div>
        `,
      });

      // 문의자에게 자동 응답 이메일
      await resend.emails.send({
        from: "DMS.LAB <onboarding@resend.dev>",
        to: [email],
        subject: "[DMS.LAB] 문의가 접수되었습니다",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0ea5e9;">감사합니다, ${fullName}님! 🙏</h2>
            <p>문의가 정상적으로 접수되었습니다.</p>
            <p>담당자가 확인 후 <strong>24시간 이내</strong>에 연락드리겠습니다.</p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #666; font-size: 14px;">보내주신 내용:</p>
            <blockquote style="margin: 12px 0; padding: 12px 16px; border-left: 3px solid #0ea5e9; background: #f9f9f9; white-space: pre-wrap;">${message}</blockquote>
            <p style="color: #999; font-size: 12px; margin-top: 24px;">
              DMS.LAB | <a href="https://dmssolution.co.kr" style="color: #0ea5e9;">dmssolution.co.kr</a>
            </p>
          </div>
        `,
      });
    } else {
      // Resend 미설정 시 콘솔 로그 (개발용)
      console.log("=== 새 문의 접수 ===");
      console.log(`이름: ${fullName}`);
      console.log(`이메일: ${email}`);
      console.log(`내용: ${message}`);
      console.log("====================");
      console.log("⚠️ RESEND_API_KEY가 설정되지 않아 이메일이 발송되지 않았습니다.");
    }

    return NextResponse.json({
      success: true,
      message: "문의가 정상적으로 접수되었습니다.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "문의 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
