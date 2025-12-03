'use client'

import type { DealFormData } from '@/types'

interface Step2PriceQuantityProps {
  formData: Partial<DealFormData>
  onUpdate: (data: Partial<DealFormData>) => void
}

export function Step2PriceQuantity({ formData, onUpdate }: Step2PriceQuantityProps) {
  const handleNumberChange = (field: keyof DealFormData, value: string) => {
    const num = Number(value.replace(/[^0-9.]/g, ''))
    if (Number.isNaN(num)) return
    onUpdate({ [field]: num } as Partial<DealFormData>)
  }

  const unitPrice =
    formData.totalPrice && formData.totalQuantity
      ? Math.round((formData.totalPrice / formData.totalQuantity) * 10) / 10
      : undefined

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">가격 및 수량 설정</h2>

      {/* 총 가격 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          총 가격 (원) *
        </label>
        <input
          type="number"
          min={0}
          value={formData.totalPrice ?? ''}
          onChange={e => handleNumberChange('totalPrice', e.target.value)}
          placeholder="예: 24000"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* 총 수량 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          총 수량 (개/팩 등) *
        </label>
        <input
          type="number"
          min={1}
          value={formData.totalQuantity ?? ''}
          onChange={e => handleNumberChange('totalQuantity', e.target.value)}
          placeholder="예: 24"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* 내가 가져갈 수량 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          내가 가져갈 수량 *
        </label>
        <input
          type="number"
          min={1}
          value={formData.myQuantity ?? ''}
          onChange={e => handleNumberChange('myQuantity', e.target.value)}
          placeholder="예: 6"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          내 수량을 제외한 나머지 수량이 모집 목표 수량으로 계산됩니다.
        </p>
      </div>

      {/* 참여자 최소/최대 수량 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            참여자당 최소 수량 *
          </label>
          <input
            type="number"
            min={1}
            value={formData.minQuantityPerPerson ?? ''}
            onChange={e => handleNumberChange('minQuantityPerPerson', e.target.value)}
            placeholder="예: 1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            참여자당 최대 수량 (선택)
          </label>
          <input
            type="number"
            min={1}
            value={formData.maxQuantityPerPerson ?? ''}
            onChange={e => handleNumberChange('maxQuantityPerPerson', e.target.value)}
            placeholder="예: 4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* 1단위 가격 미리보기 */}
      <div className="rounded-lg bg-primary-50 px-4 py-3 text-sm text-primary-800">
        {unitPrice ? (
          <>
            1단위 예상 가격:{' '}
            <span className="font-semibold">
              {unitPrice.toLocaleString('ko-KR')}원
            </span>
          </>
        ) : (
          '총 가격과 총 수량을 입력하면 1단위 가격이 자동으로 계산됩니다.'
        )}
      </div>
    </div>
  )
}


