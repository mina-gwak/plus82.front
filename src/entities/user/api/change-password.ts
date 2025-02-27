'use server'

import { getSession } from 'entities/auth'
import {
  apiClient,
  AuthExceptionCode,
  HttpError,
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
    return {
      type: 'form',
      message: 'The current password is incorrect',
      field: 'currentPassword',
    }
  } else if (
    error.code === InvalidInputValueExceptionCode.INVALID_INPUT_VALUE
  ) {
    return {
      type: 'form',
      message: 'The current password is incorrect',
      field: 'currentPassword',
    }
  }

  return {
    type: 'toast',
    message: error?.message || 'An error occurred while changing the password',
  }
}

export const changePassword = async (data: ChangePasswordRequest) => {
  const { accessToken } = await getSession()

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
