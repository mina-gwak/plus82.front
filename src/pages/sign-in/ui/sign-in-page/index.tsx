'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { signInWithCredentials } from 'entities/auth'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Form } from 'shared/form'
import { Button, Label, Layout, Link } from 'shared/ui'

import * as css from './variants'
import { FormValues, defaultValues } from '../../model/form-values'
import * as rules from '../../model/rules'

export const SignInPage = () => {
  const router = useRouter()
  const session = useSession()

  const form = useForm<FormValues>({
    defaultValues,
    reValidateMode: 'onSubmit',
  })

  const { handleSubmit } = form

  const { handleServerError } = useServerErrorHandler(form)

  const handleSignInSuccess = async () => {
    // TODO: Redirect to another page
    router.replace('/')
    session.update()
  }

  const handleFormValid = async (data: FormValues) => {
    const response = await signInWithCredentials(data)

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSignInSuccess()
    }
  }

  return (
    <Layout className={css.layout()}>
      <h1 className={css.heading()}>Sign In</h1>
      <Form {...form}>
        <div className={css.fields()}>
          <div className={css.field()}>
            <Label>Email</Label>
            <Form.Control name="email" rules={rules.email}>
              <Form.TextField />
              <Form.ErrorMessage />
            </Form.Control>
          </div>
          <div className={css.field()}>
            <Label>Password</Label>
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
            Sign In
          </Button>
          <Link href="/password/find" variant="tertiary">
            Password forgot
          </Link>
        </div>
      </Form>
      <div className={css.footer()}>
        <p>Not a member yet?</p>
        <Link href="/sign-up">Create an account</Link>
      </div>
    </Layout>
  )
}
