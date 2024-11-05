import { FallbackProps } from 'react-error-boundary'

import {
  CommonResponseCode,
  EmailVerificationCodeExceptionCode,
  ResourceNotFoundExceptionCode,
} from 'shared/api'
import { ErrorPage } from 'shared/ui'

export const ErrorFallback = ({ error }: FallbackProps) => {
  if (
    error?.code === EmailVerificationCodeExceptionCode.ALREADY_VERIFIED_CODE ||
    error?.code === EmailVerificationCodeExceptionCode.EXPIRED_CODE
  ) {
    return (
      <ErrorPage
        title="Reset password link expired"
        content="This link has expired. If you have forgotten your password, please begin the password reset process again."
      />
    )
  }

  if (
    error?.code === CommonResponseCode.FAILED ||
    error?.code ===
      ResourceNotFoundExceptionCode.EMAIL_VERIFICATION_CODE_NOT_FOUND
  ) {
    return (
      <ErrorPage
        title="Reset password link not found"
        content="The password reset link is invalid. Please ensure you're using the corret URL."
      />
    )
  }
}
