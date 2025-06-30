import { useQuery } from '@tanstack/react-query'

import { notificationQueries } from 'entities/notification'

export const useBusinessNotificationUnreadCount = () => {
  const { data, refetch } = useQuery(notificationQueries.businessUnreadCount())

  return {
    hasUnreadNotification: data?.hasUnreadNotification,
    refetch,
  }
}
