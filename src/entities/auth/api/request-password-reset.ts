'use server'

import {
  apiClient,
  EmailVerificationCodeExceptionCode,
  errorHandler,
  HttpError,
  ResourceNotFoundExceptionCode,
} from 'shared/api'

type RequestPasswordResetRequest = {
  email: string
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  if (error.code === EmailVerificationCodeExceptionCode.TOO_MANY_REQUEST) {
    return errorHandler.toast(
      'You have requested too many times. Please try again in 10 minutes.',
    )
  } else if (error.code === ResourceNotFoundExceptionCode.USER_NOT_FOUND) {
    return errorHandler.toast("We couldn't find an account with that email")
  } else {
    return errorHandler.toast(
      'An error occurred while requesting a password reset',
      { error },
    )
  }
}

export const requestPasswordReset = async (
  data: RequestPasswordResetRequest,
) => {
  try {
    await apiClient.post<null, RequestPasswordResetRequest>({
      endpoint: '/auth/reset-password/request',
      body: data,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
