'use server'

import { redirect } from 'next/navigation'

import {
  apiClient,
  ContentType,
  HttpError,
  ResumeExceptionCode,
} from 'shared/api'
import { getCookie } from 'shared/server-lib'

import { CreateResume } from '../model/resume'

type CreateResumeRequest = CreateResume

const handleSuccess = () => {
  redirect('/setting/resume')
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  if (error.code === ResumeExceptionCode.REPRESENTATIVE_RESUME_EXISTS) {
    return {
      type: 'toast',
      message: 'You can only have one representative resume',
    }
  }

  return {
    type: 'toast',
    message: error.message || 'An error occurred while uploading resume file',
  }
}

export const createResume = async (data: CreateResumeRequest) => {
  const accessToken = await getCookie('accessToken')

  try {
    await apiClient.post<null, CreateResumeRequest>({
      endpoint: '/resumes',
      option: {
        contentType: ContentType.MULTIPART,
        authorization: `Bearer ${accessToken}`,
      },
      body: data,
    })

    handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
