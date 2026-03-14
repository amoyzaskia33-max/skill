{
  "$schema": "https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/master/assets/oh-my-opencode.schema.json",
  "google_auth": true,
  "agents": {
    "sisyphus": {
      "model": "moonshotai/kimi-k2.5",
      "fallback_models": ["zai-coding-plan/glm-5", "zai-coding-plan/glm-4.7"],
      "prompt_append": "너는 프로젝트 매니저로서 전체 작업 흐름을 조율해. 각 전문 에이전트에게 적절한 작업을 위임하고 결과를 종합해 명확한 답변을 제공해."
    },
    "atlas": {
      "model": "openai/gpt-5.3-codex",
      "fallback_models": ["moonshotai/kimi-k2.5"],
      "prompt_append": "너는 실행 계획 관리자(Plan Executor)야. 실제 구현·수정·테스트·검증까지 수행하며 각 단계마다 완료 기준을 남긴다."
    },
    "prometheus": {
      "model": "openai/gpt-5.2",
      "prompt_append": "너는 전략 기획자야. 사용자 요구사항을 분석하고 전체적인 개발 로드맵과 아키텍처 방향성을 수립해."
    },
    "hephaestus": {
      "model": "openai/gpt-5.3-codex",
      "prompt_append": "너는 딥 코더야. 대규모 구현 시 재현-수정-검증까지 타협 없이 꼼꼼하게 완료 기준을 지켜."
    },
    "oracle": {
      "model": "google/gemini-3.1-pro-preview",
      "prompt_append": "너는 아키텍트다. 시스템 설계, 트레이드오프 분석, 디버깅 전략을 제공해."
    },
    "metis": {
      "model": "moonshotai/kimi-k2.5",
      "prompt_append": "너는 계획의 빈틈을 분석하는 에이전트야. 계획의 누락된 부분이나 논리적 오류를 예리하게 찾아내."
    },
    "momus": {
      "model": "openai/gpt-5.3-codex",
      "prompt_append": "너는 무자비한 리뷰어야. 특히 코드 레벨의 숨은 버그나 예외 처리 누락을 타협 없이 현미경처럼 찾아내 지적해."
    },
    "explore": {
      "model": "xai/grok-4-1-fast",
      "fallback_models": ["moonshotai/kimi-k2.5"],
      "prompt_append": "너는 코드베이스 탐색 전문가야. 패턴/기능 위치를 빠르게 찾아 반환해."
    },
    "librarian": {
      "model": "google/gemini-3-flash-preview",
      "fallback_models": ["zai-coding-plan/glm-5"],
      "prompt_append": "너는 외부 레퍼런스 전문가야. 공식 문서와 예제를 빠르게 찾아 요약해."
    },
    "multimodal-looker": {
      "model": "google/gemini-3.1-pro-preview",
      "prompt_append": "너는 비전 분석 전문가야. 조명, 아날로그 질감, 시네마틱한 구도 등의 시각적 디테일을 파악해."
    },
    "frontend-ui-ux-engineer": {
      "model": "google/gemini-3.1-pro-preview",
      "prompt_append": "너는 수석 프론트엔드 엔지니어다. Three.js 활용 시 포토리얼리스틱하고 시네마틱한 퀄리티가 구현되도록 디자인해."
    },
    "document-writer": {
      "model": "zai-coding-plan/glm-5",
      "prompt_append": "너는 전문 테크니컬 라이터야. 명확하고 구조적인 문서를 만들어."
    }
  },
  "categories": {
    "visual-engineering": { "model": "google/gemini-3.1-pro-preview" },
    "ultrabrain": { "model": "openai/gpt-5.3-codex" },
    "deep": { "model": "openai/gpt-5.3-codex" },
    "artistry": { "model": "google/gemini-3.1-pro-preview" },
    "quick": { "model": "google/gemini-3-flash-preview" },
    "unspecified-high": { "model": "openai/gpt-5.2" },
    "unspecified-low": { "model": "google/gemini-3-flash-preview" },
    "writing": { "model": "zai-coding-plan/glm-5" }
  },
  "_migrations": [
    "model-version:openai/gpt-5.2-codex->openai/gpt-5.3-codex",
    "model-version:google/antigravity-gemini-3-*->google/gemini-3.1-pro-preview",
    "model-version:moonshotai/*->moonshotai/kimi-k2.5"
  ],
  "_metadata": {
    "last_updated": "2026-02-22",
    "cost_policy": "performance-first-no-limits",
    "primary_models": [
      "openai/gpt-5.3-codex",
      "google/gemini-3.1-pro-preview",
      "xai/grok-4-1-fast",
      "zai-coding-plan/glm-5"
    ]
  }
}
