'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { DealDetail } from '@/components/deal/DealDetail'
import { getDeal } from '@/lib/api/deals'
import type { Deal } from '@/types'

export default function DealDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadDeal(params.id as string)
    }
  }, [params.id])

  const loadDeal = async (id: string) => {
    setLoading(true)
    try {
      const data = await getDeal(id)
      setDeal(data)
    } catch (error) {
      console.error('Failed to load deal:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    )
  }

  if (!deal) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">공동구매를 찾을 수 없습니다.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg"
        >
          뒤로가기
        </button>
      </div>
    )
  }

  return <DealDetail deal={deal} />
}

