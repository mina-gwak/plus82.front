'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Form } from 'shared/form'
import { useCheckbox } from 'shared/lib'
import { Button, Checkbox, Layout, Link } from 'shared/ui'

import { useSignUp } from '../../api/use-sign-up'
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

  const signUp = useSignUp()

  const { isChecked, getCheckboxProps } = useCheckbox({ options: ['checked'] })

  const handleSignUpSuccess = () => {
    toast.success('Sign up completed successfully')
    router.push('/sign-in')
  }

  const { isEmailVerificationRequested, isEmailVerificationCompleted } =
    useEmailValidationState()

  const submitForm = (data: FormValues) => {
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

    signUp.mutate(convertToSignUpDTO(data), { onSuccess: handleSignUpSuccess })
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
              <Link href="/" variant="secondary">
                Terms and Conditions of Use. (Essential)
              </Link>
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
