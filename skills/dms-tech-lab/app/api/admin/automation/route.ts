import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    if (userEmail !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Basic Validation
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Automation
    const automation = await prisma.automation.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        author: "DMS Lab",
        detail: body.detail || {}, // Store rich content as JSON
      },
    });

    return NextResponse.json(automation);
  } catch (error) {
    console.error("Error creating automation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Cache GET requests for 60 seconds
export const revalidate = 60;

export async function GET(req: Request) {
    try {
        const automations = await prisma.automation.findMany({
            orderBy: { createdAt: "desc" }
        });
        
        // Add cache headers
        const headers = new Headers();
        headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
        
        return NextResponse.json(automations, { headers });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
