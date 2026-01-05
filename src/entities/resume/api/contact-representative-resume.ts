'use server'

import { getBusinessSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

export type ContactRepresentativeResumeRequest = {
  interestReason: string
  appealMessage: string
  additionalMessage: string
  contactEmail: string
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('선생님에게 메시지 보내는 중 오류가 발생했습니다', {
    error,
  })
}

export const contactRepresentativeResume = async ({
  resumeId,
  ...data
}: ContactRepresentativeResumeRequest & { resumeId: number }) => {
  const { accessToken } = await getBusinessSession()

  try {
    const response = await apiClient.post<
      null,
      ContactRepresentativeResumeRequest
    >({
      endpoint: `/resumes/representatives/${resumeId}/contact`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: data,
    })

    return response
  } catch (error) {
    return handleError(error as Error)
  }
}
