import { apiClient } from 'shared/api'

export type CheckCodeValidityRequest = {
  code: string | null
}

export const checkCodeValidity = async (data: CheckCodeValidityRequest) => {
  const response = await apiClient.get<null>(
    '/auth/reset-password/validate',
    data,
  )

  return response
}
