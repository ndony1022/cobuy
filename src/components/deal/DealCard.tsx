'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Deal } from '@/types'
import { Badge } from '@/components/common/Badge'
import { ProgressBar } from '@/components/common/ProgressBar'
import { formatPrice } from '@/lib/utils/price'
import { formatDistance, calculateDistance } from '@/lib/utils/distance'
import { formatRelativeTime } from '@/lib/utils/date'

interface DealCardProps {
  deal: Deal
  userLocation?: { lat: number; lng: number }
}

export function DealCard({ deal, userLocation }: DealCardProps) {
  // 거리 계산
  const distance = userLocation
    ? formatDistance(calculateDistance(userLocation, deal.location))
    : null

  // 현재 확보된 수량 계산 (실제로는 API에서 가져와야 함)
  const currentQuantity = Math.floor(deal.totalQuantity * 0.3) // 임시

  // 상태에 따른 뱃지
  const statusBadge = {
    OPEN: { label: '모집중', variant: 'info' as const },
    CONFIRMED: { label: '확정', variant: 'success' as const },
    ORDERED: { label: '주문완료', variant: 'info' as const },
    PICKUP: { label: '픽업진행', variant: 'warning' as const },
    COMPLETED: { label: '완료', variant: 'default' as const },
    CANCELLED: { label: '취소', variant: 'error' as const },
  }[deal.status]

  return (
    <Link href={`/deals/${deal.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer">
        {/* 상품 이미지 */}
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
          {deal.productImageUrl ? (
            <Image
              src={deal.productImageUrl}
              alt={deal.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              이미지 없음
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-2 flex-1">
              {deal.title}
            </h3>
            <Badge variant={statusBadge.variant} className="ml-2 flex-shrink-0">
              {statusBadge.label}
            </Badge>
          </div>

          {/* 가격 정보 */}
          <p className="text-primary-600 font-bold">
            {formatPrice(deal.unitPrice)} / {deal.unitLabel}
          </p>

          {/* 진행률 */}
          <ProgressBar current={currentQuantity} total={deal.totalQuantity} />

          {/* 거리 및 마감 정보 */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            {distance && (
              <span className="flex items-center">
                📍 {distance}
              </span>
            )}
            <span>{formatRelativeTime(deal.createdAt)}</span>
          </div>

          {/* 픽업 예정일 */}
          {deal.pickupDate && (
            <p className="text-sm text-gray-500">
              픽업: {new Date(deal.pickupDate).toLocaleDateString('ko-KR')} {deal.pickupTimeRange}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

