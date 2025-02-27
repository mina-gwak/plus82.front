'use server'

import { getSession } from 'entities/auth'
import { apiClient } from 'shared/api'

import { Resume } from '../model/resume'

type GetResumeResponse = Resume

export const getResume = async (resumeId: string) => {
  const { accessToken } = await getSession()

  const response = await apiClient.get<GetResumeResponse>({
    endpoint: `/resumes/${resumeId}`,
    option: {
      authorization: `Bearer ${accessToken}`,
      tags: ['resume'],
    },
  })

  return response
}
