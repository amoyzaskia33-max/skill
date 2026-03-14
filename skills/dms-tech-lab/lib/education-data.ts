
export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration?: string; // e.g., "10 min read"
}

export interface EducationChapter {
  id: string; // "chapter-01"
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface EducationTrack {
  id: string; // "gen-ai"
  title: string;
  description: string;
  image: string;
  backgroundImage?: string;
  color: string;
  vol: string;
  tags: string[];
  chapters: EducationChapter[];
  externalLink?: string;
}

export const EDUCATION_TRACKS: Record<string, EducationTrack> = {
  "gen-ai": {
    id: "gen-ai",
    title: "Generative AI",
    description: "Midjourney, Sora2, GPT 등 최신 생성형 AI 도구의 심화 활용법. 상상을 압도적인 퀄리티의 비주얼과 영상으로 구현하는 프로페셔널 가이드.",
    image: "/icons/3d-curriculum-ai.png",
    color: "blue",
    vol: "01",
    tags: ["Midjourney", "Sora2", "GPT"],
    chapters: [
      {
        id: "chapter-01",
        title: "생성형 AI 기초와 작법",
        description: "AI 아트의 기본 원리와 프롬프트 엔지니어링 기초",
        lessons: [
          { id: "intro-generative-ai", title: "생성형 AI가 바꾸는 창작의 미래", description: "왜 지금 생성형 AI인가?", duration: "5 min" },
          { id: "prompt-engineering-basics", title: "프롬프트 엔지니어링 핵심 3요소", description: "원하는 이미지를 얻기 위한 언어 구조", duration: "10 min" }
        ]
      },
      {
        id: "chapter-02",
        title: "Midjourney 마스터 클래스",
        description: "압도적인 퀄리티의 이미지를 생성하는 미드저니 심화 기법",
        lessons: [
          { id: "midjourney-parameters", title: "파라미터 완벽 정복 (--s, --c, --w)", description: "스타일과 다양성을 제어하는 방법", duration: "15 min" },
          { id: "consistent-characters", title: "일관된 캐릭터 생성하기", description: "동일한 인물을 다양한 상황에 배치하는 법", duration: "20 min" }
        ]
      }
    ]
  },
  "vibe-coding": {
    id: "vibe-coding",
    title: "Vibe Coding",
    description: "Cursor, Bolt, V0 등 AI 코딩 툴을 마스터하여 아이디어를 즉시 배포 가능한 웹 서비스로 전환. 코딩 지식이 없어도 감각만으로 개발하는 로우코드/노코드 혁명.",
    image: "/icons/3d-curriculum-code.png",
    color: "purple",
    vol: "02",
    tags: ["Cursor", "Bolt", "V0"],
    chapters: [
      {
        id: "chapter-01",
        title: "AI 코딩 툴 셋업",
        description: "개발 환경 구축 없이 시작하는 모던 웹 개발",
        lessons: [
          { id: "cursor-setup", title: "Cursor 에디터 설치 및 설정", description: "VS Code보다 강력한 AI 에디터", duration: "5 min" },
          { id: "v0-ui-generation", title: "V0로 1분 만에 UI 디자인하기", description: "텍스트로 리액트 컴포넌트 생성", duration: "10 min" }
        ]
      }
    ]
  },
  "automation": {
    id: "automation",
    title: "Openclaw",
    description: "THE AI THAT ACTUALLY DOES THINGS. 이메일, 캘린더, 브라우저까지 제어하는 개인 AI 어시스턴트. WhatsApp, Telegram 등 어떤 채팅 앱에서든 바로 사용 가능.",
    image: "/images/Service/openclaw-features.png",
    color: "rose",
    vol: "03",
    tags: ["OpenClaw", "AI Assistant", "Automation"],
    externalLink: "https://openclaw.dmssolution.co.kr/",
    chapters: [
      {
        id: "chapter-01",
        title: "OpenClaw 시작하기",
        description: "개인 AI 어시스턴트 설정 및 활용",
        lessons: [
          { id: "openclaw-basics", title: "OpenClaw 설치 및 설정", description: "원클릭 설치로 AI 어시스턴트 시작하기", duration: "10 min" }
        ]
      }
    ]
  }
};
