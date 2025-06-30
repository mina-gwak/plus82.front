import { useInfiniteQuery } from '@tanstack/react-query'

import { notificationQueries } from 'entities/notification'
import { useEmptyBoundary } from 'shared/api'

export const useBusinessNotifications = () => {
  const result = useInfiniteQuery({
    ...notificationQueries.businessList(),
    select: data => data?.pages.flatMap(page => page.content),
  })

  useEmptyBoundary(result.data)

  return result
}
