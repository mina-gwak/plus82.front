import { apiClient } from 'shared/api'

type RequestVerificationRequest = {
  email: string
}

export const requestVerification = async (data: RequestVerificationRequest) => {
  const response = await apiClient.post<null, RequestVerificationRequest>(
    '/auth/request-verification',
    data,
  )

  return response
}
