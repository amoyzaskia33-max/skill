import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user has admin role
    // Note: In credentials provider, role is set to "admin"
    const userEmail = session.user.email;
    if (userEmail !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Input validation
    if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!body.description || typeof body.description !== 'string' || body.description.trim().length === 0) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    if (!body.promptContent || typeof body.promptContent !== 'string' || body.promptContent.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt content is required" },
        { status: 400 }
      );
    }

    if (!body.category || typeof body.category !== 'string' || body.category.trim().length === 0) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Sanitize and validate inputs
    const title = body.title.trim().substring(0, 200);
    const description = body.description.trim().substring(0, 500);
    const promptContent = body.promptContent.trim().substring(0, 10000);
    const category = body.category.trim().substring(0, 50);
    const subcategory = body.subcategory ? body.subcategory.trim().substring(0, 50) : null;
    const tags = Array.isArray(body.tags) 
      ? body.tags.filter((tag: any) => typeof tag === 'string').map((tag: string) => tag.trim().substring(0, 30)).slice(0, 10)
      : [];
    const tips = Array.isArray(body.tips)
      ? body.tips.filter((tip: any) => typeof tip === 'string').map((tip: string) => tip.trim().substring(0, 200)).slice(0, 10)
      : [];

    const prompt = await prisma.prompt.create({
      data: {
        title,
        description,
        promptContent,
        category,
        subcategory,
        tags,
        isPremium: Boolean(body.isPremium),
        author: "DMS Lab",

        // New Fields
        image: body.image && typeof body.image === 'string' ? body.image.substring(0, 500) : null,
        useCase: body.useCase && typeof body.useCase === 'string' ? body.useCase.trim().substring(0, 2000) : null,
        exampleOutput: body.exampleOutput && typeof body.exampleOutput === 'string' ? body.exampleOutput.trim().substring(0, 2000) : null,
        tips,
      },
    });
    return NextResponse.json(prompt);
  } catch (error) {
    console.error("Error creating prompt:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
