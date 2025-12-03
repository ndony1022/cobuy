'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">동네 Co-Buy</span>
          </Link>

          {/* 검색창 */}
          <div className="flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="상품명, 카테고리 검색..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* 네비게이션 버튼 */}
          <nav className="flex items-center space-x-4">
            <Link
              href="/my/deals"
              className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              내 거래
            </Link>
            <Link
              href="/my/profile"
              className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              마이페이지
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

