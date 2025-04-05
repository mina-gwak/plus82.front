'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { cn } from 'shared/lib'

import { Button } from '../button'
import { Tabs } from '../tabs'
import Logo from './assets/Logo.svg'
import { BusinessButton } from './business-button'
import { NotificationButton } from './notification'
import * as css from './variants'

export const BusinessGNB = () => {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()

  const t = useTranslations()

  const isDev = process.env.NODE_ENV === 'development'

  const handleLogoClick = () => {
    router.push('/business')
  }

  const handleTabChange = async (value: string) => {
    router.push(value)
  }

  const notAuthenticated = session.status !== 'authenticated'

  return (
    <header className={cn(css.header())}>
      <div className={cn(css.outerWrapper())}>
        <div className={cn(css.innerWrapper())}>
          <div className={cn(css.leftSection())}>
            <Logo onClick={handleLogoClick} />
            {isDev && (
              <Tabs value={pathname ?? '/'} onChange={handleTabChange}>
                <Tabs.Trigger value="/business/find-teacher">
                  {t('tab.find-teacher')}
                </Tabs.Trigger>
                <Tabs.Trigger value="/business/applicant-management">
                  {t('tab.applicant-management')}
                </Tabs.Trigger>
                <Tabs.Trigger value="/business/academy-detail">
                  {t('tab.academy-detail')}
                </Tabs.Trigger>
                <Tabs.Trigger value="/business/job-posting">
                  {t('tab.job-posting')}
                </Tabs.Trigger>
              </Tabs>
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
                    Sign In
                  </Button>
                  <div className={cn(css.divider())} />
                  <Button
                    as="a"
                    href="/business/sign-up"
                    variant="text"
                    size="small"
                  >
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="mr-6 flex items-center gap-4">
                  <NotificationButton />
                  <BusinessButton />
                </div>
              ))}
            <Button as="a" href="/" variant="lined" size="small">
              Academy
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
