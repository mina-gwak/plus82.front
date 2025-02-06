'use server'

import { revalidateTag } from 'next/cache'

import { apiClient, ContentType, HttpError } from 'shared/api'
import { getCookie } from 'shared/server-lib'

export type UpdateProfileImageRequest = {
  image: File | null
}

const handleSuccess = () => {
  revalidateTag('user-me')
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return {
    type: 'toast',
    message: error.message || 'An error occurred while updating profile image',
  }
}

export const updateProfileImage = async (data: UpdateProfileImageRequest) => {
  const accessToken = await getCookie('accessToken')

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
