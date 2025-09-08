import { format, differenceInMinutes, differenceInHours } from 'date-fns'
import { enUS, ko } from 'date-fns/locale'

export const formatNotificationDate = (
  createdAt: string | Date,
  locale: 'ko' | 'en' = 'ko',
): string => {
  const now = new Date()
  const created =
    typeof createdAt === 'string' ? new Date(createdAt) : createdAt

  const diffMinutes = differenceInMinutes(now, created)
  const diffHours = differenceInHours(now, created)

  if (diffMinutes < 1) {
    return locale === 'ko' ? '1분 전' : '1minute ago'
  }
  if (diffMinutes < 60) {
    return locale === 'ko' ? `${diffMinutes}분 전` : `${diffMinutes}minutes ago`
  }
  if (diffHours < 24) {
    return locale === 'ko' ? `${diffHours}시간 전` : `${diffHours}hours ago`
  }

  return format(created, 'yyyy.MM.dd(eee)', {
    locale: locale === 'ko' ? ko : enUS,
  })
}
