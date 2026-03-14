# 배포 상태 확인 및 플랫폼 전환 가이드

## 배포 상태 확인 방법

### 1. 현재 도메인 상태 확인

#### 방법 A: 웹사이트 접속 후 주소 확인
1. 브라우저에 `https://dmssolution.co.kr` 접속
2. 주소 표시줄에 표시된 주소 확인
3. **다음**:
   - 주소가 `dmssolution.co.kr`인지
   - 아니면 `dmssolution.vercel.app` (Vercel) 또는 `dms-tech-lab.netlify.app` (Netlify)인지

### 2. 배포 플랫폼 확인

#### Vercel 배포 확인
```bash
# 1. vercel CLI 설치 확인
vercel --version

# 2. Vercel 프로젝트 확인
vercel list

# 3. 현재 배포 URL 확인
# 프로젝트 목록에 있는 Production URL 확인
```

**Vercel URL 패턴:**
- `project-name.vercel.app` (기본)
- `custom-domain.vercel.app`
- `custom-domain` (도메인 연결된 경우)

#### Netlify 배포 확인
```bash
# 1. netlify CLI 설치 확인
netlify --version

# 2. Netlify 사이트 확인
netlify status

# 3. 현재 배포 URL 확인
# 현재 사이트의 URL 확인
```

**Netlify URL 패턴:**
- `project-name.netlify.app` (기본)
- `custom-domain.netlify.app`
- `custom-domain` (도메인 연결된 경우)

---

## 3. 깃허브 리모트 설정

### 현재 설정
```
origin: https://github.com/MetachainArt/dms-tech-lab.git
```

### Vercel로 깃허브 연결 (추천)
1. Vercel Dashboard 접속
2. **Settings** → **Git** → **Connected Git**
3. 저장소: `MetachainArt/dms-tech-lab`
4. 브랜치: `main`
5. **Connect** 클릭

### Netlify로 깃허브 연결
1. Netlify Dashboard 접속
2. **Site configuration** → **Build & deploy** → **Continuous Deployment**
3. 저장소: `git@github.com:MetachainArt/dms-tech-lab.git`
4. 브랜치: `main`
5. **Connect** 클릭

---

## 4. 플랫폼 전환

### Vercel로 전환하는 이유
1. **Next.js 최적화**: Vercel은 Next.js 공식으로 더 성능 우수
2. **자동 HTTPS**: Vercel에서 자동으로 SSL 인증서 발급
3. **글로벌 CDN**: 세계 최대 규모의 네트워크
4. **자동 롤백**: Vercel이 자동으로 배포되어 최근 버전 유지
5. **무료 계획**: 개발자용 프리 티어

### 전환 단계

#### 1단계: Netlify 배포 삭제
1. Netlify Dashboard 접속
2. **Sites** → 해당 사이트 클릭
3. **Site overview** → **Delete site** 클릭
4. 삭제 확인 (경고 후 확인)

#### 2단계: Vercel에 깃허브 연결
위 3번 항목 참조

#### 3단계: Vercel로 배포
```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 로그인
vercel login

# 3. 배포
vercel --prod
```

#### 4단계: 도메인 연결
1. Vercel Dashboard 접속
2. **Domains** → **Add Domain** 클릭
3. 도메인 입력: `dmssolution.co.kr`
4. **Continue** 클릭

#### 5단계: DNS 설정
1. Vercel Dashboard에서 DNS 설정 확인
2. 다음 값으로 CNAME 레코드 추가:
   - Type: CNAME
   - Name: `@` 또는 `www`
   - Value: `dms-tech-lab.vercel.app`

#### 6단계: 도메인 제공자에게 전달
1. 도메인 관리자에게 다음 정보 전달:
   - Vercel용 CNAME 레코드: `dms-tech-lab.vercel.app`
   - 원본 도메인: `dmssolution.co.kr`
   - TTL: 3600 (1시간)

#### 7단계: DNS 전파 대기
- DNS 전파: 5-30분 소요
- **대기 시간 동안**:
  - Netlify 배포 삭제 완료 상태 유지
  - Vercel 배포 준비 완료

---

## 5. 확인 체크리스트

### Vercel로 전환 전
- [ ] Vercel CLI 설치됨
- [ ] Netlify 사이트 삭제됨
- [ ] Vercel Dashboard에 깃허브 연결됨
- [ ] Vercel로 배포됨
- [ ] Vercel Dashboard에 도메인 추가됨
- [ ] DNS CNAME 설정됨
- [ ] 도메인 제공자에게 전달됨

### 전환 후
- [ ] 새로운 URL 접속 가능한지 확인
- [ ] HTTPS 자동 적용 확인
- [ ] robots.txt 접근 가능
- [ ] sitemap.xml 접근 가능
- [ ] 모든 페이지 정상 로딩
- [ ] 검색 엔진 색인 확인

---

## 문제 해결

### Vercel + 깃허브 자동 배포 설정

#### Vercel CLI로 자동 배포 설정
```bash
# 1. 프로젝트에서 Vercel로 배포
vercel --prod

# 2. 깃허브와 Vercel 연결 (이미 완료됨)

# 3. Vercel Dashboard에서 자동 배포 설정
# Settings → Git → Automatic Deployments → On
# 이렇게 설정하면 깃허브에 push할 때마다 자동으로 Vercel에 배포됨
```

### 깃허브 Actions를 이용한 자동 배포 (추천)

#### .github/workflows/deploy.yml 파일 생성
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
```

---

## 6. Netlify와 Vercel 비교

| 항목 | Netlify | Vercel |
|--------|----------|--------|
| 속도 | 빠름 | 매우 빠름 |
| 빌드 시간 | 1-2분 | 30초 |
| 글로벌 CDN | 좋음 | 최고 |
| 무료 계획 | 개발자 | 개발자 |
| 롤백 | 수동 | 자동 |
| Next.js 최적화 | 기본 지원 | 공식 지원 |
| 팀 계획 | 유료 | 무료 |
| 로컬 개발 | 좋음 | 좋음 |

---

## 최종 권장 사항

### Vercel 사용이 권장되는 이유

1. **Next.js 제작사**  
   - Vercel이 Next.js를 만듦 개발사
   - Next.js와 완벽하게 통합됨
   - 엣지 케이스가 더 최적화됨

2. **자동 HTTPS**  
   - 무료 SSL 인증서 발급
   - 도메인 연결 시 자동으로 HTTPS 적용

3. **자동 롤백**  
   - 깃허브 push 시 자동 배포
   - 최신 버전 항상 유지
   - 수동 배포 불필요

4. **글로벌 CDN**  
   - 세계 최대 규모의 네트워크
   - 모든 리전에서 빠른 로딩
   - DDoS 방어

5. **무료 계획**  
   - 개인 프로젝트 완전 무료
   - 프로 티어 사용 가능 (Hobby 계획)

---

## 도메인 연결 방법

### Vercel 도메인 연결 상세 절차

1. **Vercel Dashboard** → **Domains** → **Add Domain**
2. 도메인 입력: `dmssolution.co.kr`
3. **Continue** 클릭
4. **DNS 설정 확인**:
   ```
   Type: CNAME
   Name: @ (또는 www)
   Value: dms-tech-lab.vercel.app
   TTL: 3600
   ```
5. **도메인 제공자에게 전달**:
   - CNAME 레코드: `dms-tech-lab.vercel.app`
   - 원본 도메인: `dmssolution.co.kr`
   - TTL: 3600

---

## 참고 리소스

### 공식 문서
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Domains](https://vercel.com/docs/concepts/projects/domains)
- [Vercel Next.js](https://vercel.com/docs/frameworks/nextjs)
- [Vercel CLI](https://vercel.com/docs/cli)

---

## 요약

현재 프로젝트가 **Netlify와 Vercel에 동시에 배포**되어 있습니다.

### 권장 사항
1. **Netlify 배포 삭제**
2. **Vercel로 깃허브 연결 확정** (이미 되어 있음)
3. **Vercel Dashboard에 도메인 연결**
4. **깃허브 Actions로 자동 배포 설정** (선택 사항)
5. **도메인 제공자에게 CNAME 설정 전달**

### 이유
- **성능**: Vercel이 Next.js에 최적화
- **무료**: 개발자용 프리 티어 제공
- **자동화**: 깃허브 push 시 자동 배포
- **글로벌**: 세계 최대 규모의 네트워크

---

**Vercel로의 전환을 권장합니다! ⚡**
