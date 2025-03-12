'use server'

import { apiClient, errorHandler, HttpError } from 'shared/api'

type ResetPasswordRequest = {
  code: string
  password: string
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast(
    'An error occurred while resetting the password',
    error,
  )
}

export const resetPassword = async (data: ResetPasswordRequest) => {
  try {
    await apiClient.post<null, ResetPasswordRequest>({
      endpoint: '/auth/reset-password',
      body: data,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
