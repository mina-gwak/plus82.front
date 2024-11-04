'use client'

import { isNil } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { QueryErrorBoundary } from 'shared/api'
import { isEmptyString } from 'shared/lib'
import { Button, Label, Layout } from 'shared/ui'

import {
  confirmPasswordRules,
  passwordRules,
  PasswordValidation,
} from 'entities/auth'

import { field, fieldWrapper, Form } from 'features/form'

import { useCheckCodeValidity } from '../../api/use-check-code-validity'
import { useResetPassword } from '../../api/use-reset-password'
import {
  resetFormDefaultValues,
  ResetFormValues,
} from '../../model/form-values'
import { ErrorFallback } from '../error-fallback'

import * as css from './variants'

const ResetPasswordPage = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const code = searchParams?.get('code') ?? null

  useCheckCodeValidity(code)
  const resetPassword = useResetPassword()

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
    toast.success('Your password has been changed successfully')
    router.replace('/sign-in')
  }

  const submitForm = ({ password }: ResetFormValues) => {
    if (isNil(code)) return

    const data = {
      code,
      password,
    }

    resetPassword.mutate(data, {
      onSuccess: handleResetPasswordSuccess,
    })
  }

  return (
    <Layout className={css.layout()}>
      <h1 className={css.heading()}>Reset password</h1>
      <Form {...form} className={css.form()}>
        <div>
          <div className={fieldWrapper()}>
            <Label>New password</Label>
            <div className={field()}>
              <Form.PasswordField
                name="password"
                rules={passwordRules}
                placeholder="Enter the password"
                autoComplete="one-time-code"
                showToggle
              />
              <PasswordValidation password={password} />
            </div>
          </div>

          <div className={field()}>
            <Label>Confirm new password</Label>
            <Form.Control name="confirmPassword" rules={confirmPasswordRules}>
              <Form.PasswordField
                placeholder="Check the password"
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
          Reset password
        </Button>
      </Form>
    </Layout>
  )
}

export const ResetPasswordPageWithErrorBoundary = () => {
  return (
    <QueryErrorBoundary
      errorFallback={ErrorFallback}
      suspenseFallback={<div>Loading</div>}
    >
      <ResetPasswordPage />
    </QueryErrorBoundary>
  )
}
