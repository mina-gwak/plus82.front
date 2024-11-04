'use client'

import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  EmailVerificationCodeExceptionCode,
  HttpError,
  ResourceNotFoundExceptionCode,
} from 'shared/api'
import { isEmptyString } from 'shared/lib'
import { Button, Label, Layout } from 'shared/ui'

import { Form } from 'features/form'

import { useRequestPasswordReset } from '../../api/use-request-password-reset'
import { FindFormValues, findFormDefaultValues } from '../../model/form-values'
import * as rules from '../../model/rules'

import * as css from './variants'

export const FindPasswordPage = () => {
  const form = useForm<FindFormValues>({
    defaultValues: findFormDefaultValues,
    reValidateMode: 'onSubmit',
  })

  const email = useWatch({
    name: 'email',
    control: form.control,
  })

  const canSubmit = !isEmptyString(email)

  const requestPasswordReset = useRequestPasswordReset()

  const handleRequestPasswordResetError = (error: HttpError) => {
    if (error.code === EmailVerificationCodeExceptionCode.TOO_MANY_REQUEST) {
      toast.error(
        'You have requested too many times. Please try again in 10 minutes.',
      )
    } else if (error.code === ResourceNotFoundExceptionCode.USER_NOT_FOUND) {
      toast.error("We couldn't find an account with that email")
    }
  }

  const submitForm = (data: FindFormValues) => {
    requestPasswordReset.mutate(data, {
      onSuccess: () => {}, // TODO: 논의 필요
      onError: handleRequestPasswordResetError,
    })
  }

  return (
    <Layout className={css.layout()}>
      <h1 className={css.heading()}>Reset password</h1>
      <Form {...form} className={css.form()}>
        <div className={css.field()}>
          <Label>Email</Label>
          <Form.Control name="email" rules={rules.email}>
            <Form.TextField />
            <Form.ErrorMessage />
          </Form.Control>
        </div>
        <Button
          size="large"
          fullWidth
          onClick={form.handleSubmit(submitForm)}
          disabled={!canSubmit}
        >
          Send password reset link
        </Button>
      </Form>
    </Layout>
  )
}
