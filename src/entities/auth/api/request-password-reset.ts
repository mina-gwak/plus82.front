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
    return errorHandler.toast('exception.email.too-many-request', {
      translate: true,
    })
  } else if (error.code === ResourceNotFoundExceptionCode.USER_NOT_FOUND) {
    return errorHandler.toast('exception.resource-not-found.user', {
      translate: true,
    })
  } else {
    return errorHandler.toast('find-password.error.request-password-reset', {
      translate: true,
      error,
    })
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
