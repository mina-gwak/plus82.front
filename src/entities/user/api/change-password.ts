'use server'

import { getTeacherSession } from 'entities/auth'
import {
  apiClient,
  AuthExceptionCode,
  HttpError,
  errorHandler,
  InvalidInputValueExceptionCode,
} from 'shared/api'

export type ChangePasswordRequest = {
  currentPassword: string
  newPassword: string
}

const handleError = (error: HttpError) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  if (error.code === AuthExceptionCode.PW_NOT_CORRECT) {
    return errorHandler.form({
      currentPassword: 'The current password is incorrect',
    })
  } else if (
    error.code === InvalidInputValueExceptionCode.INVALID_INPUT_VALUE
  ) {
    return errorHandler.form({
      currentPassword: 'The current password is incorrect',
    })
  }

  return errorHandler.toast('An error occurred while changing the password', {
    error,
  })
}

export const changePassword = async (data: ChangePasswordRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.put<null, ChangePasswordRequest>({
      endpoint: '/users/me/password',
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: data,
    })
  } catch (error) {
    return handleError(error as HttpError)
  }
}
