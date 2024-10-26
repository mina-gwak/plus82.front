import { useMutation } from '@tanstack/react-query'

import { signIn } from 'entities/auth'

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  })
}
