export const formatDateFromNow = (
  date: Date | string,
  locale: string,
): string => {
  const now = new Date()
  const target = typeof date === 'string' ? new Date(date) : date
  const diffMs = now.getTime() - target.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  // 24시간 이내
  if (diffMinutes < 1) return locale === 'ko' ? '1분 전' : '1 minute ago'
  if (diffMinutes < 60)
    return locale === 'ko'
      ? `${diffMinutes}분 전`
      : `${diffMinutes} minutes ago`
  if (diffHours < 24)
    return locale === 'ko' ? `${diffHours}시간 전` : `${diffHours} hours ago`

  // 24시간 이후
  if (diffDays <= 6)
    return locale === 'ko' ? `${diffDays}일 전` : `${diffDays} days ago`
  if (diffDays <= 13) return locale === 'ko' ? '1주 전' : '1 weeks ago'
  if (diffDays <= 20) return locale === 'ko' ? '2주 전' : '2 weeks ago'

  // 21일 이후
  const nowYear = now.getFullYear()
  const targetYear = target.getFullYear()
  const month = String(target.getMonth() + 1).padStart(2, '0')
  const day = String(target.getDate()).padStart(2, '0')

  if (nowYear === targetYear) {
    return `${month}.${day}`
  }

  return `${targetYear}.${month}.${day}`
}
