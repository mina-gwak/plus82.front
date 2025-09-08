'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  currentPasswordRules,
  passwordRules,
  PasswordValidation,
  businessSignOut,
} from 'entities/auth'
import { changeBusinessUserPassword } from 'entities/user'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { fieldCss, Form } from 'shared/form'
import { isEmptyString } from 'shared/lib'
import { Button, Label } from 'shared/ui'

import {
  changePasswordFormDefaultValues,
  type ChangePasswordFormValues,
} from '../model/form-values'

export const ChangePasswordPage = () => {
  const t = useTranslations('reset-password')

  const queryClient = useQueryClient()
  const router = useRouter()

  const form = useForm<ChangePasswordFormValues>({
    defaultValues: changePasswordFormDefaultValues,
  })

  const { handleServerError } = useServerErrorHandler(form)

  const [currentPassword, newPassword] = useWatch({
    name: ['currentPassword', 'newPassword'],
    control: form.control,
  })

  const canSubmit =
    !isEmptyString(currentPassword) && !isEmptyString(newPassword)

  const handleChangePasswordSuccess = async () => {
    toast.success(t('success.update-password'))

    queryClient.removeQueries()
    await businessSignOut()
    await signOut({ redirect: false })

    router.push('/business/sign-in')
  }

  const submitForm = async (data: ChangePasswordFormValues) => {
    const response = await changeBusinessUserPassword(data)

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleChangePasswordSuccess()
    }
  }

  return (
    <div className="flex flex-grow justify-center p-10">
      <div className="flex flex-col items-center gap-10">
        <h2 className="title-large font-bold text-gray-900">{t('title')}</h2>
        <Form {...form} className="flex flex-col gap-10">
          <div>
            <div className={fieldCss.fieldWrapper()}>
              <Label>{t('label.current-password')}</Label>
              <Form.Control name="currentPassword" rules={currentPasswordRules}>
                <Form.PasswordField autoComplete="one-time-code" showToggle />
                <Form.ErrorMessage />
              </Form.Control>
            </div>

            <div className={fieldCss.fieldWrapper()}>
              <Label>{t('label.new-password')}</Label>
              <div className={fieldCss.field()}>
                <Form.PasswordField
                  name="newPassword"
                  rules={passwordRules}
                  autoComplete="one-time-code"
                  showToggle
                />
                <PasswordValidation password={newPassword} />
              </div>
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
      </div>
    </div>
  )
}
