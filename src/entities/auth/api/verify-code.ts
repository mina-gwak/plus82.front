import { apiClient } from 'shared/api'

type VerifyCodeRequest = {
  email: string
  code: string
}

export const verifyCode = async (data: VerifyCodeRequest) => {
  const response = await apiClient.post<null, VerifyCodeRequest>({
    endpoint: '/auth/verify-code',
    body: data,
    option: {
      proxy: true,
    },
  })

  return response
}
