import { ReactNode } from 'react'

import { MSWProvider } from './msw-provider'
import { QueryProvider } from './query-provider'
import { ToastProvider } from './toast-provider'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MSWProvider>
      <ToastProvider>
        <QueryProvider>{children}</QueryProvider>
      </ToastProvider>
    </MSWProvider>
  )
}
