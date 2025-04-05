'use client'

import { isNil } from 'lodash-es'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  confirmPasswordRules,
  passwordRules,
  PasswordValidation,
  resetPassword,
} from 'entities/auth'
import {
  isServerError,
  QueryErrorBoundary,
  useServerErrorHandler,
} from 'shared/api'
import { fieldCss, Form } from 'shared/form'
import { isEmptyString } from 'shared/lib'
import { Button, Label, Layout, Spinner } from 'shared/ui'

import { useCheckCodeValidity } from '../../api/use-check-code-validity'
import {
  resetFormDefaultValues,
  ResetFormValues,
} from '../../model/form-values'
import { ErrorFallback } from '../error-fallback'
import * as css from './variants'

const ResetPasswordPage = () => {
  const router = useRouter()
  const pathname = usePathname()

  const isBusiness = pathname?.includes('business')

  const t = useTranslations('reset-password')

  const searchParams = useSearchParams()
  const code = searchParams?.get('code') ?? null

  useCheckCodeValidity(code)

  const { handleServerError } = useServerErrorHandler()

  const form = useForm<ResetFormValues>({
    defaultValues: resetFormDefaultValues,
    reValidateMode: 'onSubmit',
  })

  const [password, confirmPassword] = useWatch({
    name: ['password', 'confirmPassword'],
    control: form.control,
  })

  const canSubmit = !isEmptyString(password) && !isEmptyString(confirmPassword)

  const handleResetPasswordSuccess = () => {
    toast.success(t('success.reset-password'))
    router.replace(`${isBusiness ? '/business' : ''}/sign-in`)
  }

  const submitForm = async ({ password }: ResetFormValues) => {
    if (isNil(code)) return

    const data = {
      code,
      password,
    }

    const response = await resetPassword(data)

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleResetPasswordSuccess()
    }
  }

  return (
    <Layout className={css.layout()}>
      <h1 className={css.heading()}>{t('title')}</h1>
      <Form {...form} className={css.form()}>
        <div>
          <div className={fieldCss.fieldWrapper()}>
            <Label>{t('label.new-password')}</Label>
            <div className={fieldCss.field()}>
              <Form.PasswordField
                name="password"
                rules={passwordRules}
                placeholder={t('placeholder.new-password')}
                autoComplete="one-time-code"
                showToggle
              />
              <PasswordValidation password={password} />
            </div>
          </div>

          <div className={fieldCss.field()}>
            <Label>{t('label.confirm-new-password')}</Label>
            <Form.Control name="confirmPassword" rules={confirmPasswordRules}>
              <Form.PasswordField
                placeholder={t('placeholder.confirm-new-password')}
                autoComplete="one-time-code"
                showToggle
              />
              <Form.ErrorMessage />
            </Form.Control>
          </div>
        </div>
        <Button
          size="large"
          fullWidth
          onClick={form.handleSubmit(submitForm)}
          disabled={!canSubmit}
        >
          {t('button.reset-password')}
        </Button>
      </Form>
    </Layout>
  )
}

export const ResetPasswordPageWithErrorBoundary = () => {
  return (
    <QueryErrorBoundary
      errorFallback={ErrorFallback}
      suspenseFallback={<Spinner size="large" />}
    >
      <ResetPasswordPage />
    </QueryErrorBoundary>
  )
}
