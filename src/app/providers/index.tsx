import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

import { MSWProvider } from './msw-provider'
import { QueryProvider } from './query-provider'
import { ToastProvider } from './toast-provider'

type Props = {
  basePath?: string
  children: ReactNode
}

export const AppProviders = ({ basePath, children }: Props) => {
  return (
    <SessionProvider basePath={basePath}>
      <MSWProvider>
        <ToastProvider>
          <QueryProvider>{children}</QueryProvider>
        </ToastProvider>
      </MSWProvider>
    </SessionProvider>
  )
}
