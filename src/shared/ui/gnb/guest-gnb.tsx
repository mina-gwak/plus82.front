'use client'

import { useRouter } from 'next/navigation'

import { cn } from 'shared/lib'

import Logo from './assets/Logo.svg'
import * as css from './variants'

export const GuestGNB = () => {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <header className={cn(css.header())}>
      <div className={cn(css.outerWrapper())}>
        <div className={cn(css.innerWrapper())}>
          <div className={cn(css.leftSection())}>
            <Logo onClick={handleLogoClick} />
          </div>
        </div>
      </div>
    </header>
  )
}
