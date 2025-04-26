'use client'

import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { academySignUp } from 'entities/auth'
import {
  AcademyName,
  AcademyNameEn,
  BirthDate,
  FullName,
  Gender,
  RepresentativeName,
  BusinessRegistrationNumber,
  Address,
  TermsAndConditionsOfUse,
  useEmailValidationState,
} from 'features/sign-up'
import { Email, Password, ConfirmPassword } from 'features/sign-up'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Locale } from 'shared/config'
import { Form } from 'shared/form'
import { useCheckbox } from 'shared/lib'
import { Button, Heading, Layout, Link } from 'shared/ui'

import {
  FormValues,
  convertToAcademySignUpDTO,
  defaultValues,
} from '../../model/form-values'

export const BusinessSignUpPage = () => {
  const t = useTranslations('sign-up')

  const router = useRouter()

  const locale = useLocale() as Locale

  const form = useForm<FormValues>({
    defaultValues,
    reValidateMode: 'onSubmit',
  })

  const { isChecked, getCheckboxProps } = useCheckbox({ options: ['checked'] })

  const { handleServerError } = useServerErrorHandler()

  const { isEmailVerificationRequested, isEmailVerificationCompleted } =
    useEmailValidationState({ isBusiness: true })

  const handleSignUpSuccess = () => {
    toast.success(t('success.sign-up'))
    router.push('/business/sign-in')
  }

  const submitForm = async (data: FormValues) => {
    if (!isEmailVerificationRequested) {
      form.setError('email', {
        message: t('error.email-not-verified'),
      })

      return
    }

    if (!isEmailVerificationCompleted) {
      form.setError('code', {
        message: t('error.email-verification-code-not-checked'),
      })

      return
    }

    const response = await academySignUp(convertToAcademySignUpDTO(data))

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSignUpSuccess()
    }
  }

  return (
    <Layout>
      <div className="mb-[30px] flex flex-col items-center gap-1">
        <h1 className="display-small font-bold text-gray-900">{t('title')}</h1>
        <div className="body-large flex items-center gap-1 text-gray-700">
          <p>{t('description')}</p>
          <Link href="/sign-in">{t('link.sign-in')}</Link>
        </div>
      </div>
      <Form {...form}>
        <div className="mb-[50px]">
          <Heading as="h3" size="medium" className="mb-6">
            {t('heading.personal-information')}
          </Heading>
          <div>
            <Email />
            <Password />
            <ConfirmPassword />
            <FullName />
            <Gender />
            <BirthDate />
          </div>
        </div>
        <div className="mb-10">
          <Heading as="h3" size="medium" className="mb-6">
            {t('heading.academy-information')}
          </Heading>
          <div>
            <RepresentativeName />
            <AcademyName />
            <AcademyNameEn />
            <Address />
            <BusinessRegistrationNumber />
          </div>
        </div>
        <TermsAndConditionsOfUse
          locale={locale}
          {...getCheckboxProps('checked')}
        />
        <Button
          size="large"
          fullWidth
          disabled={!isChecked('checked')}
          onClick={form.handleSubmit(submitForm)}
        >
          {t('button.sign-up')}
        </Button>
      </Form>
    </Layout>
  )
}
