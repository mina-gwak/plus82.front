'use client'

import crypto from 'crypto'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
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
  const pathname = usePathname()

  const isBusiness = pathname?.includes('business')

  const t = useTranslations('find-password')

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

    router.push(
      `${isBusiness ? '/business' : ''}/password/find/sent?t=${timestamp}&code=${hash}`,
    )
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
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className={css.heading()}>{t('title')}</h1>
        <p className="title-small text-center font-medium text-gray-900">
          {t('description')}
        </p>
      </div>
      <Form {...form} className={css.form()}>
        <div className={css.field()}>
          <Label>{t('label.email')}</Label>
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
          {t('button.send-reset-link')}
        </Button>
      </Form>
    </Layout>
  )
}
