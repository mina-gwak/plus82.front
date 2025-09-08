'use server'

import { getTeacherSession, getBusinessSession } from 'entities/auth'
import { apiClient } from 'shared/api'

import { NotificationUnreadCount } from '../model/setting'

type GetNotificationUnreadCountResponse = NotificationUnreadCount

export const getTeacherNotificationUnreadCount = async () => {
  const { accessToken } = await getTeacherSession()

  const response = await apiClient.get<GetNotificationUnreadCountResponse>({
    endpoint: `/notifications/unread-count`,
    option: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export const getBusinessNotificationUnreadCount = async () => {
  const { accessToken } = await getBusinessSession()

  const response = await apiClient.get<GetNotificationUnreadCountResponse>({
    endpoint: `/notifications/unread-count`,
    option: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
