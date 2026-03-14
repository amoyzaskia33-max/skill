import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// Next.js 15+ passes params as Promise — next-auth v4 expects synchronous params
async function authHandler(
  req: Request,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  const params = await context.params;
  return handler(req, { params });
}

export { authHandler as GET, authHandler as POST };
