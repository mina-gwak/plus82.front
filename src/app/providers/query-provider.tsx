'use client'

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { isNumber } from 'lodash-es'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'

import { deleteCookie } from 'shared/server-lib'

type Props = {
  children: ReactNode
}

export const QueryProvider = ({ children }: Props) => {
  const router = useRouter()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            throwOnError: true,
          },
        },
        queryCache: new QueryCache({
          onError: error => {
            const { code, status } = error

            if (isNumber(code) && status >= 500) {
              return null
            }

            // TODO: Error handling
            if (status === 401) {
              queryClient.removeQueries()
              deleteCookie('accessToken')
              router.push('/sign-in')
            }
          },
        }),
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
