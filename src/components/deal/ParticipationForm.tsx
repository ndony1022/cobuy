'use client'

import { useState } from 'react'
import type { Deal } from '@/types'
import { Button } from '@/components/common/Button'
import { formatPrice } from '@/lib/utils/price'

interface ParticipationFormProps {
  deal: Deal
  onParticipate: (quantity: number) => Promise<void>
  onCancel: () => void
}

export function ParticipationForm({
  deal,
  onParticipate,
  onCancel,
}: ParticipationFormProps) {
  const [quantity, setQuantity] = useState(deal.minQuantityToConfirm || 1)
  const [loading, setLoading] = useState(false)

  const maxQuantity = deal.totalQuantity
  const expectedPrice = quantity * deal.unitPrice

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (quantity < 1 || quantity > maxQuantity) return

    setLoading(true)
    try {
      await onParticipate(quantity)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          수량 선택
        </label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={e => setQuantity(Math.max(1, Math.min(maxQuantity, parseInt(e.target.value) || 1)))}
            className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2"
          />
          <button
            type="button"
            onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
            disabled={quantity >= maxQuantity}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            +
          </button>
          <span className="text-gray-600">{deal.unitLabel}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">예상 결제 금액</span>
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(expectedPrice)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {formatPrice(deal.unitPrice)} × {quantity}{deal.unitLabel}
        </p>
      </div>

      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={loading}
        >
          취소
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? '처리 중...' : '참여하기'}
        </Button>
      </div>
    </form>
  )
}

