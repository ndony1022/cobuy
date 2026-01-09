'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'

import ChatHeader from '@/components/chat/ChatHeader'
import MessageInput from '@/components/chat/MessageInput'
import MessageList from '@/components/chat/MessageList'
import type { ChatMessage } from '@/types'

const CURRENT_USER_ID = 'user-001'

const participantNames: Record<string, string> = {
  [CURRENT_USER_ID]: '나',
  'user-002': '지민',
  'user-003': '서연',
  SYSTEM: '시스템',
}

const baseMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    roomId: 'room-001',
    dealId: 'deal-001',
    senderId: 'SYSTEM',
    type: 'SYSTEM',
    content: '공동구매가 곧 확정됩니다. 픽업 일정에 맞춰주세요.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'msg-002',
    roomId: 'room-001',
    dealId: 'deal-001',
    senderId: 'user-002',
    type: 'TEXT',
    content: '저는 이번 주 토요일 오전에 픽업 가능해요!',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'msg-003',
    roomId: 'room-001',
    dealId: 'deal-001',
    senderId: CURRENT_USER_ID,
    type: 'TEXT',
    content: '좋아요! 토요일 10시에 편의점 앞에서 뵙죠.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'msg-004',
    roomId: 'room-001',
    dealId: 'deal-001',
    senderId: 'user-003',
    type: 'TEXT',
    content: '저도 그 시간 괜찮습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
]

export default function ChatRoomPage() {
  const params = useParams()
  const roomId = params?.roomId as string | undefined

  const initialMessages = useMemo(() => {
    return baseMessages.map((message) => ({
      ...message,
      roomId: roomId ?? message.roomId,
    }))
  }, [roomId])

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  const handleSend = (content: string) => {
    const nextMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId: roomId ?? 'room-001',
      dealId: 'deal-001',
      senderId: CURRENT_USER_ID,
      type: 'TEXT',
      content,
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, nextMessage])
  }

  return (
    <div className="flex flex-col h-[70vh] max-h-[720px] bg-white rounded-lg shadow-sm border border-gray-100">
      <ChatHeader
        title="공동구매 채팅방"
        subtitle={roomId ? `Room ID: ${roomId}` : undefined}
        meta={
          <div>
            <p>픽업: 3월 28일(토) 10:00</p>
            <p>장소: 서초동 편의점 앞</p>
          </div>
        }
      />

      <MessageList
        messages={messages}
        currentUserId={CURRENT_USER_ID}
        nameMap={participantNames}
      />

      <MessageInput onSend={handleSend} />
    </div>
  )
}

