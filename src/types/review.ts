/**
 * Review 관련 타입 정의
 */

import type { UserId } from './user';
import type { DealId } from './deal';

export type ReviewId = string;

export interface Review {
  id: ReviewId;
  dealId: DealId;
  fromUserId: UserId;
  toUserId: UserId;
  rating: number;      // 1~5
  comment?: string;
  createdAt: string;
}

// 후기 작성 폼 데이터
export interface ReviewFormData {
  rating: number;
  comment?: string;
}

