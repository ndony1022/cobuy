'use client'

import { useState } from 'react'

interface MessageInputProps {
  onSend: (message: string) => void
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }
    onSend(trimmed)
    setValue('')
  }

  return (
    <footer className="border-t bg-white px-4 py-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSend()
            }
          }}
          className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          placeholder="메시지를 입력하세요"
        />
        <button
          type="button"
          onClick={handleSend}
          className="px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition"
        >
          전송
        </button>
      </div>
    </footer>
  )
}
