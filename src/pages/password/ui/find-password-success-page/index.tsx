'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { isNilOrEmptyString } from 'shared/lib'
import { Button, Layout } from 'shared/ui'

import * as css from './variants'

export const FindPasswordSuccessPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const timestamp = searchParams?.get('t')
    const code = searchParams?.get('code')

    const hasAccess = !(
      isNilOrEmptyString(timestamp) || isNilOrEmptyString(code)
    )

    if (!hasAccess) {
      router.replace('/password/find')
    }
  }, [router, searchParams])

  const handleBackButtonClick = () => {
    router.push('/sign-in')
  }

  return (
    <Layout className={css.layout()}>
      <h1 className={css.heading()}>Reset password</h1>
      <p className={css.message()}>
        The password reset link has been sent successfully to the email address
        you provided
      </p>
      <Button size="large" fullWidth onClick={handleBackButtonClick}>
        Back to Sign In
      </Button>
    </Layout>
  )
}
