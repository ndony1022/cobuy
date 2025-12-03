'use client'

import { useParams } from 'next/navigation'

export default function ChatRoomPage() {
  const params = useParams()
  const roomId = params?.roomId as string | undefined

  return (
    <div className="flex flex-col h-[70vh] max-h-[700px] bg-white rounded-lg shadow-sm">
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">공동구매 채팅방</h1>
          {roomId && (
            <p className="text-xs text-gray-500">
              Room ID: {roomId}
            </p>
          )}
        </div>
        <div className="text-xs text-gray-500">
          픽업 정보 요약 영역 (날짜, 시간, 장소)
        </div>
      </header>

      {/* 메시지 리스트 (향후 컴포넌트 교체 예정) */}
      <main className="flex-1 overflow-y-auto px-4 py-3 text-sm text-gray-500">
        아직 실시간 채팅 기능이 구현되지 않았습니다.
        <br />
        이후 메시지 리스트, 시스템 메시지, 입력창 등이 이 영역에 들어갈 예정입니다.
      </main>

      {/* 입력 영역 */}
      <footer className="border-t px-4 py-3">
        <div className="flex gap-2">
          <input
            type="text"
            disabled
            className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm bg-gray-50 text-gray-400"
            placeholder="채팅 기능은 추후 구현 예정입니다."
          />
          <button
            disabled
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed"
          >
            전송
          </button>
        </div>
      </footer>
    </div>
  )
}


