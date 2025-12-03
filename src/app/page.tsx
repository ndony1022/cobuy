'use client'

import { useEffect, useState } from 'react'
import { DealCard } from '@/components/deal/DealCard'
import { FilterBar } from '@/components/common/FilterBar'
import type { Deal, DealCategory } from '@/types'
import { getDeals, initMockData } from '@/lib/api/deals'

export default function HomePage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<{
    category?: DealCategory
    radius?: number
    sort?: 'latest' | 'deadline' | 'distance'
  }>({
    sort: 'latest',
  })

  useEffect(() => {
    // Mock 데이터 초기화
    initMockData()
    
    // Deal 목록 로드
    loadDeals()
  }, [filters])

  const loadDeals = async () => {
    setLoading(true)
    try {
      const data = await getDeals(filters)
      setDeals(data)
    } catch (error) {
      console.error('Failed to load deals:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* 필터 바 */}
      <FilterBar filters={filters} onFiltersChange={setFilters} />

      {/* Deal 목록 */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      ) : deals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">등록된 공동구매가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  )
}

