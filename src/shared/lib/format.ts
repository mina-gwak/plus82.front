import { isNilOrEmptyString } from './helper'

export const toDisplayValue = <T>(value?: T | null) => {
  if (isNilOrEmptyString(value)) return '-'

  return value
}

export const formatDate = (dateString?: string | null) => {
  if (!dateString) return '-'

  const date = new Date(dateString)

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\s/g, '')
    .replace(/\.$/g, '')
}

export const formatNumber = (number?: number | null) => {
  if (!number) return null

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatCurrency = ({
  number,
  code,
}: {
  number?: number | null
  code: string
}) => {
  if (!number) return null

  const formattedNumber = formatNumber(number)

  return `${formattedNumber} ${code}`
}

export const formatCurrencyWithRule = ({
  number,
  locale = 'ko',
}: {
  number?: number | null
  locale?: string
}) => {
  if (!number) return null

  // 입력값을 100으로 나누고 소수점 2자리까지 표시
  const dividedValue = number / 100
  const formattedValue = dividedValue.toFixed(2)

  if (locale === 'ko') {
    // 한국어: "300만 원" 형식
    return `${formatNumber(number)} 만원`
  } else {
    // 영어: "3.00M KRW" 형식
    return `${formattedValue}M KRW`
  }
}
