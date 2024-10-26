import { useMutation } from '@tanstack/react-query'

import { requestVerification } from 'entities/auth'

export const useRequestVerification = () => {
  return useMutation({
    mutationKey: ['request-verification'],
    mutationFn: requestVerification,
  })
}
