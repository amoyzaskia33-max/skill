import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

async function main() {
  const shortformAutomation = {
    id: "shortform-automation-v1",
    title: "숏폼자동화(유튜브,틱톡, 인스타)",
    description: "기획부터 영상 생성, 호스팅, 그리고 유튜브/인스타/틱톡 업로드까지 한 번에 처리되는 완전 자동화 파이프라인입니다.",
    category: "Video",
    author: "Reedo",
    detail: {
      jsonUrl: "/", // Placeholder or actual URL if known
      icons: ["youtube", "instagram", "tiktok"],
      stats: {
          complexity: "Advanced",
          downloads: 1280,
          likes: 342
      },
      lastUpdate: "방금 전",
      descriptionLong: `이 시스템은 콘텐츠 제작의 모든 병목을 제거하는 완전 자동화 파이프라인입니다.\n사용자는 매일 주제만 입력하거나, 아예 입력조차 하지 않아도 됩니다.\n\n매일 오전 9시(KST)가 되면 워크플로우가 자동으로 실행되어 다음 과정을 순차적으로 처리합니다.\n\n1. SEO에 최적화된 영상 아이디어를 생성하고\n2. 해당 아이디어를 기반으로 Sora2를 통해 숏폼 영상을 생성하며\n3. 생성된 MP4 파일을 Google Drive에 호스팅한 뒤\n4. YouTube, Instagram, TikTok 등 멀티 플랫폼에 맞게 자동 배포합니다.\n\n이 모든 과정은 사람의 개입 없이 단일 자동화 플로우 안에서 이루어지며, 결과와 로그는 Google Sheet에 자동 저장되어 관리됩니다.`,
      keyFeatures: [
          { 
              title: "SEO 최적화 기획 (Gemini)", 
              description: "Gemini 기반 AI 에이전트가 바이럴 가능성이 높은 영상 아이디어를 생성합니다.\nYouTube / Instagram / TikTok 플랫폼별 SEO 전략을 분리해 적용합니다.\n- YouTube: 검색량 중심 키워드\n- Instagram: 감성·이모지 중심 캡션\n- TikTok: 트렌드·챌린지·사운드 태그 중심\n결과는 엄격한 JSON 포맷으로 구조화되어 이후 단계에서 오류 없이 사용됩니다."
          },
          { 
              title: "Sora2 고품질 영상 생성",
              description: "기획 단계에서 생성된 AI 전용 프롬프트를 그대로 Sora2에 전달합니다.\n세로형 숏폼 비율(portrait), 프레임 수, 워터마크 제거 옵션이 자동 적용됩니다.\n영상 생성 후 평균 약 10분 대기 후 결과를 확인하고 MP4 파일을 다운로드합니다.\n생성 실패(정책 불가 등) 상황을 고려한 예외 흐름도 포함되어 있습니다."
          },
          { 
              title: "Google Drive 자동 호스팅",
              description: "생성된 MP4 영상은 지정된 Google Drive 폴더에 자동 업로드됩니다.\n업로드 직후 권한을 “누구나 보기 가능”으로 변경합니다.\n다운로드 전용 직링크(URL)를 생성하여 외부 플랫폼 업로드에 사용합니다.\n링크 반영 지연을 고려해 대기 시간(Wait Node)이 포함되어 안정성을 확보합니다."
          },
          { 
              title: "멀티 플랫폼 배포",
              description: "YouTube: 제목, 설명, 태그를 자동 적용해 영상 업로드 (비공개 후 검수 가능)\nInstagram Reels: Google Drive 직링크를 활용해 영상 컨테이너 생성, 캡션 + 해시태그 자동 결합\nTikTok: 직접 업로드 대신, TikTok 전용 태그를 Google Sheet에 저장 (Zapier 연동)"
          }
      ],
      steps: [
          { title: "1. 기획 & 아이디어", desc: "매일 09:00 / 18:00 자동 실행. 1~9번 영상 유형 중 랜덤 선택하여 제목, 설명(다국어), Sora2 프롬프트, 플랫폼별 태그/캡션을 JSON으로 생성합니다." },
          { title: "2. 영상 생성", desc: "Sora2 API로 프롬프트 전달. 작업(Task) 상태 주기적 확인 후 MP4 다운로드. 실패 시 예외 처리 적용." },
          { title: "3. 호스팅", desc: "Google Drive 업로드 및 “Anyone with link” 권한 설정. 인스타/외부 플랫폼용 직링크 생성." },
          { title: "4. 배포 & 로그", desc: "YouTube/Instagram 업로드 실행. 성공/실패 로그 및 TikTok용 태그 데이터를 Google Sheet에 통합 저장." }
      ],
      prerequisites: [
          { 
              title: "Google 계정 연동", 
              description: "Google Drive API, Google Sheets API, YouTube OAuth 인증이 필요합니다." 
          },
          { 
              title: "Facebook / Instagram 연동", 
              description: "Facebook Graph API, Instagram Business 계정, Reels 업로드 권한 설정이 필요합니다." 
          },
          { 
              title: "Buffer 사용 방법", 
              description: "(선택 사항) 멀티 채널 예약 게시 시 활용 가능합니다." 
          },
          { 
              title: "Zapier 사용 방법", 
              description: "TikTok 업로드 자동화를 위한 외부 연동용 (Google Sheet → TikTok 파이프라인 구성)" 
          }
      ],
      diagramImage: "/images/automation/shortform-diagram.png",
      previewImage: "/images/automation/shortform-diagram.png", // Added for consistency with new schema
      workflowCode: `{
        "nodes": [
          { "id": "1", "name": "Start", "type": "n8n-nodes-base.start", "position": [100, 100] }
        ],
        "connections": {}
      }`
    }
  }

  const automation = await prisma.automation.upsert({
    where: { id: shortformAutomation.id },
    update: {
        title: shortformAutomation.title,
        description: shortformAutomation.description,
        category: shortformAutomation.category,
        author: shortformAutomation.author,
        detail: shortformAutomation.detail,
    },
    create: {
        id: shortformAutomation.id,
        title: shortformAutomation.title,
        description: shortformAutomation.description,
        category: shortformAutomation.category,
        author: shortformAutomation.author,
        detail: shortformAutomation.detail,
    }
  })

  console.log({ automation })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
