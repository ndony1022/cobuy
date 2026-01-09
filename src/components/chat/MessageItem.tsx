import type { ChatMessage } from '@/types'

interface MessageItemProps {
  message: ChatMessage
  isOwn: boolean
  senderName: string
}

function formatTime(isoString: string) {
  const date = new Date(isoString)
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function MessageItem({
  message,
  isOwn,
  senderName,
}: MessageItemProps) {
  if (message.type === 'SYSTEM') {
    return (
      <div className="flex justify-center">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
          {message.content}
        </span>
      </div>
    )
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${
          isOwn
            ? 'bg-emerald-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {!isOwn && (
          <p className="text-xs font-semibold text-gray-600">{senderName}</p>
        )}
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p
          className={`mt-1 text-[10px] ${
            isOwn ? 'text-emerald-50' : 'text-gray-400'
          }`}
        >
          {formatTime(message.createdAt)}
        </p>
      </div>
    </div>
  )
}
