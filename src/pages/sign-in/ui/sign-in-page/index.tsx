'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { teacherSignIn, businessSignIn } from 'entities/auth'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Form } from 'shared/form'
import { Button, Label, Layout, Link } from 'shared/ui'

import * as css from './variants'
import { FormValues, defaultValues } from '../../model/form-values'
import * as rules from '../../model/rules'

export const SignInPage = () => {
  const router = useRouter()
  const session = useSession()
  const pathname = usePathname()

  const isBusinessSignIn = pathname?.includes('business')

  const t = useTranslations('sign-in')

  const form = useForm<FormValues>({
    defaultValues,
    reValidateMode: 'onSubmit',
  })

  const { handleSubmit } = form

  const { handleServerError } = useServerErrorHandler(form)

  const handleSignInSuccess = async () => {
    // TODO: Redirect to another page
    router.replace(isBusinessSignIn ? '/business' : '/')
    session.update()
  }

  const handleFormValid = async (data: FormValues) => {
    const response = isBusinessSignIn
      ? await businessSignIn(data)
      : await teacherSignIn(data)

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSignInSuccess()
    }
  }

  return (
    <Layout className={css.layout()}>
      <h1 className={css.heading()}>
        {isBusinessSignIn ? t('business-title') : t('user-title')}
      </h1>
      <Form {...form}>
        <div className={css.fields()}>
          <div className={css.field()}>
            <Label>{t('label.email')}</Label>
            <Form.Control name="email" rules={rules.email}>
              <Form.TextField />
              <Form.ErrorMessage />
            </Form.Control>
          </div>
          <div className={css.field()}>
            <Label>{t('label.password')}</Label>
            <Form.Control name="password" rules={rules.password}>
              <Form.PasswordField />
              <Form.ErrorMessage />
            </Form.Control>
          </div>
        </div>
        <div className={css.buttonGroup()}>
          <Button
            type="submit"
            size="large"
            fullWidth
            onClick={handleSubmit(handleFormValid)}
          >
            {t('button.sign-in')}
          </Button>
          <Link
            href={
              isBusinessSignIn ? '/business/password/find' : '/password/find'
            }
            variant="tertiary"
          >
            {t('link.password-forgot')}
          </Link>
        </div>
      </Form>
      <div className={css.footer()}>
        <p>{t('footer.message')}</p>
        <Link href={isBusinessSignIn ? '/business/sign-up' : '/sign-up'}>
          {t('link.sign-up')}
        </Link>
      </div>
    </Layout>
  )
}
