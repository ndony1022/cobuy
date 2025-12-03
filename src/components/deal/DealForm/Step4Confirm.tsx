'use client'

import type { DealFormData } from '@/types'
import { formatPrice } from '@/lib/utils/price'

interface Step4ConfirmProps {
  formData: DealFormData
}

export function Step4Confirm({ formData }: Step4ConfirmProps) {
  const hasTotalPrice =
    typeof formData.totalPrice === 'number' && !Number.isNaN(formData.totalPrice)
  const hasTotalQuantity =
    typeof formData.totalQuantity === 'number' &&
    !Number.isNaN(formData.totalQuantity) &&
    formData.totalQuantity > 0
  const hasMyQuantity =
    typeof formData.myQuantity === 'number' && !Number.isNaN(formData.myQuantity)

  const canCalculateUnitPrice = hasTotalPrice && hasTotalQuantity
  const unitPrice = canCalculateUnitPrice
    ? formData.totalPrice / formData.totalQuantity
    : undefined

  const canCalculateHostTakePrice = canCalculateUnitPrice && hasMyQuantity
  const hostTakePrice =
    canCalculateHostTakePrice && unitPrice !== undefined
      ? unitPrice * formData.myQuantity
      : undefined

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">요약 확인</h2>

      {/* 상품 정보 */}
      <section className="rounded-lg border border-gray-200 p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">상품 정보</h3>
        <p className="font-medium">{formData.title || '상품명 미입력'}</p>
        {formData.option && (
          <p className="text-sm text-gray-500">옵션: {formData.option}</p>
        )}
        {formData.productUrl && (
          <a
            href={formData.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 underline"
          >
            상품 링크 열기
          </a>
        )}
      </section>

      {/* 가격/수량 */}
      <section className="rounded-lg border border-gray-200 p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">가격 및 수량</h3>
        <p className="text-sm text-gray-700">
          총{' '}
          {hasTotalQuantity ? `${formData.totalQuantity}개` : '수량 미입력'} / 총{' '}
          {hasTotalPrice ? formatPrice(formData.totalPrice) : '가격 미입력'}
        </p>
        {canCalculateUnitPrice && unitPrice !== undefined ? (
          <p className="text-sm text-gray-700">
            1개당 {formatPrice(unitPrice)} · 내가 가져갈 수량{' '}
            {hasMyQuantity ? `${formData.myQuantity}개` : '미입력'} (
            {canCalculateHostTakePrice && hostTakePrice !== undefined
              ? formatPrice(hostTakePrice)
              : '계산 불가'}
            )
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            총 가격과 총 수량이 모두 입력되면 1단위 가격과 예상 금액이 계산됩니다.
          </p>
        )}
        {hasTotalQuantity && hasMyQuantity ? (
          <p className="text-xs text-gray-500">
            나머지 수량({formData.totalQuantity - formData.myQuantity}개)을 다른 참여자 모집으로
            채웁니다.
          </p>
        ) : (
          <p className="text-xs text-gray-400">
            총 수량과 내가 가져갈 수량이 모두 입력되면 모집 목표 수량이 계산됩니다.
          </p>
        )}
      </section>

      {/* 픽업 정보 */}
      <section className="rounded-lg border border-gray-200 p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">픽업 정보</h3>
        <p className="text-sm text-gray-700">
          장소: {formData.pickupLocation?.addressText || '미입력'}
        </p>
        <p className="text-sm text-gray-700">
          날짜:{' '}
          {formData.pickupDates && formData.pickupDates.length > 0
            ? formData.pickupDates.join(', ')
            : '미입력'}
        </p>
        <p className="text-sm text-gray-700">
          시간대: {formData.pickupTimeRange || '미입력'}
        </p>
      </section>

      <p className="text-sm text-gray-500">
        위 내용으로 공동구매를 등록합니다. 잘못된 내용이 없는지 한 번 더 확인해주세요.
      </p>
    </div>
  )
}


