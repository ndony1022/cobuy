## 동네 Co-Buy Web App

쿠팡 등에서 구매한/구매 예정인 대용량 상품을 같은 동네 사람들과 공동구매·분할할 수 있는 웹앱입니다.

### 주요 페이지
- `/` – 홈 피드 (공동구매 목록)
- `/deals/:id` – 공동구매 상세
- `/deals/new` – 공동구매 등록
- `/my/deals` – 내 거래 내역 (호스트/조인러)
- `/my/profile` – 마이페이지 (프로필/후기/설정)
- `/chat/:roomId` – 채팅방

자세한 폴더 구조는 `PROJECT_STRUCTURE.md`, 레이아웃 설계는 `LAYOUT_DESIGN.md`를 참고하세요.

모든 TypeScript 타입은 `src/types/` 디렉토리에 있으며, `src/types/index.ts`에서 한 번에 export 합니다.

---

## 1. 로컬 개발 환경에서 실행하기

### 1-1. 의존성 설치

프로젝트 루트(`/Users/dohoonnam/Desktop/cobuy`)에서 다음 명령을 실행합니다.

```bash
npm install
```

### 1-2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`에 접속하면 홈 피드를 확인할 수 있습니다.

### 1-3. 프로덕션 빌드 & 로컬 확인 (선택)

```bash
npm run build
npm start
```

---

## 2. GitHub에 커밋하고 원격 저장소로 푸시하기

아래 예시는 `main` 브랜치를 기준으로 합니다.

```bash
# git 초기화 (이미 되어 있다면 생략)
git init

# 변경 파일 스테이징
git add .

# 커밋
git commit -m "chore: 초기 Co-Buy 웹앱 셋업"

# GitHub에 새 리포지토리 생성 후, 안내에 따라 origin 추가
git remote add origin git@github.com:<your-username>/<your-repo>.git

# 원격으로 푸시
git push -u origin main
```

> 이미 원격이 연결되어 있다면 `git remote` / `git remote -v`로 확인 후 `git push`만 실행하면 됩니다.

---

## 3. Git 연동 기반 무료 배포(Vercel 기준)

Next.js App Router 구조이므로, GitHub → Vercel 연동으로 배포하는 것이 가장 간단합니다.

1. GitHub에 이 프로젝트를 푸시합니다.  
2. Vercel 계정을 생성하고 GitHub 계정을 연동합니다.  
3. Vercel 대시보드에서 **New Project** → GitHub에서 이 리포지토리를 선택합니다.  
4. 설정은 기본값(Framework: Next.js, Build Command: `next build`, Output: `.next`)을 그대로 둔 뒤 **Deploy**를 클릭합니다.  
5. 빌드가 완료되면 `https://your-project.vercel.app` 형태의 URL로 무료로 접근할 수 있습니다.

이후에는 main 브랜치에 푸시할 때마다 Vercel이 자동으로 새 버전을 빌드/배포합니다.

---

## 4. 기존 설계 문서

서비스 개념 및 상세 설계는 다음 문서를 참고하세요.

- `LAYOUT_DESIGN.md` – 각 페이지의 컴포넌트 트리 및 화면 설계
- `PROJECT_STRUCTURE.md` – 폴더 및 파일 구조 설계

