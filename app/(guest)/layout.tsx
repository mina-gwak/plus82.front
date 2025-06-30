import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { ReactNode } from 'react'

import { pretendard } from 'app/styles'
import { GoogleAnalytics } from 'shared/config/google-analytics'
import { cn } from 'shared/lib'
import { GuestGNB } from 'widgets/gnb'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Plus82',
  description: '',
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale()

  return (
    <html lang={locale} className={pretendard.className}>
      <body className={cn('font-pretendard', 'flex min-h-dvh w-full flex-col')}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER ? (
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}
          />
        ) : null}
        <NextIntlClientProvider>
          <GuestGNB />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
