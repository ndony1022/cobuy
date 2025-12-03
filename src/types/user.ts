/**
 * User 관련 타입 정의
 */

export type UserId = string;

export interface Location {
  lat: number;
  lng: number;
  addressText: string;
}

export interface User {
  id: UserId;
  nickname: string;
  email: string;
  passwordHash: string;
  location: Location;
  ratingAverage: number;      // 후기 평균 점수
  tradeCount: number;         // 완료 거래 수
  noShowCount: number;        // 노쇼 횟수
  createdAt: string;
}

// API 응답용 타입 (passwordHash 제외)
export interface UserPublic {
  id: UserId;
  nickname: string;
  location: Location;
  ratingAverage: number;
  tradeCount: number;
  noShowCount: number;
  createdAt: string;
}

