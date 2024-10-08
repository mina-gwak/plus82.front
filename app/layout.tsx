import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { AppProviders } from 'app/providers'
import { SpoqaHanSansNeo } from 'app/styles'

import './globals.css'

export const metadata: Metadata = {
  title: 'Plus82',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={SpoqaHanSansNeo.variable}>
      <body className="font-spoqa-han-sans-neo">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
