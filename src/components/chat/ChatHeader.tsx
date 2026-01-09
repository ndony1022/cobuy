import type { ReactNode } from 'react'

interface ChatHeaderProps {
  title: string
  subtitle?: string
  meta?: ReactNode
}

export default function ChatHeader({ title, subtitle, meta }: ChatHeaderProps) {
  return (
    <header className="border-b px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      {meta && (
        <div className="text-xs text-gray-500 md:text-right">{meta}</div>
      )}
    </header>
  )
}
