import { apiClient } from 'shared/api'

type AcademyRequestVerificationRequest = {
  email: string
}

export const academyRequestVerification = async (
  data: AcademyRequestVerificationRequest,
) => {
  const response = await apiClient.post<
    null,
    AcademyRequestVerificationRequest
  >({
    endpoint: '/auth/academy/request-verification',
    body: data,
    option: {
      proxy: true,
    },
  })

  return response
}
