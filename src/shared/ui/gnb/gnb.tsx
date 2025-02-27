'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { cn } from 'shared/lib'

import { Button } from '../button'
import { Tabs } from '../tabs'
import Logo from './assets/Logo.svg'
import * as css from './variants'
import { Icon } from '../icon'
import { UserButton } from './user-button'

export const GNB = () => {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()

  const handleLogoClick = () => {
    router.push('/')
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
            <Tabs value={pathname ?? '/'} onChange={handleTabChange}>
              <Tabs.Trigger value="/job-board">Job Board</Tabs.Trigger>
            </Tabs>
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
                <button>
                  <Icon name="Bell" size="large" />
                </button>
                <UserButton />
              </div>
            )}
            <Button variant="lined" size="small">
              Academy
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
