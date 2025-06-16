'use server'

import { getBusinessSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

export type UpdateBusinessUserMeRequest = {
  fullName: string
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

export const updateBusinessUserMe = async (
  data: UpdateBusinessUserMeRequest,
) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.put<null, UpdateBusinessUserMeRequest>({
      endpoint: '/users/me/by-academy',
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: data,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
