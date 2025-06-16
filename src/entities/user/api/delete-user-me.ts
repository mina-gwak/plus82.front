'use server'

import { getTeacherSession } from 'entities/auth'
import {
  apiClient,
  errorHandler,
  HttpError,
  ResourceNotFoundExceptionCode,
} from 'shared/api'

const handleSuccess = () => {
  return { success: true }
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  if (error.code === ResourceNotFoundExceptionCode.USER_NOT_FOUND) {
    return errorHandler.toast('my-account.error.account-deactivated')
  } else {
    return errorHandler.toast('my-account.error.delete-account', {
      error,
    })
  }
}

export const deleteUserMe = async () => {
  try {
    const { accessToken } = await getTeacherSession()

    await apiClient.delete({
      endpoint: '/users/me',
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: null,
    })

    return handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
