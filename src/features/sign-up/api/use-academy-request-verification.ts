import { useMutation } from '@tanstack/react-query'

import { academyRequestVerification } from 'entities/auth'

export const useAcademyRequestVerification = () => {
  return useMutation({
    mutationKey: ['academy-request-verification'],
    mutationFn: academyRequestVerification,
  })
}
