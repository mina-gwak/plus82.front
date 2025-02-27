'use server'

import { apiClient } from 'shared/api'

export type SignInRequest = {
  email: string
  password: string
}

type SignInResponse = {
  accessToken: string
  accessTokenExpireTime: number
  refreshToken: string
  refreshTokenExpireTime: number
}

const handleSuccess = (response: SignInResponse) => {
  const currentTime = Date.now()

  return {
    accessToken: response.accessToken,
    accessTokenExpiresAt: currentTime + response.accessTokenExpireTime,
    refreshToken: response.refreshToken,
    refreshTokenExpiresAt: currentTime + response.refreshTokenExpireTime,
  }
}

export const signIn = async (data: SignInRequest) => {
  const response = await apiClient.post<SignInResponse, SignInRequest>({
    endpoint: '/auth/sign-in',
    body: data,
  })

  return handleSuccess(response)
}
