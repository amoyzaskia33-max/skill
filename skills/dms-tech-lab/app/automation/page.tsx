import AutomationContainer from "@/components/automation/AutomationMain";
import { prisma } from "@/lib/prisma";
import { AutomationTemplate } from "@/lib/automation-data";

export const dynamic = 'force-dynamic';

export default async function AutomationPage() {
  const automations = await prisma.automation.findMany({
    orderBy: { createdAt: "desc" }
  });

  // Convert DB model to UI model if fields match loosely, or map explicitly if needed.
  // Assuming strict type compatibility for now, but we verify fields.
  // Prisma Automation `detail` is Json, so we might need type casting.
  const formattedAutomations = automations.map(a => ({
    ...a,
    detail: a.detail as any, // Cast Json to required type structure
    // Ensure category matches valid union types if stored as string
    category: a.category as any,
    author: {
        name: a.author,
        avatar: "", // Placeholder or fetch if available
        verified: true
    },
    // Add missing fields or defaults
    stats: { complexity: "Beginner", ...((a.detail as any)?.stats || {}) },
    icons: (a.detail as any)?.icons || [],
  })) as AutomationTemplate[];

  return (
    <main className="w-full min-h-screen bg-[#050B1B] text-white font-poppins relative selection:bg-blue-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative w-full pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B1B] via-[#050B1B]/80 to-[#050B1B] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_70%)] z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                Workflow <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">Automation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed drop-shadow-md">
                반복되는 업무는 이제 그만. <br />
                검증된 워크플로우 템플릿으로 비즈니스를 자동화하세요.
            </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-32 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B1B]/50 to-[#050B1B] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
            <AutomationContainer initialTemplates={formattedAutomations} />
        </div>
      </section>
    </main>
  );
}
