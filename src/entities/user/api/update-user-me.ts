'use server'

import { getSession } from 'entities/auth'
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

  return errorHandler.toast('An error occurred while updating the user', {
    error,
  })
}

export const updateUserMe = async (data: UpdateUserMeRequest) => {
  const { accessToken } = await getSession()

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
