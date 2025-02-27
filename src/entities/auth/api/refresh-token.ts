'use server'

import { apiClient, HttpError, ServerError } from 'shared/api'

type RefreshTokenRequest = {
  refreshToken: string
}

type RefreshTokenResponse = {
  accessToken: string
  accessTokenExpireTime: number
  refreshToken: string
  refreshTokenExpireTime: number
}

const handleSuccess = (response: RefreshTokenResponse) => {
  const currentTime = Date.now()

  return {
    accessToken: response.accessToken,
    accessTokenExpiresAt: currentTime + response.accessTokenExpireTime,
    refreshToken: response.refreshToken,
    refreshTokenExpiresAt: currentTime + response.refreshTokenExpireTime,
  }
}

const handleError = (error: Error): ServerError => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return {
    type: 'toast',
    message: error.message || 'An error occurred while refreshing the token',
  }
}

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await apiClient.post<
      RefreshTokenResponse,
      RefreshTokenRequest
    >({
      endpoint: '/auth/reissue',
      body: { refreshToken },
    })

    return handleSuccess(response)
  } catch (error) {
    return handleError(error as Error)
  }
}
