'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { cn } from 'shared/lib'

import { Button } from '../button'
import Logo from './assets/Logo.svg'
import { BusinessButton } from './business-button'
import * as Navigation from './navigation'
import { NotificationButton } from './notification'
import * as css from './variants'

export const BusinessGNB = () => {
  const router = useRouter()
  const session = useSession()

  const t = useTranslations()

  const isDev = process.env.NODE_ENV === 'development'

  const handleLogoClick = () => {
    router.push('/business')
  }

  const notAuthenticated = session.status !== 'authenticated'

  return (
    <header className={cn(css.header())}>
      <div className={cn(css.outerWrapper())}>
        <div className={cn(css.innerWrapper())}>
          <div className={cn(css.leftSection())}>
            <Logo onClick={handleLogoClick} />
            {isDev && (
              <Navigation.Root>
                <Navigation.Item value="/business/find-teacher">
                  {t('tab.find-teacher')}
                </Navigation.Item>
                <Navigation.Item value="/business/applicant-management">
                  {t('tab.applicant-management')}
                </Navigation.Item>
                <Navigation.Item value="/business/academy-detail">
                  {t('tab.academy-detail')}
                </Navigation.Item>
                <Navigation.Item value="/business/job-posting">
                  {t('tab.job-posting')}
                </Navigation.Item>
              </Navigation.Root>
            )}
          </div>
          <div className={cn(css.rightSection())}>
            {isDev &&
              (notAuthenticated ? (
                <div className={cn(css.textButtons())}>
                  <Button
                    as="a"
                    href="/business/sign-in"
                    variant="text"
                    size="small"
                  >
                    {t('button.sign-in')}
                  </Button>
                  <div className={cn(css.divider())} />
                  <Button
                    as="a"
                    href="/business/sign-up"
                    variant="text"
                    size="small"
                  >
                    {t('button.sign-up')}
                  </Button>
                </div>
              ) : (
                <div className="mr-6 flex items-center gap-4">
                  <NotificationButton />
                  <BusinessButton />
                </div>
              ))}
            <Button as="a" href="/" variant="lined" size="small">
              {t('button.go-to-teacher-home')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
