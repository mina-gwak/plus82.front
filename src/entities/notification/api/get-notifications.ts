'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
import { apiClient, Pagination, PaginationParams } from 'shared/api'

import { Notification } from '../model/notification'

export type GetNotificationsRequest = PaginationParams<object>

type GetNotificationsResponse = Pagination<Notification>

export const getTeacherNotifications = async (
  queryParams: GetNotificationsRequest,
) => {
  const { accessToken } = await getTeacherSession()

  const response = await apiClient.get<GetNotificationsResponse>({
    endpoint: '/notifications',
    queryParams,
    option: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export const getBusinessNotifications = async (
  queryParams: GetNotificationsRequest,
) => {
  const { accessToken } = await getBusinessSession()

  const response = await apiClient.get<GetNotificationsResponse>({
    endpoint: '/notifications',
    queryParams,
    option: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
