import { apiClient } from 'shared/api'

type RequestVerificationRequest = {
  email: string
}

export const requestVerification = async (data: RequestVerificationRequest) => {
  const response = await apiClient.post<null, RequestVerificationRequest>({
    endpoint: '/auth/request-verification',
    body: data,
    option: {
      proxy: true,
    },
  })

  return response
}
