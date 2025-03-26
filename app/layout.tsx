import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { ReactNode } from 'react'

import { AppProviders } from 'app/providers'
import { SpoqaHanSansNeo } from 'app/styles'
import { cn } from 'shared/lib'
import { GNB } from 'shared/ui'

import './globals.css'

export const metadata: Metadata = {
  title: 'Plus82',
  description: '',
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale()

  return (
    <html lang={locale} className={SpoqaHanSansNeo.variable}>
      <body
        className={cn(
          'font-spoqa-han-sans-neo',
          'flex min-h-dvh w-full flex-col',
        )}
      >
        <NextIntlClientProvider>
          <AppProviders>
            <GNB />
            {children}
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
