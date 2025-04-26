'use server'

import { getBusinessSession } from 'entities/auth'
import { apiClient } from 'shared/api'

import { JobPostRelationDetail } from '../model/application'

export type GetJobPostResumeRequest = {
  jobPostResumeRelationId: number
}

type GetJobPostResumeResponse = JobPostRelationDetail

export const getBusinessJobPostResumeRelation = async ({
  jobPostResumeRelationId,
}: GetJobPostResumeRequest) => {
  const { accessToken } = await getBusinessSession()

  const response = await apiClient.get<GetJobPostResumeResponse>({
    endpoint: `/job-post-resume-relations/${jobPostResumeRelationId}`,
    option: {
      authorization: `Bearer ${accessToken}`,
      tags: ['job-post-resume-relation'],
    },
  })

  return response
}
