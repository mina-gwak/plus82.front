'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { isServerError, useServerErrorHandler } from 'shared/api'
import { Button, HelperText, Label, Layout, Link, TextField } from 'shared/ui'

import { signIn } from 'entities/auth'

import { hasError } from 'features/form'

import { FormValues, defaultValues } from '../../model/form-values'
import * as rules from '../../model/rules'

import * as css from './variants'

export const SignInPage = () => {
  const router = useRouter()

  const form = useForm<FormValues>({
    defaultValues,
    reValidateMode: 'onSubmit',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const { handleServerError } = useServerErrorHandler(form)

  const handleSignInSuccess = () => {
    // TODO: Redirect to another page
    router.replace('/')
  }

  const handleFormValid = async (data: FormValues) => {
    const response = await signIn(data)

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSignInSuccess()
    }
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
          <Link href="/password/find" variant="tertiary">
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
