'use server'

import { apiClient, errorHandler, HttpError } from 'shared/api'

export type SignUpRequest = {
  email: string
  password: string
  firstName: string
  lastName: string
  genderType: 'FEMALE' | 'MALE'
  birthDate: string
  countryId: number
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('An error occurred while signing up', { error })
}

export const signUp = async (data: SignUpRequest) => {
  try {
    await apiClient.post<null, SignUpRequest>({
      endpoint: '/auth/sign-up',
      body: data,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
