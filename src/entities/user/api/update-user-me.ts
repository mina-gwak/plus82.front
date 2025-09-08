'use server'

import { getTeacherSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

export type UpdateUserMeRequest = {
  firstName: string
  lastName: string
  countryId: number | null
  genderType: 'MALE' | 'FEMALE'
  birthDate: string
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('my-account.error.save', {
    error,
    translate: true,
  })
}

export const updateUserMe = async (data: UpdateUserMeRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.put<null, UpdateUserMeRequest>({
      endpoint: '/users/me',
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: data,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
