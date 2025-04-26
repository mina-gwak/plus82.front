'use server'

import { apiClient, errorHandler, HttpError } from 'shared/api'

import { Location } from '../config/location'

export type AcademySignUpRequest = {
  email: string
  password: string
  fullName: string
  genderType: 'FEMALE' | 'MALE'
  birthDate: string
  representativeName: string
  academyName: string
  academyNameEn: string
  locationType: Location
  detailedAddress: string
  lat: number
  lng: number
  businessRegistrationNumber: string
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  console.log(error.code)

  return errorHandler.toast('An error occurred while signing up', { error })
}

export const academySignUp = async (data: AcademySignUpRequest) => {
  try {
    await apiClient.post<null, AcademySignUpRequest>({
      endpoint: '/auth/academy/sign-up',
      body: data,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
