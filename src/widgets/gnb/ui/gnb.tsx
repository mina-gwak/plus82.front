'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import Logo from 'public/images/logo.svg'
import { cn } from 'shared/lib'
import { Button } from 'shared/ui'

import * as Navigation from './navigation'
import { NotificationButton } from './teacher-notification/button'
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
              <Navigation.Item value="/community">
                {t('tab.community')}
              </Navigation.Item>
            </Navigation.Root>
          </div>
          <div className={cn(css.rightSection())}>
            {notAuthenticated ? (
              <div className={cn(css.textButtons())}>
                <Button as="a" href="/sign-in" variant="text" size="small">
                  {t('button.sign-in')}
                </Button>
                <div className={cn(css.divider())} />
                <Button as="a" href="/sign-up" variant="text" size="small">
                  {t('button.sign-up')}
                </Button>
              </div>
            ) : (
              <div className="mr-6 flex items-center gap-4">
                <NotificationButton />
                <UserButton />
              </div>
            )}
            <Button as="a" href="/business" variant="lined" size="small">
              {t('button.go-to-business-home')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
