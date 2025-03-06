'use server'

import { getSession } from 'entities/auth'
import {
  apiClient,
  ContentType,
  HttpError,
  ResumeExceptionCode,
  ResourceNotFoundExceptionCode,
} from 'shared/api'

import { ResumeDTO } from '../model/resume'

type UpdateResumeRequest = ResumeDTO

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  if (error.code === ResourceNotFoundExceptionCode.RESUME_NOT_FOUND) {
    return {
      type: 'toast',
      message: 'Resume is not found',
    }
  } else if (error.code === ResumeExceptionCode.REPRESENTATIVE_RESUME_EXISTS) {
    return {
      type: 'toast',
      message: 'You can only have one representative resume',
    }
  } else if (
    error.code === ResumeExceptionCode.FILE_RESUME_CANNOT_BE_MODIFIED
  ) {
    return {
      type: 'toast',
      message: 'File resume cannot be modified',
    }
  } else {
    return {
      type: 'toast',
      message: error.message || 'An error occurred while updating resume',
    }
  }
}

export const updateResume = async ({
  resumeId,
  ...data
}: UpdateResumeRequest) => {
  const { accessToken } = await getSession()

  try {
    await apiClient.put<null, ResumeDTO>({
      endpoint: `/resumes/${resumeId}`,
      option: {
        contentType: ContentType.MULTIPART,
        authorization: `Bearer ${accessToken}`,
      },
      body: data,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
