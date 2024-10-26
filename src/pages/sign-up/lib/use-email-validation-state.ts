import { useMutationState } from '@tanstack/react-query'

export const useEmailValidationState = () => {
  const requestVerification = useMutationState({
    filters: { mutationKey: ['request-verification'] },
    select: mutation => ({
      isSuccess: mutation.state.status === 'success',
      mutation: mutation,
    }),
  })

  const verifyCode = useMutationState({
    filters: { mutationKey: ['verify-code'] },
    select: mutation => ({
      isSuccess: mutation.state.status === 'success',
    }),
  })

  return {
    isEmailVerificationRequested: requestVerification.at(-1)?.isSuccess,
    isEmailVerificationCompleted: verifyCode.at(-1)?.isSuccess,
  }
}
