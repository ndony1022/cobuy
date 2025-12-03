'use client'

import type { DealFormData } from '@/types'

interface Step3PickupInfoProps {
  formData: Partial<DealFormData>
  onUpdate: (data: Partial<DealFormData>) => void
}

export function Step3PickupInfo({ formData, onUpdate }: Step3PickupInfoProps) {
  const handlePickupDateChange = (value: string) => {
    const dates = value
      .split(',')
      .map(v => v.trim())
      .filter(Boolean)
    onUpdate({ pickupDates: dates })
  }

  const handleRadiusChange = (value: string) => {
    const num = Number(value.replace(/[^0-9]/g, ''))
    if (Number.isNaN(num)) return
    onUpdate({ radiusMeter: num })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">픽업 정보</h2>

      {/* 픽업 장소 (텍스트) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          픽업 장소 *
        </label>
        <input
          type="text"
          value={formData.pickupLocation?.addressText || ''}
          onChange={e =>
            onUpdate({
              pickupLocation: {
                // 위도/경도는 별도의 지도 선택 단계에서 설정되도록 두고,
                // 여기서는 기존 값이 있으면 유지, 없으면 중립값(0,0)을 사용합니다.
                lat: formData.pickupLocation?.lat ?? 0,
                lng: formData.pickupLocation?.lng ?? 0,
                addressText: e.target.value,
              },
            })
          }
          placeholder="예: ○○동 주민센터 앞, ○○아파트 정문"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          실제 구현 시에는 지도에서 위치를 선택하도록 확장할 수 있습니다.
        </p>
      </div>

      {/* 픽업 가능 날짜(간단: 쉼표 구분 문자열) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          픽업 가능 날짜 (쉼표로 여러 개 입력 가능) *
        </label>
        <input
          type="text"
          value={formData.pickupDates?.join(', ') || ''}
          onChange={e => handlePickupDateChange(e.target.value)}
          placeholder="예: 2025-01-10, 2025-01-11"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* 픽업 시간대 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          픽업 가능 시간대 *
        </label>
        <input
          type="text"
          value={formData.pickupTimeRange || ''}
          onChange={e => onUpdate({ pickupTimeRange: e.target.value })}
          placeholder="예: 19:00~21:00"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* 노출 반경 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          노출 반경 (m)
        </label>
        <input
          type="number"
          min={100}
          step={100}
          value={formData.radiusMeter ?? 1000}
          onChange={e => handleRadiusChange(e.target.value)}
          placeholder="예: 1000"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          이 반경 안에 있는 사용자에게만 공동구매 카드가 노출됩니다.
        </p>
      </div>
    </div>
  )
}


