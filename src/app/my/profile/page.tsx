'use client'

export default function MyProfilePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">마이페이지</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-[2fr,3fr]">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
          <h2 className="text-lg font-semibold">프로필</h2>
          <p className="text-sm text-gray-500">
            닉네임, 동네, 거래 요약 정보(총 거래 수, 노쇼 횟수 등)가 표시될 영역입니다.
          </p>
        </div>

        {/* 후기 카드 */}
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
          <h2 className="text-lg font-semibold">받은 후기</h2>
          <p className="text-sm text-gray-500">
            아직 구현되지 않은 화면입니다. 이후 거래 완료 시 남겨진 후기가 리스트로 표시될 예정입니다.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm p-4 space-y-2">
        <h2 className="text-lg font-semibold">설정</h2>
        <p className="text-sm text-gray-500">
          알림 설정, 위치/동네 변경, 로그아웃/탈퇴 등의 액션 버튼이 들어갈 자리입니다.
        </p>
      </section>
    </div>
  )
}


