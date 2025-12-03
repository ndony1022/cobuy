'use client'

import type { DealCategory } from '@/types'

interface FilterBarProps {
  filters: {
    category?: DealCategory
    radius?: number
    sort?: 'latest' | 'deadline' | 'distance'
  }
  onFiltersChange: (filters: {
    category?: DealCategory
    radius?: number
    sort?: 'latest' | 'deadline' | 'distance'
  }) => void
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const categories: { value: DealCategory; label: string }[] = [
    { value: 'FOOD', label: '식품' },
    { value: 'LIVING', label: '생활' },
    { value: 'PET', label: '반려' },
    { value: 'OTHER', label: '기타' },
  ]

  const radiusOptions = [
    { value: 500, label: '500m' },
    { value: 1000, label: '1km' },
    { value: 3000, label: '3km' },
    { value: undefined, label: '동 전체' },
  ]

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'deadline', label: '마감 임박' },
    { value: 'distance', label: '거리순' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      {/* 카테고리 필터 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          카테고리
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFiltersChange({ ...filters, category: undefined })}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              !filters.category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => onFiltersChange({ ...filters, category: cat.value })}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filters.category === cat.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 거리 필터 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          거리
        </label>
        <div className="flex flex-wrap gap-2">
          {radiusOptions.map(option => (
            <button
              key={option.value ?? 'all'}
              onClick={() => onFiltersChange({ ...filters, radius: option.value })}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filters.radius === option.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 정렬 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          정렬
        </label>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onFiltersChange({ ...filters, sort: option.value })}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filters.sort === option.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

