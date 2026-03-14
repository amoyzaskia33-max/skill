import { Cpu, Palette, GraduationCap, Globe } from "lucide-react";

export const services = [
  {
    icon: Cpu,
    title: "DEV",
    subtitle: "자동화 & 개발",
    description: "N8N, AI Agent 기반 워크플로우 자동화. 반복 업무를 시스템으로.",
    color: "from-blue-500 to-cyan-400",
    image: "/icons/3d-dev.png",
    link: "/automation",
  },
  {
    icon: Palette,
    title: "DESIGN",
    subtitle: "3D & 시각화",
    description: "제품 시각화, WebGL, 인터랙티브 3D 경험 설계.",
    color: "from-purple-500 to-pink-400",
    image: "/icons/3d-design.png",
    link: "/vibe-coding",
  },
  {
    icon: GraduationCap,
    title: "EDU",
    subtitle: "기술 교육",
    description: "GenAI 워크샵, 프롬프트 엔지니어링, 맞춤형 커리큘럼.",
    color: "from-green-500 to-emerald-400",
    image: "/icons/3d-edu.png",
    link: "/prompts",
  },
  {
    icon: Globe,
    title: "TRADE",
    subtitle: "해외 무역",
    description: "글로벌 네트워크 기반 기술 제품 수출입 지원.",
    color: "from-orange-500 to-amber-400",
    image: "/icons/3d-trade.png",
  },
] as const;

export const companyFeatures = [
  {
    title: "AI 기반 업무 자동화",
    subtitle: "REVOLUTIONIZE OPERATIONS",
    description: "복잡한 비즈니스 워크플로우를 자율적으로 처리하는 최첨단 AI 에이전트로 업무 효율을 극대화하세요. 고객 응대부터 백엔드 로직까지, 불가능을 자동화합니다.",
    points: ["자율 AI 에이전트", "워크플로우 최적화", "실시간 데이터 분석"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "3D 엔지니어링 & 디자인",
    subtitle: "IMMERSIVE EXPERIENCES",
    description: "디지털과 물리적 세계의 경계를 허무세요. 포토리얼리스틱 시각화와 인터랙티브 3D 제품 컨피규레이터로 고객 경험을 혁신합니다.",
    points: ["제품 시각화 (Visualization)", "인터랙티브 WebGL", "디지털 트윈"],
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "기술 교육 & 컨설팅",
    subtitle: "FUTURE READY TEAMS",
    description: "생성형 AI를 활용할 수 있는 기술력을 팀에 장착하세요. 실무 중심의 맞춤형 교육과 컨설팅으로 귀사의 인력을 AI 네이티브 전문가로 육성합니다.",
    points: ["GenAI 워크샵", "기술 컨설팅", "맞춤형 커리큘럼"],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop"
  }
] as const;

import { Settings2, FileText, AppWindow } from "lucide-react";

export const projects = [
  {
    category: "BUSINESS AUTOMATION",
    title: "워크플로우 자동화",
    desc: "24시간 멈추지 않는 비즈니스. N8N, Opal 등 최적의 도구를 조합해 반복 업무를 완벽하게 자동화합니다.",
    icon: Settings2,
    image: "/images/Service/real_automation_server.png",
    color: "text-blue-500",
    link: "/automation",
  },
  {
    category: "AI ENGINEERING",
    title: "프롬프트 라이브러리",
    desc: "시행착오를 줄여주는 솔루션. 개발과 비즈니스 효율을 극대화하는 검증된 프롬프트 모음입니다.",
    icon: FileText,
    image: "/images/Service/real_ai_code_macro.png",
    color: "text-purple-500",
    link: "/prompts",
  },
  {
    category: "VIBE CODING APPS",
    title: "바이브 코딩 웹앱",
    desc: "상상을 현실로. 뮤즈캔버스를 비롯해 바이브 코딩으로 제작된 다양한 웹 애플리케이션을 소개합니다.",
    icon: AppWindow,
    image: "/images/Service/real_modern_workspace.png",
    color: "text-green-500",
    link: "/vibe-coding",
  }
] as const;

export type Service = (typeof services)[number];
export type CompanyFeature = (typeof companyFeatures)[number];
export type Project = (typeof projects)[number];
