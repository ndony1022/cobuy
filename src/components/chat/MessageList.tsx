'use client'

import { useEffect, useRef } from 'react'

import type { ChatMessage } from '@/types'

import MessageItem from './MessageItem'

interface MessageListProps {
  messages: ChatMessage[]
  currentUserId: string
  nameMap: Record<string, string>
}

export default function MessageList({
  messages,
  currentUserId,
  nameMap,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isOwn={message.senderId === currentUserId}
          senderName={nameMap[message.senderId] ?? '알 수 없음'}
        />
      ))}
      <div ref={bottomRef} />
    </main>
  )
}
