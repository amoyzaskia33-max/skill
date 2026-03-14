export interface BlogSeries {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  color: string;
  tags: string[];
}

export const BLOG_SERIES: Record<string, BlogSeries> = {
  "future-arts": {
    id: "future-arts",
    title: "Future Arts",
    subtitle: "AI & AESTHETICS",
    description: "기계의 눈으로 본 세상, 알고리즘이 빚어낸 건축, 그리고 합성된 시네마. AI 시대의 예술과 미학을 탐구합니다.",
    coverImage: "/series/future-arts.png",
    color: "purple",
    tags: ["AI Art", "Cinema", "Architecture"],
  },
  "homo-technicus": {
    id: "homo-technicus",
    title: "Homo Technicus",
    subtitle: "HUMAN & TECH",
    description: "기술적 포스트휴머니즘. 디지털 페르소나와 이식된 기억. 기술과 결합하여 진화하는 인류의 철학적 질문들.",
    coverImage: "/series/homo-technicus.png",
    color: "rose",
    tags: ["Philosophy", "Identity", "Memory"],
  },
  "agentic-era": {
    id: "agentic-era",
    title: "Agentic Era",
    subtitle: "AUTONOMY & CODE",
    description: "도구를 넘어 동료가 된 AI. 자율 에이전트와 자동화가 바꾸는 일의 미래, 그리고 창작의 민주화.",
    coverImage: "/series/agentic-era.png",
    color: "teal",
    tags: ["Agents", "Automation", "N8N"],
  },
  "ai-tech-trends": {
    id: "ai-tech-trends",
    title: "AI Tech Trends",
    subtitle: "LATEST NEWS",
    description: "매일 쏟아지는 AI 기술 뉴스. 핵심만 요약하여 전해드립니다. RAG부터 멀티모달 모델까지.",
    coverImage: "/series/ai-tech-trends.png",
    color: "blue",
    tags: ["Retrospective", "News", "Insight"],
  },
  "today-me": {
    id: "today-me",
    title: "Today's Me",
    subtitle: "DAILY ESSAY",
    description: "나의 하루가 곧 나의 미래가 된다. 아침의 물 한 잔부터 잠들기 전의 회고까지, 매일을 채우는 엔지니어의 작지만 단단한 루틴에 대하여.",
    coverImage: "/series/todays-me.png",
    color: "emerald",
    tags: ["Essay", "Growth", "Routine"],
  },
  "ai-fantasy-life": {
    id: "ai-fantasy-life",
    title: "AI Fantasy Life",
    subtitle: "VIRTUAL FICTION",
    description: "현실과 가상의 경계가 무너진 세상. AI와 함께 써 내려가는 몽환적이고 기묘한 이야기.",
    coverImage: "/series/ai-fantasy-life.png",
    color: "pink",
    tags: ["Fiction", "Story", "Dream"],
  },
  "daily-record": {
    id: "daily-record",
    title: "일상의 기록",
    subtitle: "SEASONAL MEMORY",
    description: "스쳐 지나가는 계절의 틈새에서 마주한 찰나의 순간들. 그 속에 담긴 감정과 기억을 기록합니다.",
    coverImage: "/series/daily-record.png",
    color: "orange",
    tags: ["Essay", "Season", "Memory"],
  },
  "passive-income": {
    id: "passive-income",
    title: "Passive Income",
    subtitle: "WEALTH & FREEDOM",
    description: "잠자는 동안에도 가치가 자라나는 시스템. 디지털 자산, 자동화 수익, 그리고 경제적 자유를 향한 여정.",
    coverImage: "/series/passive-income.png",
    color: "yellow",
    tags: ["Money", "Asset", "Freedom"],
  }
};
