import { useQuery } from '@tanstack/react-query'

import { notificationQueries } from 'entities/notification'

export const useTeacherNotificationUnreadCount = () => {
  const { data, refetch } = useQuery(notificationQueries.teacherUnreadCount())

  return {
    hasUnreadNotification: data?.hasUnreadNotification,
    refetch,
  }
}
