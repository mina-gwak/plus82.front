import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  EmailVerificationCodeExceptionCode,
  HttpError,
  ResourceNotFoundExceptionCode,
  UserExceptionCode,
} from 'shared/api'
import { fieldCss, Form, hasError } from 'shared/form'
import { Button, HelperText, Label } from 'shared/ui'

import { useAcademyRequestVerification } from '../../api/use-academy-request-verification'
import { useRequestVerification } from '../../api/use-request-verification'
import { useVerifyCode } from '../../api/use-verify-code'
import { FormValues } from '../../model/form-values'
import { email as emailRule, code as codeRule } from '../../model/rules'

export const Email = () => {
  const t = useTranslations()
  const pathname = usePathname()

  const isBusiness = pathname?.includes('business')

  const [showVerificationField, setShowVerificationField] = useState(false)

  const {
    trigger,
    getValues,
    setError,
    formState: { errors },
    reset,
    control,
  } = useFormContext<FormValues>()

  const email = useWatch({
    name: 'email',
    control,
  })

  const requestVerification = useRequestVerification()
  const academyRequestVerification = useAcademyRequestVerification()
  const verifyCode = useVerifyCode()

  const handleEmailChange = () => {
    if (!(requestVerification.isPending || requestVerification.isIdle)) {
      requestVerification.reset()
    }

    if (!(verifyCode.isPending || verifyCode.isIdle)) {
      verifyCode.reset()
      reset({ ...getValues(), code: '' })
    }
  }

  const handleRequestVerificationSuccess = () => {
    toast.success(t('sign-up.success.request-verification'))

    if (!showVerificationField) setShowVerificationField(true)
  }

  const handleRequestVerificationError = (error: HttpError) => {
    if (error.code === EmailVerificationCodeExceptionCode.TOO_MANY_REQUEST) {
      toast.error(t('exception.email.too-many-request'))
    } else if (error.code === UserExceptionCode.ALREADY_USED_EMAIL) {
      setError('email', {
        message: t('exception.user.already-used-email'),
      })
    } else {
      toast.error(t('sign-up.error.request-verification'))
    }
  }

  const handleSendButtonClick = async () => {
    const isEmailValid = await trigger('email')

    if (!isEmailValid) return

    const data = { email }

    if (isBusiness) {
      academyRequestVerification.mutate(data, {
        onSuccess: handleRequestVerificationSuccess,
        onError: handleRequestVerificationError,
      })
    } else {
      requestVerification.mutate(data, {
        onSuccess: handleRequestVerificationSuccess,
        onError: handleRequestVerificationError,
      })
    }
  }

  const handleVerifyCodeError = (error: HttpError) => {
    if (
      error.code === EmailVerificationCodeExceptionCode.ALREADY_VERIFIED_CODE
    ) {
      setError('code', {
        message: t('exception.email.already-verified-code'),
      })
    } else if (error.code === EmailVerificationCodeExceptionCode.EXPIRED_CODE) {
      setError('code', {
        message: t('exception.email.expired-code'),
      })
    } else if (
      error.code ===
      ResourceNotFoundExceptionCode.EMAIL_VERIFICATION_CODE_NOT_FOUND
    ) {
      setError('code', {
        message: t('exception.resource-not-found.email-verification-code'),
      })
    }
  }

  const handleCheckButtonClick = async () => {
    const isCodeValid = await trigger('code')

    if (!isCodeValid) return

    if (requestVerification.isPending || requestVerification.isIdle) {
      setError('email', {
        message: t('sign-up.error.email-verification-required'),
      })

      return
    }

    const data = { email, code: getValues('code') }

    verifyCode.mutate(data, {
      onError: handleVerifyCodeError,
    })
  }

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.email.label')}</Label>
      <div className={fieldCss.textFieldWrapper()}>
        <div className={fieldCss.field({ className: 'grow' })}>
          <Form.Control name="email" rules={emailRule}>
            <Form.TextField
              onChange={handleEmailChange}
              placeholder={t('field.email.placeholder')}
              autoComplete="one-time-code"
              fullWidth
            />
            <Form.ErrorMessage />
          </Form.Control>
        </div>
        <Button
          variant="lined"
          size="large"
          onClick={handleSendButtonClick}
          disabled={requestVerification.isSuccess}
          className="w-[95px]"
        >
          {t('sign-up.button.send-verification-code')}
        </Button>
      </div>

      {showVerificationField && (
        <div className={fieldCss.textFieldWrapper()}>
          <div className={fieldCss.field({ className: 'grow' })}>
            <Form.Control name="code" rules={codeRule}>
              <Form.TextField
                placeholder={t('field.email-verification-code.placeholder')}
                readOnly={verifyCode.isSuccess}
                fullWidth
              />
              <Form.ErrorMessage />
            </Form.Control>
            {!hasError(errors?.code) && verifyCode.isSuccess && (
              <HelperText variant="success">
                {t('sign-up.success.verify-code')}
              </HelperText>
            )}
            {!hasError(errors?.code) && !verifyCode.isSuccess && (
              <HelperText>{t('sign-up.message.verification-code')}</HelperText>
            )}
          </div>
          <Button
            variant="lined"
            size="large"
            onClick={handleCheckButtonClick}
            className="w-[95px] shrink-0"
            disabled={verifyCode.isSuccess}
          >
            {t('sign-up.button.verify-code')}
          </Button>
        </div>
      )}
    </div>
  )
}
