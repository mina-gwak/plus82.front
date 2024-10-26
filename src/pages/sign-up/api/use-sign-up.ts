import { useMutation } from '@tanstack/react-query'

import { signUp } from 'entities/auth'

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  })
}
