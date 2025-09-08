'use server'

import { revalidateTag } from 'next/cache'

import { getBusinessSession } from 'entities/auth'
import {
  apiClient,
  HttpError,
  errorHandler,
  ServerError,
  ContentType,
} from 'shared/api'

import { UpdateAcademyDetail } from '../model/academy-detail'

const handleSuccess = () => {
  revalidateTag('academy-me')
}

const handleError = (error: Error): ServerError => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('academy-detail.error.register', {
    error,
    translate: true,
  })
}

export const updateAcademyMe = async (
  updateAcademyDetail: UpdateAcademyDetail,
) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.put<null>({
      endpoint: `/academies/me`,
      option: {
        contentType: ContentType.MULTIPART,
        authorization: `Bearer ${accessToken}`,
      },
      body: updateAcademyDetail,
    })

    handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
