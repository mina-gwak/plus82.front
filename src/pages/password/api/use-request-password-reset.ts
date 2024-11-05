import { useMutation } from '@tanstack/react-query'

import { requestPasswordReset } from 'entities/auth'

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: requestPasswordReset,
  })
}
