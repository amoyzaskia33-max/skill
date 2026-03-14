import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Disable caching to always check session
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check with better error handling
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session check failed:", error);
    redirect("/auth/signin?callbackUrl=/admin/prompts");
  }

  // Debug logging
  if (!session) {
      console.log("[AdminLayout] Session is null/undefined");
      // Optional: Log headers to see if cookie exists (be careful with PII)
  }

  // Check if user is admin (by role OR by email matching ADMIN_EMAIL)
  const isAdmin = session?.user && (
    (session.user as any)?.role === "admin" ||
    session.user.email === process.env.ADMIN_EMAIL
  );

  console.log(`[AdminLayout] User: ${session?.user?.email}, Role: ${(session?.user as any)?.role}, IsAdmin: ${isAdmin}`);

  // Redirect Logic
  if (!session) {
     // If not logged in at all, go to login
     redirect("/auth/signin?callbackUrl=/admin/prompts");
  } else if (!isAdmin) {
     // If logged in BUT not admin, go to unauthorized page (stop the loop)
     redirect("/unauthorized");
  }

  return (
    <div className="flex h-screen bg-[#050B1B] text-white overflow-hidden relative font-poppins">
      {/* Admin Sidebar */}
      <aside className="w-64 backdrop-blur-xl bg-white/5 border-r border-white/10 relative z-20 flex flex-col">
        <div className="p-8">
            <h1 className="text-2xl font-bold">
                DMS<span className="text-neon-sky">.ADMIN</span>
            </h1>
            <p className="text-xs text-white/40 mt-1">Command Center</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-white/70 hover:text-white transition-all group">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-green-500 transition-colors" />
                Users
            </Link>
            <Link 
                href="/admin/prompts" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-white/70 hover:text-white transition-all group"
                prefetch={false}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon-sky transition-colors" />
                Prompts
            </Link>
            <Link href="/admin/automation" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-white/70 hover:text-white transition-all group">
                 <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-purple-500 transition-colors" />
                Automation
            </Link>
            <Link href="/admin/education" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-white/70 hover:text-white transition-all group">
                 <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-teal-500 transition-colors" />
                Education
            </Link>
            <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-white/70 hover:text-white transition-all group">
                 <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-orange-500 transition-colors" />
                Blog
            </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
            <div className="px-4 py-2 mb-2 text-xs text-white/40">
              {session.user?.email}
            </div>
            <Link href="/" className="block px-4 py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-sm font-medium">
                ← Back to Site
            </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}
