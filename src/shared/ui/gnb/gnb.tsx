'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { cn } from 'shared/lib'

import { Button } from '../button'
import Logo from './assets/Logo.svg'
import * as Navigation from './navigation'
import { NotificationButton } from './notification'
import { UserButton } from './user-button'
import * as css from './variants'

export const GNB = () => {
  const router = useRouter()
  const session = useSession()

  const t = useTranslations()

  const handleLogoClick = () => {
    router.push('/')
  }

  const notAuthenticated = session.status !== 'authenticated'

  return (
    <header className={cn(css.header())}>
      <div className={cn(css.outerWrapper())}>
        <div className={cn(css.innerWrapper())}>
          <div className={cn(css.leftSection())}>
            <Logo onClick={handleLogoClick} />
            <Navigation.Root>
              <Navigation.Item value="/job-board">
                {t('tab.job-board')}
              </Navigation.Item>
            </Navigation.Root>
          </div>
          <div className={cn(css.rightSection())}>
            {notAuthenticated ? (
              <div className={cn(css.textButtons())}>
                <Button as="a" href="/sign-in" variant="text" size="small">
                  Sign In
                </Button>
                <div className={cn(css.divider())} />
                <Button as="a" href="/sign-up" variant="text" size="small">
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="mr-6 flex items-center gap-4">
                <NotificationButton />
                <UserButton />
              </div>
            )}
            <Button as="a" href="/business" variant="lined" size="small">
              Academy
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
