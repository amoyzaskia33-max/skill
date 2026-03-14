
import { AppWindow, Briefcase, Calculator, Palette, Sparkles, Terminal, Dumbbell } from "lucide-react";

export type VibeCategory = "All" | "Productivity" | "Creative" | "Business" | "Utility";

export interface VibeApp {
  id: string;
  title: string;
  description: string;
  category: VibeCategory;
  url: string; // Internal or external link
  icon: any; // Lucide icon or image path
  status: "Live" | "Beta" | "Coming Soon";
  tags: string[];
}

export const VIBE_CATEGORIES: VibeCategory[] = [
  "All",
  "Productivity",
  "Creative",
  "Business",
  "Utility",
];

export const VIBE_APPS: VibeApp[] = [
  {
    id: "muse-canvas",
    title: "PromptBlocks",
    description: "AI가 프롬프트를 13가지 요소로 분해하고, 저장된 블록을 레고처럼 조립해 새로운 프롬프트를 만들어보세요.",
    category: "Creative",
    url: "https://promptblocks.dmssolution.co.kr/",
    icon: Palette,
    status: "Live",
    tags: ["AI", "Canvas", "Ideation"],
  },

  {
    id: "prompt-library",
    title: "AI Prompt Library",
    description: "개발 및 마케팅을 위한 검증된 프롬프트 라이브러리.",
    category: "Utility",
    url: "/apps/prompt-library",
    icon: Terminal,
    status: "Coming Soon",
    tags: ["Prompt", "AI", "Dev"],
  },
  {
    id: "fitmind-gym",
    title: "Fitmind Gym Routine",
    description: "개인 맞춤형 짐 루틴 관리 프로그램. 오늘도 검색 없이 루틴 완주하자.",
    category: "Productivity",
    url: "https://fitmind.dmssolution.co.kr/",
    icon: Dumbbell,
    status: "Live",
    tags: ["Health", "Workout", "Routine"],
  },
  {
    id: "fantasy-life",
    title: "AI Fantasy Life",
    description: "Odyssey를 활용한 실시간 판타지 세계 생성기 (Demo).",
    category: "Creative",
    url: "/odyssey",
    icon: Sparkles,
    status: "Coming Soon",
    tags: ["Video", "GenAI", "Odyssey"],
  },
  {
    id: "code-assistant",
    title: "Vibe Code Assistant",
    description: "자연어로 코드를 생성하고 수정하는 개인용 코딩 비서.",
    category: "Productivity",
    url: "/apps/code-assistant",
    icon: AppWindow,
    status: "Coming Soon",
    tags: ["Coding", "Assistant", "LLM"],
  },
];
