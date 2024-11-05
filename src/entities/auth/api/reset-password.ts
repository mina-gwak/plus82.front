import { apiClient } from 'shared/api'

type ResetPasswordRequest = {
  code: string
  password: string
}

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await apiClient.post<null, ResetPasswordRequest>(
    '/auth/reset-password',
    data,
  )

  return response
}
