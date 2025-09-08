import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

import {
  getBusinessNotificationUnreadCount,
  getTeacherNotificationUnreadCount,
} from './get-notification-unread-count'
import {
  getBusinessNotifications,
  getTeacherNotifications,
} from './get-notifications'

export const notificationQueries = {
  all: () => ['notification'],
  lists: () => [...notificationQueries.all(), 'list'],
  teacherList: () =>
    infiniteQueryOptions({
      queryKey: [...notificationQueries.lists(), 'teacher'],
      queryFn: ({ pageParam = 0 }) =>
        getTeacherNotifications({ pageNumber: pageParam, rowCount: 10 }),
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        if (lastPage.last) return undefined

        return lastPage.pageable.pageNumber + 1
      },
    }),
  businessList: () =>
    infiniteQueryOptions({
      queryKey: [...notificationQueries.lists(), 'business'],
      queryFn: ({ pageParam = 0 }) =>
        getBusinessNotifications({ pageNumber: pageParam, rowCount: 10 }),
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        if (lastPage.last) return undefined

        return lastPage.pageable.pageNumber + 1
      },
    }),
  teacherUnreadCount: () =>
    queryOptions({
      queryKey: [...notificationQueries.lists(), 'teacher', 'unread-count'],
      queryFn: getTeacherNotificationUnreadCount,
    }),
  businessUnreadCount: () =>
    queryOptions({
      queryKey: [...notificationQueries.lists(), 'business', 'unread-count'],
      queryFn: getBusinessNotificationUnreadCount,
    }),
}
