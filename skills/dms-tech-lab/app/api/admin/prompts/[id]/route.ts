import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Helper to check admin permission
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { error: "Unauthorized", status: 401 };
  
  const userEmail = session.user.email;
  if (userEmail !== process.env.ADMIN_EMAIL) {
    return { error: "Forbidden", status: 403 };
  }
  return null;
}

// GET: Fetch single prompt
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const error = await checkAdmin();
    if (error) return NextResponse.json({ error: error.error }, { status: error.status });

    const paramsRef = await params;
    const prompt = await prisma.prompt.findUnique({
      where: { id: paramsRef.id },
    });

    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    return NextResponse.json(prompt);
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: Update prompt
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const error = await checkAdmin();
    if (error) return NextResponse.json({ error: error.error }, { status: error.status });

    const paramsRef = await params;
    const body = await req.json();

    // Input validation (simplified, similar to POST)
    if (!body.title || !body.description || !body.promptContent || !body.category) {
       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

     // Sanitize inputs
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

    const updatedPrompt = await prisma.prompt.update({
      where: { id: paramsRef.id },
      data: {
        title,
        description,
        promptContent,
        category,
        subcategory,
        tags,
        isPremium: Boolean(body.isPremium),
        image: body.image && typeof body.image === 'string' ? body.image.substring(0, 500) : null,
        useCase: body.useCase && typeof body.useCase === 'string' ? body.useCase.trim().substring(0, 2000) : null,
        exampleOutput: body.exampleOutput && typeof body.exampleOutput === 'string' ? body.exampleOutput.trim().substring(0, 2000) : null,
        tips,
      },
    });

    return NextResponse.json(updatedPrompt);
  } catch (error) {
    console.error("Error updating prompt:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Remove prompt
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const error = await checkAdmin();
      if (error) return NextResponse.json({ error: error.error }, { status: error.status });
  
      const paramsRef = await params;

      await prisma.prompt.delete({
        where: { id: paramsRef.id },
      });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error deleting prompt:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
