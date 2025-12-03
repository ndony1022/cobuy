# 동네 Co-Buy Web App - 프로젝트 구조

## 폴더 구조

```
cobuy-webapp/
├── src/
│   ├── app/                    # Next.js App Router (또는 pages/ for Pages Router)
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 홈 페이지 (/)
│   │   ├── deals/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx   # 공동구매 상세 (/deals/:id)
│   │   │   └── new/
│   │   │       └── page.tsx   # 공동구매 등록 (/deals/new)
│   │   ├── my/
│   │   │   ├── deals/
│   │   │   │   └── page.tsx   # 내 거래 내역 (/my/deals)
│   │   │   └── profile/
│   │   │       └── page.tsx   # 마이페이지 (/my/profile)
│   │   └── chat/
│   │       └── [roomId]/
│   │           └── page.tsx   # 채팅방 (/chat/:roomId)
│   │
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── layout/           # 레이아웃 관련
│   │   │   ├── Header.tsx    # 글로벌 내비게이션
│   │   │   ├── Footer.tsx    # 푸터
│   │   │   └── Sidebar.tsx   # 사이드바 (선택사항)
│   │   │
│   │   ├── deal/             # 공동구매 관련
│   │   │   ├── DealCard.tsx  # 공동구매 카드
│   │   │   ├── DealDetail.tsx # 상세 화면
│   │   │   ├── DealForm/     # 등록 폼 (Step별)
│   │   │   │   ├── Step1ProductInfo.tsx
│   │   │   │   ├── Step2PriceQuantity.tsx
│   │   │   │   ├── Step3PickupInfo.tsx
│   │   │   │   └── Step4Confirm.tsx
│   │   │   ├── ParticipationList.tsx # 참여자 리스트
│   │   │   └── ParticipationForm.tsx # 참여 폼
│   │   │
│   │   ├── chat/             # 채팅 관련
│   │   │   ├── ChatRoom.tsx  # 채팅방 메인
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageItem.tsx
│   │   │   └── MessageInput.tsx
│   │   │
│   │   ├── user/             # 사용자 관련
│   │   │   ├── UserProfile.tsx
│   │   │   ├── ReviewList.tsx
│   │   │   └── ReviewCard.tsx
│   │   │
│   │   ├── common/           # 공통 UI
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   └── ui/               # 기본 UI 컴포넌트 (shadcn/ui 등)
│   │
│   ├── lib/                  # 유틸리티 및 헬퍼
│   │   ├── api/              # API 클라이언트
│   │   │   ├── client.ts     # API 클라이언트 설정
│   │   │   ├── deals.ts      # Deal 관련 API
│   │   │   ├── users.ts      # User 관련 API
│   │   │   ├── chat.ts       # Chat 관련 API
│   │   │   └── reviews.ts    # Review 관련 API
│   │   │
│   │   ├── utils/            # 유틸리티 함수
│   │   │   ├── distance.ts   # 거리 계산
│   │   │   ├── price.ts      # 가격 포맷팅
│   │   │   ├── date.ts       # 날짜 포맷팅
│   │   │   └── validation.ts # 폼 검증
│   │   │
│   │   └── hooks/            # 커스텀 훅
│   │       ├── useDeals.ts   # Deal 데이터 fetching
│   │       ├── useChat.ts    # Chat 데이터 fetching
│   │       ├── useLocation.ts # 위치 관련
│   │       └── useAuth.ts    # 인증 관련
│   │
│   ├── types/                # TypeScript 타입 정의
│   │   ├── index.ts          # 모든 타입 export
│   │   ├── user.ts           # User 관련 타입
│   │   ├── deal.ts           # Deal 관련 타입
│   │   ├── chat.ts           # Chat 관련 타입
│   │   └── review.ts         # Review 관련 타입
│   │
│   ├── stores/               # 상태 관리 (Zustand, Jotai 등)
│   │   ├── authStore.ts      # 인증 상태
│   │   ├── dealStore.ts      # Deal 상태
│   │   └── chatStore.ts      # Chat 상태
│   │
│   └── styles/               # 스타일
│       ├── globals.css       # 전역 스타일
│       └── variables.css     # CSS 변수
│
├── public/                   # 정적 파일
│   ├── images/
│   └── icons/
│
├── package.json
├── tsconfig.json
├── next.config.js            # Next.js 설정 (또는 vite.config.ts)
└── README.md
```

## 기술 스택 제안

- **프레임워크**: Next.js 14+ (App Router) 또는 Vite + React Router
- **언어**: TypeScript
- **스타일링**: Tailwind CSS + CSS Modules 또는 styled-components
- **상태 관리**: Zustand 또는 Jotai
- **API**: tRPC 또는 REST API (fetch/axios)
- **폼 관리**: React Hook Form + Zod
- **지도**: Kakao Map API 또는 Naver Map API
- **채팅**: WebSocket (Socket.io) 또는 Server-Sent Events

