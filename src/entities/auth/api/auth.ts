'use server'

import {
  teacherSignIn as _teacherSignIn,
  teacherSignOut as _teacherSignOut,
  businessSignIn as _businessSignIn,
  businessSignOut as _businessSignOut,
} from 'auth'
import {
  AuthExceptionCode,
  errorHandler,
  HttpError,
  InvalidInputValueExceptionCode,
} from 'shared/api'

export type SignInRequest = {
  email: string
  password: string
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) {
    return errorHandler.toast('An error occurred while signing in', { error })
  }

  if (error.code === AuthExceptionCode.EMAIL_NOT_CORRECT) {
    return errorHandler.toast('exception.auth.email-not-correct', {
      translate: true,
    })
  } else if (error.code === AuthExceptionCode.PW_NOT_CORRECT) {
    return errorHandler.form(
      {
        password: 'exception.auth.pw-not-correct',
      },
      { translate: true },
    )
  } else if (error.code === AuthExceptionCode.DELETED_USER) {
    return errorHandler.toast('exception.auth.deleted-user', {
      translate: true,
    })
  } else if (
    error.code === InvalidInputValueExceptionCode.INVALID_INPUT_VALUE
  ) {
    return errorHandler.toast('exception.invalid-input-value.invalid-email', {
      translate: true,
    })
  } else if (error.code === 'NOT_ACADEMY_ROLE') {
    return errorHandler.toast('exception.auth.not-academy-role', {
      translate: true,
    })
  } else if (error.code === 'NOT_TEACHER_ROLE') {
    return errorHandler.toast('exception.auth.not-teacher-role', {
      translate: true,
    })
  } else {
    return errorHandler.toast('sign-in.error.sign-in', {
      translate: true,
      error,
    })
  }
}

export const teacherSignIn = async (data: SignInRequest) => {
  try {
    await _teacherSignIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: '/',
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return handleError(error.cause?.err as Error)
  }
}

export const teacherSignOut = async () => {
  await _teacherSignOut({ redirect: false })
}

export const businessSignIn = async (data: SignInRequest) => {
  try {
    await _businessSignIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: '/',
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return handleError(error.cause?.err as Error)
  }
}

export const businessSignOut = async () => {
  await _businessSignOut({ redirect: false })
}
