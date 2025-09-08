'use server'

import { getTeacherSession, getBusinessSession } from 'entities/auth'
import { apiClient } from 'shared/api'

import { NotificationSetting } from '../model/setting'

type GetNotificationSettingResponse = NotificationSetting

export const getTeacherNotificationSetting = async () => {
  const { accessToken } = await getTeacherSession()

  const response = await apiClient.get<GetNotificationSettingResponse>({
    endpoint: `/notifications/setting/me`,
    option: {
      authorization: `Bearer ${accessToken}`,
      tags: ['notification-setting'],
    },
  })

  return response
}

export const getBusinessNotificationSetting = async () => {
  const { accessToken } = await getBusinessSession()

  const response = await apiClient.get<GetNotificationSettingResponse>({
    endpoint: `/notifications/setting/me`,
    option: {
      authorization: `Bearer ${accessToken}`,
      tags: ['notification-setting'],
    },
  })

  return response
}
