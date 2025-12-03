'use client'

import { useState } from 'react'
import type { DealFormData } from '@/types'
import { StepIndicator } from '@/components/common/StepIndicator'
import { Step1ProductInfo } from './Step1ProductInfo'
import { Step2PriceQuantity } from './Step2PriceQuantity'
import { Step3PickupInfo } from './Step3PickupInfo'
import { Step4Confirm } from './Step4Confirm'
import { Button } from '@/components/common/Button'

interface DealFormProps {
  onSubmit: (formData: DealFormData) => Promise<void>
  loading?: boolean
}

export function DealForm({ onSubmit, loading = false }: DealFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<DealFormData>>({
    dealType: 'PRE_ORDER',
    category: 'FOOD',
    radiusMeter: 1000,
    pickupDates: [],
  })

  const totalSteps = 4

  const updateFormData = (data: Partial<DealFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    // 최종 검증
    if (!formData.title || !formData.totalPrice || !formData.totalQuantity) {
      alert('필수 정보를 모두 입력해주세요.')
      return
    }

    await onSubmit(formData as DealFormData)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <Step1ProductInfo
            formData={formData}
            onUpdate={updateFormData}
          />
        )}
        {currentStep === 2 && (
          <Step2PriceQuantity
            formData={formData}
            onUpdate={updateFormData}
          />
        )}
        {currentStep === 3 && (
          <Step3PickupInfo
            formData={formData}
            onUpdate={updateFormData}
          />
        )}
        {currentStep === 4 && (
          <Step4Confirm formData={formData as DealFormData} />
        )}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          이전
        </Button>
        {currentStep < totalSteps ? (
          <Button onClick={handleNext}>다음</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? '등록 중...' : '등록하기'}
          </Button>
        )}
      </div>
    </div>
  )
}

