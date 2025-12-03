/**
 * Deal (공동구매) 관련 타입 정의
 */

import type { UserId } from './user';

export type DealId = string;

export type DealStatus = 
  | "OPEN"        // 모집 중
  | "CONFIRMED"   // 확정 (최소 수량 충족)
  | "ORDERED"     // 주문 완료
  | "PICKUP"      // 픽업 진행 중
  | "COMPLETED"   // 거래 완료
  | "CANCELLED";  // 취소됨

export type DealCategory = 
  | "FOOD"        // 식품
  | "LIVING"      // 생활
  | "PET"         // 반려동물
  | "OTHER";      // 기타

export interface DealLocation {
  lat: number;
  lng: number;
  addressText: string;
}

export interface Deal {
  id: DealId;
  hostId: UserId;
  title: string;
  productImageUrl?: string;
  externalProductUrl?: string;     // 쿠팡 링크 등
  totalQuantity: number;           // 총 수량
  unitLabel: string;               // "개", "팩", "kg" 등
  totalPrice: number;
  minQuantityToConfirm: number;    // 확정 최소 수량
  unitPrice: number;               // totalPrice / totalQuantity
  status: DealStatus;
  location: DealLocation;
  pickupDate?: string;             // ISO date
  pickupTimeRange?: string;        // "19:00~21:00" 등
  category: DealCategory;
  radiusMeter: number;             // 노출 반경
  createdAt: string;
  updatedAt?: string;
}

// 공동구매 등록 시 사용하는 폼 데이터
export interface DealFormData {
  // Step 1
  dealType: "PRE_ORDER" | "EXISTING";  // 주문하면서 나눌래 / 이미 가지고 있는 걸 나눌래
  productUrl?: string;
  title: string;
  productImageUrl?: string;
  externalProductUrl?: string;
  option?: string;  // 맛/사이즈 등
  
  // Step 2
  totalPrice: number;
  totalQuantity: number;
  myQuantity: number;              // 내가 가져갈 수량
  minQuantityPerPerson: number;    // 참여자당 최소 수량
  maxQuantityPerPerson?: number;   // 참여자당 최대 수량
  
  // Step 3
  pickupLocation: DealLocation;
  pickupDates: string[];           // 픽업 가능 날짜들
  pickupTimeRange: string;         // 픽업 시간대
  
  // 기타
  category: DealCategory;
  radiusMeter: number;
}

// 참여자 정보
export type ParticipationId = string;

export type ParticipationStatus = 
  | "REQUESTED"      // 참여 요청
  | "CONFIRMED"      // 확정됨
  | "PICKUP_DONE"    // 픽업 완료
  | "CANCELLED";     // 취소됨

export interface Participation {
  id: ParticipationId;
  dealId: DealId;
  userId: UserId;
  quantity: number;
  expectedPrice: number; // quantity * unitPrice
  status: ParticipationStatus;
  createdAt: string;
}

