/**
 * Deal 관련 Mock API
 */

import type { Deal, DealId, DealFormData, Participation } from '@/types'

// Mock 데이터 저장소
let mockDeals: Deal[] = []
let mockParticipations: Participation[] = []

/**
 * 모든 Deal 목록 조회
 */
export async function getDeals(filters?: {
  category?: string
  radius?: number
  sort?: 'latest' | 'deadline' | 'distance'
}): Promise<Deal[]> {
  // 실제로는 API 호출
  await new Promise(resolve => setTimeout(resolve, 300)) // 로딩 시뮬레이션
  
  let deals = [...mockDeals]
  
  // 필터링
  if (filters?.category) {
    deals = deals.filter(d => d.category === filters.category)
  }
  
  // 정렬
  if (filters?.sort === 'latest') {
    deals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } else if (filters?.sort === 'deadline') {
    // 마감 임박 순 (확정 최소 수량에 가까운 순)
    deals.sort((a, b) => {
      const aProgress = getDealProgress(a)
      const bProgress = getDealProgress(b)
      return aProgress - bProgress
    })
  }
  
  return deals
}

/**
 * Deal 상세 조회
 */
export async function getDeal(id: DealId): Promise<Deal | null> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockDeals.find(d => d.id === id) || null
}

/**
 * Deal 생성
 */
export async function createDeal(formData: DealFormData, hostId: string): Promise<Deal> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const newDeal: Deal = {
    id: `deal-${Date.now()}`,
    hostId,
    title: formData.title,
    productImageUrl: formData.productImageUrl,
    externalProductUrl: formData.externalProductUrl,
    totalQuantity: formData.totalQuantity,
    unitLabel: '개',
    totalPrice: formData.totalPrice,
    minQuantityToConfirm: formData.totalQuantity - formData.myQuantity,
    unitPrice: formData.totalPrice / formData.totalQuantity,
    status: 'OPEN',
    location: formData.pickupLocation,
    pickupDate: formData.pickupDates[0],
    pickupTimeRange: formData.pickupTimeRange,
    category: formData.category,
    radiusMeter: formData.radiusMeter,
    createdAt: new Date().toISOString(),
  }
  
  mockDeals.push(newDeal)
  return newDeal
}

/**
 * Deal에 참여
 */
export async function participateInDeal(
  dealId: DealId,
  userId: string,
  quantity: number
): Promise<Participation> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const deal = mockDeals.find(d => d.id === dealId)
  if (!deal) {
    throw new Error('Deal not found')
  }
  
  const participation: Participation = {
    id: `participation-${Date.now()}`,
    dealId,
    userId,
    quantity,
    expectedPrice: quantity * deal.unitPrice,
    status: 'REQUESTED',
    createdAt: new Date().toISOString(),
  }
  
  mockParticipations.push(participation)
  return participation
}

/**
 * Deal의 참여자 목록 조회
 */
export async function getDealParticipations(dealId: DealId): Promise<Participation[]> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockParticipations.filter(p => p.dealId === dealId)
}

/**
 * Deal의 현재 진행률 계산 (확보된 수량)
 */
function getDealProgress(deal: Deal): number {
  const participations = mockParticipations.filter(
    p => p.dealId === deal.id && p.status !== 'CANCELLED'
  )
  return participations.reduce((sum, p) => sum + p.quantity, 0)
}

/**
 * 초기 Mock 데이터 생성 (개발용)
 */
export function initMockData() {
  if (mockDeals.length === 0) {
    mockDeals = [
      {
        id: 'deal-1',
        hostId: 'user-1',
        title: '쿠팡 라면 24개입',
        productImageUrl: 'https://via.placeholder.com/300',
        externalProductUrl: 'https://www.coupang.com/vp/products/123',
        totalQuantity: 24,
        unitLabel: '개',
        totalPrice: 24000,
        minQuantityToConfirm: 18,
        unitPrice: 1000,
        status: 'OPEN',
        location: {
          lat: 37.5665,
          lng: 126.9780,
          addressText: '서울특별시 중구',
        },
        pickupDate: '2024-01-15',
        pickupTimeRange: '19:00~21:00',
        category: 'FOOD',
        radiusMeter: 1000,
        createdAt: new Date().toISOString(),
      },
    ]
  }
}

