'use server'

import { getTeacherSession, getNullableTeacherSession } from 'entities/auth'
import { apiClient, Pagination } from 'shared/api'

import { ResumeSummary } from '../model/resume'

type GetResumesResponse = Pagination<ResumeSummary>

export const getResumes = async () => {
  const { accessToken } = await getTeacherSession()

  const response = await apiClient.get<GetResumesResponse>({
    endpoint: '/resumes/me',
    queryParams: {
      rowCount: 100,
    },
    option: {
      authorization: `Bearer ${accessToken}`,
      tags: ['resumes'],
    },
  })

  return response
}

export const getResumeCount = async () => {
  const session = await getNullableTeacherSession()

  if (!session) {
    return null
  }

  const response = await apiClient.get<GetResumesResponse>({
    endpoint: '/resumes/me',
    queryParams: {
      rowCount: 100,
    },
    option: {
      authorization: `Bearer ${session.accessToken}`,
      tags: ['resumes'],
    },
  })

  return response.numberOfElements
}
