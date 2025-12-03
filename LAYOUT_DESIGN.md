# 동네 Co-Buy Web App - 레이아웃 설계

## 각 페이지의 컴포넌트 트리 구조

---

## 1. 홈 화면 (/) - `app/page.tsx`

```
HomePage
├── Header (글로벌 내비게이션)
│   ├── Logo
│   ├── SearchBar
│   └── NavButtons (내 거래, 마이페이지)
│
├── FilterBar
│   ├── CategoryFilter (식품/생활/반려/기타)
│   ├── DistanceFilter (500m/1km/3km/동전체)
│   └── SortOptions (최신/마감임박/거리)
│
├── MainContent (Grid 또는 List)
│   └── DealCard[] (반복)
│       ├── ProductImage
│       ├── ProductTitle
│       ├── UnitPrice
│       ├── ProgressBar (현재수량/목표수량)
│       ├── DistanceBadge
│       ├── DeadlineInfo
│       └── ViewDetailButton
│
├── Sidebar (선택사항)
│   ├── PopularDeals
│   └── MyActiveDeals
│
└── Footer
    ├── CustomerService
    ├── TermsLinks
    └── SocialLinks
```

### 주요 컴포넌트
- `components/layout/Header.tsx`
- `components/common/FilterBar.tsx`
- `components/deal/DealCard.tsx`
- `components/layout/Sidebar.tsx`
- `components/layout/Footer.tsx`

---

## 2. 공동구매 상세 화면 (/deals/:id) - `app/deals/[id]/page.tsx`

```
DealDetailPage
├── Header (뒤로가기 버튼 포함)
│
├── ProductSection
│   ├── ProductImage
│   ├── ProductTitle
│   └── ExternalLinkButton (쿠팡 등)
│
├── DealInfoSection
│   ├── QuantityInfo
│   │   ├── TotalQuantity
│   │   ├── CurrentQuantity
│   │   └── RemainingQuantity
│   │
│   ├── PriceInfo
│   │   ├── TotalPrice
│   │   └── UnitPrice
│   │
│   ├── Conditions
│   │   ├── MinQuantityToConfirm
│   │   └── MinParticipants
│   │
│   └── ScheduleInfo
│       ├── OrderDate (주문 예정일)
│       └── PickupDate (픽업 예정일)
│
├── HostInfoSection
│   ├── HostProfile
│   │   ├── Nickname
│   │   ├── Distance
│   │   ├── TradeCount
│   │   └── NoShowCount
│   └── HostRating
│
├── ParticipationSection
│   ├── QuantitySelector
│   │   ├── QuantityInput (+/- 버튼)
│   │   └── ExpectedPriceDisplay
│   │
│   └── ParticipateButton
│
├── ParticipantsList
│   └── ParticipantCard[] (반복)
│       ├── Nickname
│       ├── Quantity
│       └── Status
│
└── ChatButton (채팅방으로 이동)
```

### 주요 컴포넌트
- `components/deal/DealDetail.tsx`
- `components/deal/ParticipationForm.tsx`
- `components/deal/ParticipationList.tsx`
- `components/user/UserProfile.tsx` (호스트 정보)

---

## 3. 공동구매 등록 플로우 (/deals/new) - `app/deals/new/page.tsx`

```
DealFormPage
├── Header (뒤로가기, 진행 단계 표시)
│
├── StepIndicator
│   ├── Step1 (상품 정보)
│   ├── Step2 (가격·수량)
│   ├── Step3 (픽업 정보)
│   └── Step4 (확인)
│
├── FormContent (현재 Step에 따라)
│   │
│   ├── Step1ProductInfo (step === 1)
│   │   ├── DealTypeRadio (주문하면서/이미 가지고 있는)
│   │   ├── ProductUrlInput
│   │   ├── ProductImagePreview
│   │   ├── ProductNameInput
│   │   └── ProductOptionInput
│   │
│   ├── Step2PriceQuantity (step === 2)
│   │   ├── TotalPriceInput
│   │   ├── TotalQuantityInput
│   │   ├── MyQuantityInput
│   │   ├── MinQuantityPerPersonInput
│   │   ├── MaxQuantityPerPersonInput
│   │   └── UnitPriceDisplay (자동 계산)
│   │
│   ├── Step3PickupInfo (step === 3)
│   │   ├── PickupLocationInput
│   │   ├── MapSelector
│   │   ├── PickupDateSelector (복수 선택)
│   │   └── PickupTimeRangeInput
│   │
│   └── Step4Confirm (step === 4)
│       ├── SummaryCard
│       │   ├── ProductImage
│       │   ├── ProductTitle
│       │   ├── UnitPrice
│       │   └── Deadline
│       └── SubmitButton
│
└── NavigationButtons
    ├── PrevButton (이전 단계)
    └── NextButton (다음 단계 / 등록하기)
```

### 주요 컴포넌트
- `components/deal/DealForm/Step1ProductInfo.tsx`
- `components/deal/DealForm/Step2PriceQuantity.tsx`
- `components/deal/DealForm/Step3PickupInfo.tsx`
- `components/deal/DealForm/Step4Confirm.tsx`
- `components/common/StepIndicator.tsx`

---

## 4. 내 거래 내역 (/my/deals) - `app/my/deals/page.tsx`

```
MyDealsPage
├── Header (뒤로가기)
│
├── TabNavigation
│   ├── HostTab (호스트로 연 거래)
│   └── JoinerTab (참여한 거래)
│
├── DealList (현재 탭에 따라 필터링)
│   └── DealCard[] (반복)
│       ├── StatusBadge (모집중/확정/픽업진행/완료/취소)
│       ├── ProductImage
│       ├── ProductTitle
│       ├── DealInfo (수량, 가격)
│       ├── ParticipantsInfo
│       └── ActionButtons
│           ├── ViewDetailButton
│           ├── ChatButton
│           ├── CompletePickupButton (호스트만)
│           └── WriteReviewButton (완료된 거래만)
│
└── EmptyState (거래 내역이 없을 때)
```

### 주요 컴포넌트
- `components/common/TabNavigation.tsx`
- `components/deal/DealCard.tsx` (내 거래용 변형)
- `components/common/Badge.tsx`

---

## 5. 마이페이지 (/my/profile) - `app/my/profile/page.tsx`

```
ProfilePage
├── Header (뒤로가기, 설정 버튼)
│
├── ProfileCard
│   ├── Avatar
│   ├── Nickname
│   ├── Location (동네)
│   ├── Rating (별점 평균)
│   └── TradeSummary ("총 거래 n회, 노쇼 0회")
│
├── ReviewSection
│   ├── SectionTitle ("받은 후기")
│   └── ReviewList
│       └── ReviewCard[] (반복)
│           ├── FromUserNickname
│           ├── Rating
│           ├── Comment
│           └── CreatedAt
│
└── SettingsSection
    ├── NotificationToggle
    ├── LocationChangeButton
    └── LogoutButton
```

### 주요 컴포넌트
- `components/user/UserProfile.tsx`
- `components/user/ReviewList.tsx`
- `components/user/ReviewCard.tsx`
- `components/common/Toggle.tsx`

---

## 6. 채팅방 (/chat/:roomId) - `app/chat/[roomId]/page.tsx`

```
ChatRoomPage
├── ChatHeader
│   ├── DealTitle
│   ├── PickupInfo
│   │   ├── PickupDate
│   │   ├── PickupTime
│   │   └── PickupLocation
│   └── MapButton
│
├── MessageList
│   └── MessageItem[] (반복)
│       ├── SenderInfo (일반 메시지) 또는 SystemBadge (시스템 메시지)
│       ├── MessageContent
│       └── Timestamp
│
├── DealStatusBar (선택사항)
│   └── CurrentStatus (모집중/확정/픽업진행 등)
│
└── MessageInput
    ├── TextInput
    └── SendButton
```

### 주요 컴포넌트
- `components/chat/ChatRoom.tsx`
- `components/chat/MessageList.tsx`
- `components/chat/MessageItem.tsx`
- `components/chat/MessageInput.tsx`

---

## 공통 레이아웃 컴포넌트

### Root Layout (`app/layout.tsx`)
```
RootLayout
├── Providers (상태 관리, 테마 등)
├── GlobalStyles
└── Children (각 페이지)
```

### Header (`components/layout/Header.tsx`)
```
Header
├── Logo (좌측)
├── SearchBar (중앙)
└── NavButtons (우측)
    ├── MyDealsButton
    └── ProfileButton
```

### Footer (`components/layout/Footer.tsx`)
```
Footer
├── CustomerServiceLink
├── TermsLinks
│   ├── TermsOfService
│   └── PrivacyPolicy
└── SocialLinks
```

---

## 상태 관리 구조

### 전역 상태 (Stores)
- `authStore.ts`: 현재 로그인한 사용자 정보
- `dealStore.ts`: 선택된 Deal, 필터 상태
- `chatStore.ts`: 채팅방 목록, 실시간 메시지

### 로컬 상태 (각 컴포넌트)
- 폼 입력값 (React Hook Form)
- 모달 열림/닫힘
- 탭 선택 상태

---

## 라우팅 구조 (Next.js App Router 기준)

```
/                           → HomePage
/deals/[id]                 → DealDetailPage
/deals/new                  → DealFormPage
/my/deals                   → MyDealsPage
/my/profile                 → ProfilePage
/chat/[roomId]              → ChatRoomPage
```

---

## 애니메이션/트랜지션 매핑

1. **홈 → 상세**: Fade-in + Scale-up (0.25s, ease-out)
   - `components/deal/DealCard.tsx`의 클릭 이벤트
   - 모달 또는 페이지 전환

2. **상세 → 참여 확인**: Bottom sheet slide-up (0.3s, ease-in-out)
   - `components/deal/ParticipationForm.tsx`의 참여하기 버튼

3. **참여 확정 → 채팅방**: Slide right-to-left (0.4s)
   - Next.js 페이지 전환 애니메이션

4. **채팅 → 거래 완료**: Crossfade (0.3s)
   - `components/chat/ChatRoom.tsx` 내부 상태 변경

5. **거래 완료 → 후기 작성**: Modal pop-up (0.25s, ease-in-out)
   - `components/common/Modal.tsx` 사용

