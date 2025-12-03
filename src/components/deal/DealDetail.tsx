'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Deal } from '@/types'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { ProgressBar } from '@/components/common/ProgressBar'
import { ParticipationForm } from '@/components/deal/ParticipationForm'
import { ParticipationList } from '@/components/deal/ParticipationList'
import { formatPrice } from '@/lib/utils/price'
import { formatDate } from '@/lib/utils/date'
import { getDealParticipations, participateInDeal } from '@/lib/api/deals'

interface DealDetailProps {
  deal: Deal
}

export function DealDetail({ deal }: DealDetailProps) {
  const router = useRouter()
  const [showParticipationForm, setShowParticipationForm] = useState(false)

  // 상태에 따른 뱃지
  const statusBadge = {
    OPEN: { label: '모집중', variant: 'info' as const },
    CONFIRMED: { label: '확정', variant: 'success' as const },
    ORDERED: { label: '주문완료', variant: 'info' as const },
    PICKUP: { label: '픽업진행', variant: 'warning' as const },
    COMPLETED: { label: '완료', variant: 'default' as const },
    CANCELLED: { label: '취소', variant: 'error' as const },
  }[deal.status]

  // 현재 확보된 수량 (실제로는 API에서 가져와야 함)
  const currentQuantity = Math.floor(deal.totalQuantity * 0.3) // 임시
  const remainingQuantity = deal.totalQuantity - currentQuantity

  const handleParticipate = async (quantity: number) => {
    try {
      // 실제로는 현재 사용자 ID를 사용해야 함
      await participateInDeal(deal.id, 'current-user-id', quantity)
      setShowParticipationForm(false)
      // 페이지 새로고침 또는 상태 업데이트
      router.refresh()
    } catch (error) {
      console.error('Failed to participate:', error)
      alert('참여에 실패했습니다.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900"
      >
        ← 뒤로가기
      </button>

      {/* 상품 이미지 및 기본 정보 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 상품 이미지 */}
          <div className="relative w-full md:w-96 h-64 md:h-96 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
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
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold">{deal.title}</h1>
              <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            </div>

            {deal.externalProductUrl && (
              <Link
                href={deal.externalProductUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="sm">
                  쿠팡에서 보기 →
                </Button>
              </Link>
            )}

            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary-600">
                {formatPrice(deal.unitPrice)} / {deal.unitLabel}
              </p>
              <p className="text-gray-600">
                총 {formatPrice(deal.totalPrice)} ({deal.totalQuantity}
                {deal.unitLabel})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 수량 정보 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">모집 현황</h2>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>총 수량: {deal.totalQuantity}{deal.unitLabel}</span>
            <span>현재 확보: {currentQuantity}{deal.unitLabel}</span>
            <span>잔여: {remainingQuantity}{deal.unitLabel}</span>
          </div>
          <ProgressBar current={currentQuantity} total={deal.totalQuantity} />
          <p className="text-sm text-gray-600">
            최소 모집 수량: {deal.minQuantityToConfirm}{deal.unitLabel}
          </p>
        </div>
      </div>

      {/* 픽업 정보 */}
      {deal.pickupDate && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">픽업 정보</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">날짜:</span>{' '}
              {formatDate(deal.pickupDate)}
            </p>
            {deal.pickupTimeRange && (
              <p>
                <span className="font-medium">시간:</span>{' '}
                {deal.pickupTimeRange}
              </p>
            )}
            <p>
              <span className="font-medium">장소:</span> {deal.location.addressText}
            </p>
          </div>
        </div>
      )}

      {/* 참여 영역 */}
      {deal.status === 'OPEN' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">참여하기</h2>
          {showParticipationForm ? (
            <ParticipationForm
              deal={deal}
              onParticipate={handleParticipate}
              onCancel={() => setShowParticipationForm(false)}
            />
          ) : (
            <Button
              onClick={() => setShowParticipationForm(true)}
              className="w-full"
            >
              참여하기
            </Button>
          )}
        </div>
      )}

      {/* 참여자 리스트 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">참여자</h2>
        <ParticipationList dealId={deal.id} />
      </div>

      {/* 채팅방 버튼 */}
      <div className="flex justify-center">
        <Button
          onClick={() => router.push(`/chat/${deal.id}`)}
          size="lg"
          className="w-full md:w-auto"
        >
          채팅방 열기
        </Button>
      </div>
    </div>
  )
}

