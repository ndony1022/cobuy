/**
 * 가격 포맷팅 유틸리티
 */

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price)
}

export function formatPriceSimple(price: number): string {
  return price.toLocaleString('ko-KR')
}

