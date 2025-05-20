'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { isNilOrEmptyString } from 'shared/lib'
import { Button, Layout } from 'shared/ui'

import * as css from './variants'

export const FindPasswordSuccessPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const t = useTranslations('find-password-success')

  const isBusiness = pathname?.includes('business')

  useEffect(() => {
    const timestamp = searchParams?.get('t')
    const code = searchParams?.get('code')

    const hasAccess = !(
      isNilOrEmptyString(timestamp) || isNilOrEmptyString(code)
    )

    if (!hasAccess) {
      router.replace(`${isBusiness ? '/business' : ''}/password/find`)
    }
  }, [isBusiness, router, searchParams])

  const handleBackButtonClick = () => {
    router.push(`${isBusiness ? '/business' : ''}/sign-in`)
  }

  return (
    <Layout className={css.layout()}>
      <h1 className={css.heading()}>{t('title')}</h1>
      <p className={css.message()}>{t('description')}</p>
      <Button size="large" fullWidth onClick={handleBackButtonClick}>
        {t('button.back-to-sign-in')}
      </Button>
    </Layout>
  )
}
