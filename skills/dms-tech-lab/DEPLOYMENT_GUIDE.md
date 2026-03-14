# 배포 가이드

## 깃허브 리모트 확인

현재 프로젝트의 깃허브 리모트:
```
origin: https://github.com/MetachainArt/dms-tech-lab.git
```

---

## 배포 방법 3가지

### 1. Vercel (추천) ⭐⭐⭐

#### 장점
- Next.js 개발자가 만든 서비스로 완벽 호환
- 자동 HTTPS, CDN, 캐싱
- 프리티어 (무료)
- 빌드 시간: ~30초
- 국내 서버 포함 (서울 리전)

#### 설정 방법

**방법 A: Vercel CLI (권장)**
```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. Vercel 로그인
vercel login

# 3. 프로젝트 배포
vercel
```

**방법 B: 깃허브 통합**
1. [Vercel Dashboard](https://vercel.com/new) 접속
2. 깃허브 저장소 선택: `MetachainArt/dms-tech-lab`
3. 프로젝트 설정:
   - Framework Preset: **Next.js**
   - Root Directory: `.` (또는 비워둠)
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Deploy** 버튼 클릭

#### Vercel 설정 파일 (.vercelignore)
```
# Vercel 무시 파일
.next/
.env.local
.env.*.local
.git
node_modules/
```

#### 환경 변수 (Vercel Dashboard)
```env
NEXTAUTH_URL=https://your-domain.com/api/auth
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
```

---

### 2. Netlify

#### 장점
- 무료, 신뢰한
- 자동 HTTPS
- 함수 지원 (Serverless)

#### 설정 방법

**방법 A: Netlify CLI**
```bash
# 1. Netlify CLI 설치
npm i -g netlify-cli

# 2. Netlify 로그인
netlify login

# 3. 프로젝트 배포
netlify deploy --prod
```

**방법 B: 깃허브 통합**
1. [Netlify Dashboard](https://app.netlify.com/start) 접속
2. 깃허브 저장소 선택: `MetachainArt/dms-tech-lab`
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Deploy site** 버튼 클릭

#### Netlify 설정 파일 (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
    [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[redirects]]
  from = "/blog/*"
  to = "/blog/:splat"
  status = 200
```

---

### 3. GitHub Pages

#### 장점
- 완전 무료
- 깃허브와 통합됨

#### 단점
- 서버리스 함수 미지원
- 빌드 속도 느림
- API 라우트 제한

#### 설정 방법

**방법 A: GitHub Actions**
1. `.github/workflows/deploy.yml` 파일 생성

**방법 B: 직접 업로드**
1. `npm run build` 실행
2. `out` 폴더 (없음) 또는 `.next` 폴더 업로드
3. GitHub Pages 설정에서 소스 브랜치: `main`

#### GitHub Actions 설정 (.github/workflows/deploy.yml)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './.next'
```

---

## 배포 체크리스트

### 배포 전
- [ ] `.env` 파일 확인 (API 키, 데이터베이스 URL 등)
- [ ] 깃허브 최신 코드 푸시
- [ ] `robots.txt` 확인 (크롤러 허용)
- [ ] `sitemap.xml` 확인 (URL 형식)
- [ ] 환경 변수 설정 (로컬 vs 프로덕션)

### 배포 후
- [ ] 빌드 에러 없음 확인
- [ ] 모든 페이지 접근 가능한지 확인
- [ ] 네비게이션 정상 작동
- [ ] 폼 제출 기능 테스트
- [ ] 이미지 로딩 확인
- [ ] HTTPS 적용 확인
- [ ] 모바일 레이아웃 확인

---

## 환경 변수 관리

### 로컬 개발 (.env.local)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=local-dev-secret
DATABASE_URL=file:./dev.db
```

### 프로덕션 (배포 플랫폼)
```env
NEXTAUTH_URL=https://dmssolution.co.kr
NEXTAUTH_SECRET=production-secret-key-here
DATABASE_URL=production-database-url-here
```

### Vercel 환경 변수 설정
1. Vercel Dashboard 접속
2. 프로젝트 선택: `dms-tech-lab`
3. **Settings** → **Environment Variables** 클릭
4. 다음 변수 추가:
   ```
   NEXTAUTH_SECRET=your-secure-random-key
   DATABASE_URL=your-production-database-url
   NEXTAUTH_URL=https://dmssolution.co.kr/api/auth
   ```

### Netlify 환경 변수 설정
1. Netlify Dashboard 접속
2. 프로젝트 선택
3. **Site settings** → **Environment variables** 클릭
4. 다음 변수 추가:
   ```
   NEXTAUTH_SECRET=your-secure-random-key
   DATABASE_URL=your-production-database-url
   NEXTAUTH_URL=https://dmssolution.co.kr/api/auth
   ```

---

## 도메인 설정

### Vercel
1. 프로젝트 **Settings** → **Domains** 클릭
2. `Add Domain` 클릭
3. 도메인 입력: `dmssolution.co.kr`
4. DNS 설정 안내 확인
5. 도메인 제공업체에서 DNS 설정

### Netlify
1. 사이트 **Domain management** → **Add custom domain** 클릭
2. 도메인 입력: `dmssolution.co.kr`
3. DNS 설정 안내 확인

### DNS 설정 예시
```
타입: CNAME
이름: @ 또는 www
값: dms-tech-lab.vercel.app (Vercel 경우)
또는
값: dms-tech-lab.netlify.app (Netlify 경우)
```

---

## 도메인 연결 후 확인 사항

### 1. SSL 인증서
- HTTPS 자동 적용 확인
- 도메인 유효기간 확인

### 2. DNS 전파
- DNS 전파 시간: 5분 - 48시간 (보통 1-24시간)

### 3. 색인 기간
- Google: 24-48시간
- Naver: 3-7일

### 4. 성능 확인
- PageSpeed Insights: https://pagespeed.web.dev/?url=https://dmssolution.co.kr
- Lighthouse: Chrome DevTools → Lighthouse → Generate report

---

## 문제 해결

### 빌드 실패
```
Error: Module not found
해결: npm install
```

### 배포 후 404 에러
```
에러: Page not found
해결: sitemap.xml 확인, .vercelignore/netlify.toml 확인
```

### API 라우트 에러
```
에러: API endpoint not found
해결: 환경 변수 NEXTAUTH_URL 확인
```

### 이미지 로딩 실패
```
에러: Image failed to load
해결: next.config.ts의 remotePatterns 확인, 이미지 URL 확인
```

---

## 모니터링 설정

### Vercel Analytics (자동 포함)
- Vercel Dashboard → Analytics에서 자동으로 제공됨
- 페이지 뷰, 페이지 경로, 지역별 통계 제공

### Google Analytics (선택)
```bash
npm install @next/third-parties/google
```

`app/layout.tsx`에 추가:
```tsx
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
```

### Vercel Speed Insights
- Vercel Dashboard → Analytics → Speed Insights
- 웹사이트 속도, Core Web Vitals 제공

---

## 롤백 전략

### 원클라우드 롤백
- Vercel: 자동으로 롤백 관리됨 (최근 10개)
- Netlify: 롤백 히스토리에서 복구 가능

### 롤백 방법
1. Vercel Dashboard → **Deployments** 클릭
2. 원하는 롤백 버전 선택
3. **Redeploy** 버튼 클릭

---

## CI/CD 설정 (선택 사항)

### GitHub Actions
**파일**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: 'your-vercel-team-id'
          vercel-project-id: 'your-project-id'
          working-directory: ./
```

---

## 추천 배포 플로우

### 개발 → 테스트 → 스테이징 → 프로덕션

1. **개발 환경**
   - 로컬 개발: `npm run dev`
   - 기능 테스트: 각 기능 단위 테스트

2. **테스트 환경**
   - Vercel 프리뷰 배포: `vercel --yes`
   - 기능 통합 테스트

3. **프로덕션 배포**
   - 깃허브에 푸시
   - Vercel 자동 배포 (메인 브랜치)

---

## 보안 체크리스트

### 배포 전
- [ ] `.env.local`이 `.gitignore`에 포함되었는지 확인
- [ ] `.env`가 커밋되지 않았는지 확인
- [ ] API 키가 깃허브에 노출되지 않았는지 확인
- [ ] `next.config.ts`에 민감한 정보 없는지 확인

### 배포 후
- [ ] 환경 변수가 프로덕션용으로 설정되었는지 확인
- [ ] API 엔드포인트가 HTTPS 사용
- [ ] 데이터베이스 연결이 보안되었는지 확인
- [ ] CORS 설정이 올바르게 되었는지 확인

---

## 요약

| 배포 방법 | 설명 난이도 | 추천 대상 |
|-----------|-----------|-----------|
| Vercel | 쉬움 (자동) | Next.js, 추천 ⭐ |
| Netlify | 쉬움 (CLI/Dashboard) | 정적 사이트 |
| GitHub Pages | 중간 (Actions 수동) | 오픈소스 프로젝트 |

---

## 최종 권장사항

### 1단계: Vercel 배포 (Next.js 최적화)
1. Vercel CLI 설치: `npm i -g vercel`
2. Vercel 로그인 및 프로젝트 연결
3. 빌드 및 배포 테스트
4. 환경 변수 설정 (NEXTAUTH_SECRET 등)
5. 도메인 연결 (dmssolution.co.kr)
6. DNS 설정 및 확인

### 2단계: 배포 후 최적화
1. Vercel Analytics 확인
2. PageSpeed Insights 테스트
3. Vercel Speed Insights 확인
4. Core Web Vitals 모니터링

---

## 도움말크

- [Vercel 문서](https://vercel.com/docs)
- [Netlify 문서](https://docs.netlify.com/)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

---

**준비 완료! 🚀**

이제 원하는 배포 방법을 선택하고, 단계별로 진행하세요.
