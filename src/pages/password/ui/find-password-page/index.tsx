'use client'

import crypto from 'crypto'

import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'

import { requestPasswordReset } from 'entities/auth'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Form } from 'shared/form'
import { isEmptyString } from 'shared/lib'
import { Button, Label, Layout } from 'shared/ui'

import * as css from './variants'
import { FindFormValues, findFormDefaultValues } from '../../model/form-values'
import * as rules from '../../model/rules'

export const FindPasswordPage = () => {
  const router = useRouter()

  const form = useForm<FindFormValues>({
    defaultValues: findFormDefaultValues,
    reValidateMode: 'onSubmit',
  })

  const email = useWatch({
    name: 'email',
    control: form.control,
  })

  const { handleServerError } = useServerErrorHandler()

  const canSubmit = !isEmptyString(email)

  const handleSuccess = () => {
    const timestamp = Date.now()
    const hash = crypto
      .createHash('sha256')
      .update(`${email}${timestamp}`)
      .digest('hex')
      .slice(0, 32)

    router.push(`/password/find/sent?t=${timestamp}&code=${hash}`)
  }

  const submitForm = async (data: FindFormValues) => {
    const response = await requestPasswordReset(data)

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSuccess()
    }
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
