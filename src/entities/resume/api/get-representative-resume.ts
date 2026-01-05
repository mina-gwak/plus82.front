'use server'

import { getBusinessSession } from 'entities/auth'
import { apiClient } from 'shared/api'

import { RepresentativeResume } from '../model/resume'

type GetRepresentativeResumeResponse = RepresentativeResume

export const getRepresentativeResume = async (resumeId: string) => {
  const { accessToken } = await getBusinessSession()

  const response = await apiClient.get<GetRepresentativeResumeResponse>({
    endpoint: `/resumes/representatives/${resumeId}`,
    option: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
