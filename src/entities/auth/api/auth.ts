'use server'

import { signIn, signOut } from 'auth'
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
  } else {
    return errorHandler.toast('sign-in.error.sign-in', { error })
  }
}

export const signInWithCredentials = async (data: SignInRequest) => {
  try {
    await signIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: '/',
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return handleError(error.cause?.err as Error)
  }
}

export const signInWithGoogle = async () => {
  await signIn('google')
}

export const signOutWithForm = async () => {
  await signOut({ redirect: false })
}
