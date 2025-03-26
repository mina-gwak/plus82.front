'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { signUp } from 'entities/auth'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Form } from 'shared/form'
import { useCheckbox } from 'shared/lib'
import { Button, Checkbox, Layout, Link, linkVariants } from 'shared/ui'

import { useEmailValidationState } from '../../lib/use-email-validation-state'
import {
  FormValues,
  defaultValues,
  convertToSignUpDTO,
} from '../../model/form-values'
import { Account } from '../account'
import { PersonalInformation } from '../personal-information'
import * as css from './variants'

export const SignUpPage = () => {
  const router = useRouter()

  const form = useForm<FormValues>({
    defaultValues,
    reValidateMode: 'onSubmit',
  })

  const { isChecked, getCheckboxProps } = useCheckbox({ options: ['checked'] })

  const { handleServerError } = useServerErrorHandler()

  const handleSignUpSuccess = () => {
    toast.success('Sign up completed successfully')
    router.push('/sign-in')
  }

  const { isEmailVerificationRequested, isEmailVerificationCompleted } =
    useEmailValidationState()

  const submitForm = async (data: FormValues) => {
    if (!isEmailVerificationRequested) {
      form.setError('email', {
        message: 'This email address is not verified',
      })

      return
    }

    if (!isEmailVerificationCompleted) {
      form.setError('code', {
        message:
          'Please click the verify button to complete email verification',
      })

      return
    }

    const response = await signUp(convertToSignUpDTO(data))

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSignUpSuccess()
    }
  }

  return (
    <Layout>
      <h2 className={css.welcomeMessage()}>
        New opportunities await you at Plus82
      </h2>
      <div className={css.headerWrapper()}>
        <h1 className={css.header()}>Sign Up</h1>
        <div className={css.goToSignIn()}>
          <p>Have an account?</p>
          <Link href="/sign-in">Sign In</Link>
        </div>
      </div>
      <Form {...form}>
        <Account />
        <PersonalInformation />
        <Checkbox
          {...getCheckboxProps('checked')}
          className={css.checkbox()}
          label={className => (
            <p className={className}>
              I have read and agree to the Plus 82&apos;s
              <br />
              <a
                href="/terms-and-conditions-of-use"
                target="_blank"
                onClick={event => {
                  event.stopPropagation()
                }}
                className={linkVariants({ variant: 'secondary' })}
              >
                Terms and Conditions of Use. (Essential)
              </a>
            </p>
          )}
        />
        <Button
          size="large"
          fullWidth
          disabled={!isChecked('checked')}
          onClick={form.handleSubmit(submitForm)}
        >
          Sign Up
        </Button>
      </Form>
    </Layout>
  )
}
