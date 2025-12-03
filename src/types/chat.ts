/**
 * Chat 관련 타입 정의
 */

import type { UserId } from './user';
import type { DealId } from './deal';

export type ChatRoomId = string;
export type MessageId = string;

export type MessageType = 
  | "TEXT"           // 일반 텍스트 메시지
  | "SYSTEM";        // 시스템 메시지

export interface ChatMessage {
  id: MessageId;
  roomId: ChatRoomId;
  dealId: DealId;
  senderId: UserId | "SYSTEM";
  type: MessageType;
  content: string;
  createdAt: string;
}

export interface ChatRoom {
  id: ChatRoomId;
  dealId: DealId;
  participantIds: UserId[];
  lastMessage?: ChatMessage;
  lastMessageAt?: string;
  createdAt: string;
}

