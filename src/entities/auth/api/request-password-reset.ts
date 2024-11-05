import { apiClient } from 'shared/api'

type RequestPasswordResetRequest = {
  email: string
}

export const requestPasswordReset = async (
  data: RequestPasswordResetRequest,
) => {
  const response = await apiClient.post<null, RequestPasswordResetRequest>(
    '/auth/reset-password/request',
    data,
  )

  return response
}
