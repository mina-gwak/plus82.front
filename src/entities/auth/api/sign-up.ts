import { apiClient } from 'shared/api'

export type SignUpRequest = {
  email: string
  password: string
  firstName: string
  lastName: string
  genderType: 'FEMALE' | 'MALE'
  birthDate: string
  countryId: number
}

export const signUp = async (data: SignUpRequest) => {
  const response = await apiClient.post<null, SignUpRequest>(
    '/auth/sign-up',
    data,
  )

  return response
}
