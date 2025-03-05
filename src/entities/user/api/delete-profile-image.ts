'use server'

import { revalidateTag } from 'next/cache'

import { getSession } from 'entities/auth'
import { apiClient, HttpError } from 'shared/api'

const handleSuccess = () => {
  revalidateTag('user-me')
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return {
    type: 'toast',
    message: error.message || 'An error occurred while deleting profile image',
  }
}

export const deleteProfileImage = async () => {
  const { accessToken } = await getSession()

  try {
    await apiClient.delete<null, null>({
      endpoint: '/users/me/profile-image',
      option: {
        authorization: `Bearer ${accessToken}`,
      },
    })

    handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
