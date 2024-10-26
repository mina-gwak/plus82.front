import { apiClient } from 'shared/api'

type VerifyCodeRequest = {
  email: string
  code: string
}

export const verifyCode = async (data: VerifyCodeRequest) => {
  const response = await apiClient.post<null, VerifyCodeRequest>(
    '/auth/verify-code',
    data,
  )

  return response
}
