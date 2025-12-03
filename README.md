# 동네 Co-Buy Web App

쿠팡 등에서 구매한/구매 예정인 대용량 상품을 같은 동네 사람들과 공동구매·분할할 수 있는 웹앱

## 프로젝트 구조

자세한 폴더 구조는 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)를 참고하세요.

## 타입 정의

모든 TypeScript 타입은 `src/types/` 디렉토리에 정의되어 있습니다:

- `user.ts`: User 관련 타입
- `deal.ts`: Deal (공동구매) 및 Participation 관련 타입
- `chat.ts`: Chat 관련 타입
- `review.ts`: Review 관련 타입

## 레이아웃 설계

각 페이지의 컴포넌트 트리 구조는 [LAYOUT_DESIGN.md](./LAYOUT_DESIGN.md)를 참고하세요.

## 주요 기능

### 역할
- **호스트(Host)**: 공동구매를 열고 참여자를 모집
- **조인러(Joiner)**: 열린 공동구매에 참여

### 핵심 플로우
1. 주문 전 공동구매 플로우
2. 이미 구매한 상품 나눔 플로우

### 주요 페이지
- `/` - 홈 피드 (공동구매 목록)
- `/deals/:id` - 공동구매 상세
- `/deals/new` - 공동구매 등록
- `/my/deals` - 내 거래 내역
- `/my/profile` - 마이페이지
- `/chat/:roomId` - 채팅방

## 다음 단계

1. 프로젝트 초기화 (Next.js 또는 Vite 설정)
2. 컴포넌트 구현
3. Mock API 구현
4. 상태 관리 설정

