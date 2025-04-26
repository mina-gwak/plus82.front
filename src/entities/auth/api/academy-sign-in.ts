'use server'

import { apiClient } from 'shared/api'

export type AcademySignInRequest = {
  email: string
  password: string
}

type AcademySignInResponse = {
  accessToken: string
  accessTokenExpireTime: number
  refreshToken: string
  refreshTokenExpireTime: number
}

const handleSuccess = (response: AcademySignInResponse) => {
  const currentTime = Date.now()

  return {
    accessToken: response.accessToken,
    accessTokenExpiresAt: currentTime + response.accessTokenExpireTime,
    refreshToken: response.refreshToken,
    refreshTokenExpiresAt: currentTime + response.refreshTokenExpireTime,
  }
}

export const academySignIn = async (data: AcademySignInRequest) => {
  const response = await apiClient.post<
    AcademySignInResponse,
    AcademySignInRequest
  >({
    endpoint: '/auth/academy/sign-in',
    body: data,
  })

  return handleSuccess(response)
}
