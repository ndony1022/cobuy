'use client'

import { useEffect, useState } from 'react'
import type { Participation } from '@/types'
import { Badge } from '@/components/common/Badge'
import { getDealParticipations } from '@/lib/api/deals'
import { formatPrice } from '@/lib/utils/price'

interface ParticipationListProps {
  dealId: string
}

export function ParticipationList({ dealId }: ParticipationListProps) {
  const [participations, setParticipations] = useState<Participation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadParticipations()
  }, [dealId])

  const loadParticipations = async () => {
    setLoading(true)
    try {
      const data = await getDealParticipations(dealId)
      setParticipations(data)
    } catch (error) {
      console.error('Failed to load participations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p className="text-gray-500">로딩 중...</p>
  }

  if (participations.length === 0) {
    return <p className="text-gray-500">아직 참여자가 없습니다.</p>
  }

  const statusBadge = {
    REQUESTED: { label: '요청', variant: 'info' as const },
    CONFIRMED: { label: '확정', variant: 'success' as const },
    PICKUP_DONE: { label: '픽업완료', variant: 'success' as const },
    CANCELLED: { label: '취소', variant: 'error' as const },
  }

  return (
    <div className="space-y-3">
      {participations.map(participation => (
        <div
          key={participation.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div>
              <p className="font-medium">사용자 {participation.userId.slice(-4)}</p>
              <p className="text-sm text-gray-600">
                {participation.quantity}개 · {formatPrice(participation.expectedPrice)}
              </p>
            </div>
          </div>
          <Badge variant={statusBadge[participation.status].variant}>
            {statusBadge[participation.status].label}
          </Badge>
        </div>
      ))}
    </div>
  )
}

