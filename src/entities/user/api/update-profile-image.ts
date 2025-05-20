'use server'

import { revalidateTag } from 'next/cache'

import { getTeacherSession } from 'entities/auth'
import { apiClient, ContentType, errorHandler, HttpError } from 'shared/api'

export type UpdateProfileImageRequest = {
  image: File | null
}

const handleSuccess = () => {
  revalidateTag('user-me')
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('An error occurred while updating profile image', {
    error,
  })
}

export const updateProfileImage = async (data: UpdateProfileImageRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.put<null, UpdateProfileImageRequest>({
      endpoint: '/users/me/profile-image',
      option: {
        contentType: ContentType.MULTIPART,
        authorization: `Bearer ${accessToken}`,
      },
      body: data,
    })

    handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
