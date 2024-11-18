'use client'

import { useRouter } from 'next/navigation'

import { cn } from 'shared/lib'

import { Button } from '../button'

import Logo from './assets/Logo.svg'
import * as css from './variants'

export const GNB = () => {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <header className={cn(css.header())}>
      <div className={cn(css.outerWrapper())}>
        <div className={cn(css.innerWrapper())}>
          <div className={cn(css.leftSection())} onClick={handleLogoClick}>
            <Logo />
          </div>
          <div className={cn(css.rightSection())}>
            <div className={cn(css.textButtons())}>
              <Button as="a" href="/sign-in" variant="text" size="small">
                Sign In
              </Button>
              <div className={cn(css.divider())} />
              <Button as="a" href="/sign-up" variant="text" size="small">
                Sign Up
              </Button>
            </div>
            <Button variant="lined" size="small">
              Academy
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
