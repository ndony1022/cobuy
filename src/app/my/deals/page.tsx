'use client'

export default function MyDealsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">내 거래</h1>
      </header>

      <section className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-2 mb-4">
          <button className="px-3 py-1 text-sm rounded-full bg-primary-50 text-primary-700 font-medium">
            호스트로 연 거래
          </button>
          <button className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
            참여한 거래
          </button>
        </div>

        <div className="py-10 text-center text-gray-500">
          아직 구현되지 않은 화면입니다.
          <br />
          이후 실제 거래 데이터(호스트/조인러 기준)를 불러와 카드 리스트를 보여줄 예정입니다.
        </div>
      </section>
    </div>
  )
}


