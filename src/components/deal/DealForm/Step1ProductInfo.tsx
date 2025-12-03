'use client'

import { useState } from 'react'
import type { DealFormData, DealCategory } from '@/types'

interface Step1ProductInfoProps {
  formData: Partial<DealFormData>
  onUpdate: (data: Partial<DealFormData>) => void
}

export function Step1ProductInfo({ formData, onUpdate }: Step1ProductInfoProps) {
  const [productUrl, setProductUrl] = useState(formData.productUrl || '')

  const categories: { value: DealCategory; label: string }[] = [
    { value: 'FOOD', label: '식품' },
    { value: 'LIVING', label: '생활' },
    { value: 'PET', label: '반려동물' },
    { value: 'OTHER', label: '기타' },
  ]

  const handleProductUrlChange = (url: string) => {
    setProductUrl(url)
    onUpdate({ productUrl: url, externalProductUrl: url })
    // 실제로는 URL에서 상품 정보를 추출하는 로직이 필요
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">상품 정보</h2>

      {/* 거래 유형 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          거래 유형
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="dealType"
              value="PRE_ORDER"
              checked={formData.dealType === 'PRE_ORDER'}
              onChange={e => onUpdate({ dealType: e.target.value as 'PRE_ORDER' | 'EXISTING' })}
              className="w-4 h-4 text-primary-600"
            />
            <span>주문하면서 나눌래</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="dealType"
              value="EXISTING"
              checked={formData.dealType === 'EXISTING'}
              onChange={e => onUpdate({ dealType: e.target.value as 'PRE_ORDER' | 'EXISTING' })}
              className="w-4 h-4 text-primary-600"
            />
            <span>이미 가지고 있는 걸 나눌래</span>
          </label>
        </div>
      </div>

      {/* 상품 링크 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          상품 링크 (쿠팡 등)
        </label>
        <input
          type="url"
          value={productUrl}
          onChange={e => handleProductUrlChange(e.target.value)}
          placeholder="https://www.coupang.com/..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          링크를 입력하면 상품 정보를 자동으로 가져옵니다.
        </p>
      </div>

      {/* 상품명 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          상품명 *
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={e => onUpdate({ title: e.target.value })}
          placeholder="예: 쿠팡 라면 24개입"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* 옵션 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          옵션 (맛/사이즈 등)
        </label>
        <input
          type="text"
          value={formData.option || ''}
          onChange={e => onUpdate({ option: e.target.value })}
          placeholder="예: 매운맛, 500ml"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* 카테고리 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          카테고리
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              type="button"
              onClick={() => onUpdate({ category: cat.value })}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                formData.category === cat.value
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

