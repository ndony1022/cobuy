'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DealForm } from '@/components/deal/DealForm/DealForm'
import type { DealFormData } from '@/types'
import { createDeal } from '@/lib/api/deals'

export default function NewDealPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: DealFormData) => {
    setLoading(true)
    try {
      // 실제로는 현재 사용자 ID를 사용해야 함
      const newDeal = await createDeal(formData, 'current-user-id')
      router.push(`/deals/${newDeal.id}`)
    } catch (error) {
      console.error('Failed to create deal:', error)
      alert('공동구매 등록에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">공동구매 등록</h1>
      <DealForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}

