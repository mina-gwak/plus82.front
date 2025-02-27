'use server'

import { signIn, signOut } from 'auth'
import { AuthExceptionCode, HttpError } from 'shared/api'

export type SignInRequest = {
  email: string
  password: string
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) {
    return {
      type: 'toast',
      message: error?.message || 'An error occurred while signing in',
    }
  }

  if (error.code === AuthExceptionCode.EMAIL_NOT_CORRECT) {
    return {
      type: 'toast',
      message: "We couldn't find an account with that email",
    }
  } else if (error.code === AuthExceptionCode.PW_NOT_CORRECT) {
    return {
      type: 'form',
      field: 'password',
      message: 'The password you entered is incorrect',
    }
  } else if (error.code === AuthExceptionCode.DELETED_USER) {
    return {
      type: 'toast',
      message: 'This account has been deactivated',
    }
  } else {
    return {
      type: 'toast',
      message: error.message || 'An error occurred while signing in',
    }
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
