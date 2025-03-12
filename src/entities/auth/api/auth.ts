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
    return errorHandler.toast('An error occurred while signing in', error)
  }

  if (error.code === AuthExceptionCode.EMAIL_NOT_CORRECT) {
    return errorHandler.toast("We couldn't find an account with that email")
  } else if (error.code === AuthExceptionCode.PW_NOT_CORRECT) {
    return errorHandler.form({
      password: 'The password you entered is incorrect',
    })
  } else if (error.code === AuthExceptionCode.DELETED_USER) {
    return errorHandler.toast('This account has been deactivated')
  } else if (
    error.code === InvalidInputValueExceptionCode.INVALID_INPUT_VALUE
  ) {
    return errorHandler.toast('Please check your email and password')
  } else {
    return errorHandler.toast('An error occurred while signing in', error)
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
