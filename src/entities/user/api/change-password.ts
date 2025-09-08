'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
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
    return errorHandler.form(
      {
        currentPassword: 'reset-password.error.incorrect',
      },
      {
        translate: true,
      },
    )
  } else if (
    error.code === InvalidInputValueExceptionCode.INVALID_INPUT_VALUE
  ) {
    return errorHandler.form(
      {
        currentPassword: 'reset-password.error.incorrect',
      },
      {
        translate: true,
      },
    )
  }

  return errorHandler.toast('reset-password.error.reset-password', {
    error,
    translate: true,
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

export const changeBusinessUserPassword = async (
  data: ChangePasswordRequest,
) => {
  const { accessToken } = await getBusinessSession()

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
