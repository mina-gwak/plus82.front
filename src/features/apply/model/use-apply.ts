import { toast } from 'react-toastify'

import { submitResume } from 'entities/job-post'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { useModalContext } from 'shared/ui'

export const useApply = () => {
  const { changeOpen } = useModalContext()

  const { handleServerError } = useServerErrorHandler()

  const handleSuccess = () => {
    if (changeOpen) {
      changeOpen(false)
      toast.success('Your application has been received')
    }
  }

  const apply = async (formValues: {
    jobPostId: number
    resumeId: number
    coverLetter: string
  }) => {
    const response = await submitResume(formValues)

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSuccess()
    }
  }

  return { apply }
}
