'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { AuthExceptionCode, HttpError } from 'shared/api'
import { Button, HelperText, Label, Layout, Link, TextField } from 'shared/ui'

import { hasError } from 'features/form'

import { useSignIn } from '../../api/use-sign-in'
import { FormValues, defaultValues } from '../../model/form-values'
import * as rules from '../../model/rules'

import * as css from './variants'

export const SignInPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    reValidateMode: 'onSubmit',
  })

  const signIn = useSignIn()

  const handleSignInSuccess = () => {
    // TODO: Redirect to another page
    router.replace('/')
  }

  const handleSignInError = (error: HttpError) => {
    if (error.code === AuthExceptionCode.EMAIL_NOT_CORRECT) {
      toast.error("We couldn't find an account with that email")
    } else if (error.code === AuthExceptionCode.PW_NOT_CORRECT) {
      setError('password', {
        message: 'The password you entered is incorrect',
      })
    } else if (error.code === AuthExceptionCode.DELETED_USER) {
      toast.error('This account has been deactivated')
    }
  }

  const handleFormValid = (data: FormValues) => {
    signIn.mutate(data, {
      onSuccess: handleSignInSuccess,
      onError: handleSignInError,
    })
  }

  return (
    <Layout className={css.layout()}>
      <h1 className={css.heading()}>Sign In</h1>
      <form onSubmit={event => event.preventDefault()}>
        <div className={css.fields()}>
          <div className={css.field()}>
            <Label>Email</Label>
            <TextField
              {...register('email', rules.email)}
              error={hasError(errors?.email)}
            />
            {hasError(errors?.email) && (
              <HelperText variant="error">{errors.email.message}</HelperText>
            )}
          </div>
          <div className={css.field()}>
            <Label>Password</Label>
            <TextField
              {...register('password', rules.password)}
              type="password"
              error={hasError(errors?.password)}
            />
            {hasError(errors?.password) && (
              <HelperText variant="error">{errors.password.message}</HelperText>
            )}
          </div>
        </div>
        <div className={css.buttonGroup()}>
          <Button
            type="submit"
            size="large"
            fullWidth
            onClick={handleSubmit(handleFormValid)}
          >
            Sign In
          </Button>
          <Link href="/" variant="tertiary">
            Password forgot
          </Link>
        </div>
      </form>
      <div className={css.footer()}>
        <p>Not a member yet?</p>
        <Link href="/sign-up">Create an account</Link>
      </div>
    </Layout>
  )
}
