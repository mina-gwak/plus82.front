import { useSuspenseQuery } from '@tanstack/react-query'

import { authQueries } from 'entities/auth'

export const useCheckCodeValidity = (code: string | null) => {
  return useSuspenseQuery({
    ...authQueries.validate({ code }),
    retry: false,
  })
}
