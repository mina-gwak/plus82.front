'use server'

import {
  apiClient,
  EmailVerificationCodeExceptionCode,
  errorHandler,
  HttpError,
  ResourceNotFoundExceptionCode,
} from 'shared/api'

type AcademyRequestPasswordResetRequest = {
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

export const academyRequestPasswordReset = async (
  data: AcademyRequestPasswordResetRequest,
) => {
  try {
    await apiClient.post<null, AcademyRequestPasswordResetRequest>({
      endpoint: '/auth/academy/reset-password/request',
      body: data,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
