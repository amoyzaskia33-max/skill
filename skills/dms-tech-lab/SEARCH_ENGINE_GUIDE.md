# 검색 엔진 등록 가이드

## 1단계: 기술적 준비 (이미 완료) ✓

### 완료된 작업

| 항목 | 파일 위치 | 상태 |
|--------|-----------|--------|
| robots.txt | `/public/robots.txt` | ✅ 생성됨 |
| sitemap.xml | `/app/sitemap.ts` | ✅ 생성됨 |
| 메타데이터 | `lib/metadata.ts` | ✅ 적용됨 |
| JSON-LD | `app/layout.tsx` | ✅ 적용됨 |

---

## 2단계: Google Search Console 등록

### 2-1. Google 계정 생성
1. [Google Search Console](https://search.google.com/search-console) 접속
2. Google 계정으로 로그인

### 2-2. 속성(Property) 추가
1. **속성 추가** 버튼 클릭
2. **URL 접두어** 선택:
   - 선택: `https://dmssolution.co.kr/`
   - **주의**: 도메인 구매자가 본인이어야 함
   - 도메인 구매자가 아닐 경우: HTML 파일 업로드 방식 선택

### 2-3. 소유권 확인
#### 방법 A: DNS 레코드 (권장)
1. Google에서 제공하는 TXT 레코드 확인
2. 도메인 관리 사이트에서 DNS 설정
3. 유형: `TXT` / 호스트: `@` / 값: Google 레코드 입력
4. 완료 후 **확인** 버튼 클릭 (최대 24-48시간 소요)

#### 방법 B: HTML 파일 업로드
1. Google에서 제공하는 HTML 파일 다운로드
2. 서버 루트 디렉토리에 업로드
3. 접속 확인: `https://dmssolution.co.kr/googleVerificationCode.html`

### 2-4. Sitemap 제출
1. 왼쪽 메뉴 → **사이트맵** 클릭
2. **새 사이트맵 추가** 클릭
3. 다음 사이트맵 URL 입력:
   ```
   https://dmssolution.co.kr/sitemap.xml
   ```
4. **제출** 클릭

### 2-5. 색인 생성 요청 (Indexed Coverage 확인)
1. 왼쪽 메뉴 → **URL 검사** 클릭
2. 주요 페이지 URL 입력 후 요청:
   - 홈: `https://dmssolution.co.kr/`
   - 회사 소개: `https://dmssolution.co.kr/about`
   - 서비스: `https://dmssolution.co.kr/services`
3. 요청 후 24-48시간 후 색인 확인

---

## 3단계: Naver Search Advisor 등록

### 3-1. Naver Search Advisor 접속
1. [Naver Search Advisor](https://searchadvisor.naver.com/) 접속
2. Naver 아이디로 로그인

### 3-2. 사이트 등록
1. **사이트 등록** 탭 클릭
2. **웹사이트 주소** 입력: `https://dmssolution.co.kr`
3. 사이트 정보 입력:
   - 사이트명: DMS.LAB
   - 카테고리: IT/인터넷 > 소프트웨어
   - 설명: Automotive Retail AI & 3D Engineering Solutions
4. **등록** 버튼 클릭

### 3-3. 사이트맵 제출
1. **사이트맵 관리** → **사이트맵 등록** 클릭
2. 사이트맵 URL 입력:
   ```
   https://dmssolution.co.kr/sitemap.xml
   ```
3. **등록** 클릭

### 3-4. 로봇 파일 확인
1. 왼쪽 메뉴 → **로봇 분석** 클릭
2. **로봇 파일 가져오기** 클릭
3. `https://dmssolution.co.kr/robots.txt` 입력 후 분석

---

## 4단계: 한국 내 검색 엔진 추가 등록

### 4-1. Daum (Kakao)
- **등록 사이트**: [Daum 사이트 등록](https://search.daum.net/)
- 절차: Google과 유사
- 사이트맵: `https://dmssolution.co.kr/sitemap.xml`

### 4-2. Bing (Microsoft)
- **등록 사이트**: [Bing Webmaster Tools](https://www.bing.com/webmasters)
- Bing 등록 시 Google에도 자동으로 등록됨
- 사이트맵 제출 필요

---

## 5단계: 모니터링 및 관리

### 5-1. 색인 상태 확인 (주기적)

#### Google Search Console
1. **개요** 페이지에서 전체 색인 상태 확인
2. **페이지** 탭에서 색인된 페이지, 제외된 페이지 확인
3. **URL 검사**로 개별 페이지 색인 상태 확인

#### Naver Search Advisor
1. **사이트 정보** 탭에서 색인 현황 확인
2. **사이트맵** 탭에서 사이트맵 처리 현황 확인
3. **검색어** 탭에서 사이트 노출 키워드 확인

### 5-2. 검색 노출 최적화 (SEO)

#### 키워드 모니터링
- 주요 키워드: AI, 자동화, 3D 엔지니어링, 워크플로우, N8N, 프롬프트 엔지니어링
- 검색 순위 추적 (Google Search Console에서 제공)

#### 콘텐츠 업데이트
- 정기적으로 블로그 포스트 게시
- 기술 문서 추가
- 프로젝트 케이스 스터디 업데이트

#### 내부 링크 구조 개선
- 사이트 내 상호 참조 최적화
- 핵심 페이지로 링크 분산

### 5-3. 외부 링크 구축 (백링크)

#### 백링크 중요성
- 검색 엔진 평가 요소 중 하나
- 고품질 사이트에서 링크 획득 중요

#### 백링크 획득 방법
- **기술 블로그 게시**: dev.to, Medium, Velog
- **오픈소스 참여**: GitHub, GitLab 프로젝트 활용
- **소셜 미디어**: LinkedIn, Facebook 페이지 운영
- **댓글/포럼 활동**: 관련 커뮤니티 참여

---

## 6단계: 검색 노출 확인 방법

### 6-1. 직접 검색

다음 검색어로 검색 후 노출 확인:
```
site:dmssolution.co.kr [검색어]
```

예시:
```
site:dmssolution.co.kr AI 자동화
site:dmssolution.co.kr DMS
site:dmssolution.co.kr 3D 엔지니어링
```

### 6-2. Google 검색

```
DMS.LAB
DMS AI 자동화
DMS 3D 엔지니어링
```

### 6-3. Naver 검색

```
DMS.LAB
DMS AI 자동화
DMS 3D 엔지니어링
```

---

## 7단계: Analytics 및 추적 설정 (선택 사항)

### 7-1. Google Analytics 4 (GA4)
1. [Google Analytics](https://analytics.google.com/) 접속
2. 속성(Property) 생성
3. 측정 ID (G-XXXXXXXXXX) 획득
4. `app/layout.tsx`에 스크립트 추가:
```tsx
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

### 7-2. Google Tag Manager (GTM)
1. [Google Tag Manager](https://tagmanager.google.com/) 접속
2. 계정 생성 및 컨테이너 설정
3. `app/layout.tsx`에 GTM 스크립트 추가:
```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-XXXXXXX');
    `,
  }}
/>
<noscript
  dangerouslySetInnerHTML={{
    __html: `
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>
    `,
  }}
/>
</noscript>
```

---

## 8단계: 정기 점검 사항

### 8-1. 매주
- [ ] Google Search Console에서 색인 오류 확인
- [ ] Naver Search Advisor에서 색인 상태 확인
- [ ] 검색 순위 추적 (주요 키워드 5개)

### 8-2. 매월
- [ ] 새로운 페이지 색인 현황 확인
- [ ] 백링크 현황 확인 (Ahrefs, Semrush 도구 활용)
- [ ] 경쟁사이트 SEO 현황 분석

### 8-3. 매분기
- [ ] SEO 전략 검토 및 수정
- [ ] 기술 SEO (페이지 속도, 모바일 최적화) 점검
- [ ] 콘텐츠 기획 및 로드맵 수정

---

## 9단계: 고급 SEO 기법 (선택 사항)

### 9-1. 구조화된 데이터 확장
현재: Organization, WebSite

추가 가능:
- **Article**: 각 블로그 포스트에 적용
- **Breadcrumb**: 페이지 경로 표시
- **FAQ**: 자주 묻는 질문

### 9-2. 다국어 지원 (i18n)
- 영어 버전: `https://dmssolution.co.kr/en/`
- 중국어 버전: `https://dmssolution.co.kr/zh/`
- hreflang 태그 적용

### 9-3. 로컬 SEO
- Google Business Profile 등록 (구글 비즈니스 프로필)
- Naver Place 등록 (네이버 플레이스)
- 지역 기반 검색 최적화

---

## 10단계: 트러블슈팅

### 10-1. 색인이 안 될 때
1. **robots.txt 확인**: 크롤러 차단 설정 확인
2. **sitemap.xml 확인**: URL 형식 및 접근 가능 여부 확인
3. **meta robots noindex**: 실수로 noindex 설정된 페이지 확인
4. **서버 상태**: 5xx 오류 확인
5. **페이지 로딩 속도**: 3초 이상 소요 시 최적화 필요

### 10-2. 색인은 되는데 검색 결과에 안 나올 때
1. **콘텐츠 품질**: 도메인 권위성 확인
2. **경쟁 사이트**: 상위 노출 사이트 분석 및 대응
3. **키워드 경쟁도**: 키워드 조정 필요
4. **사이트 도메인 연령**: 새 도메인은 색인에 시간 소요

### 10-3. 모바일 색인 문제
1. **모바일 친화성**: 반응형 디자인 확인
2. **모바일 사이트맵**: 별도 사이트맵 제출 필요 시 확인
3. **AMP 페이지**: 빠른 페이지 필요 시 고려

---

## 체크리스트

### 필수 (Must Have)
- [x] robots.txt 생성
- [x] sitemap.xml 생성
- [x] 메타데이터 적용
- [x] JSON-LD 적용
- [ ] Google Search Console 등록
- [ ] Naver Search Advisor 등록
- [ ] 사이트맵 제출
- [ ] 색인 상태 주기적 확인

### 권장 (Should Have)
- [ ] Google Analytics 설치
- [ ] Google Tag Manager 설치
- [ ] 백링크 구축 (10개 이상)
- [ ] 로컬 SEO (Google Business, Naver Place)
- [ ] 소셜 미디어 운영
- [ ] 기술 블로그 운영

### 고급 (Nice to Have)
- [ ] 다국어 지원
- [ ] AMP 페이지
- [ ] 구조화된 데이터 확장
- [ ] Schema.org 마이크로데이터
- [ ] PWA (Progressive Web App)

---

## 리소스 링크

### 공식 문서
- [Google Search Console 도움말](https://support.google.com/webmasters/)
- [Naver Search Advisor 도움말](https://searchadvisor.naver.com/)
- [Schema.org](https://schema.org/)
- [Google SEO 시작하기](https://developers.google.com/search/docs/)

### 도구
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/)

---

## 예상 소요 시간

| 단계 | 작업 | 예상 시간 |
|--------|--------|-----------|
| 1 | Google 등록 및 검증 | 1-2시간 |
| 2 | Naver 등록 및 검증 | 30분 - 1시간 |
| 3 | 사이트맵 제출 | 30분 |
| 4 | Analytics 설치 | 1-2시간 |
| 5 | 색인 확인 | 24-48시간 (자동) |
| 6 | 검색 노출 확인 | 1주-1개월 |

**총 소요 시간**: 1주일 내 초기 설정 완료, 1개월 내 안정화

---

## 성공 지표

### 초기 1개월
- Google 색인 페이지: 10개 이상
- Naver 색인 페이지: 10개 이상
- 주요 키워드 검색: 20위 이상 (상위 3페이지)

### 3개월 후
- 유기적 트래픽: 50% 증가
- 백링크 수: 20개 이상
- 도메인 권위(DA): 10 이상

### 6개월 후
- 유기적 트래픽: 100% 증가
- 전환율: 2% 이상
- 브랜드 검색: 1페이지 노출

---

**준비 완료! 🎉**

이제 다음 단계에 따라 검색 엔진에 사이트를 등록하세요:

1. **Google Search Console** - 가장 우선순위
2. **Naver Search Advisor** - 한국 시장 필수
3. **사이트맵 제출** - 모든 검색 엔진
4. **정기 모니터링** - 주 1회 색인 상태 확인
