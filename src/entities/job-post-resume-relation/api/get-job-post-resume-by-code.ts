'use server'

import { apiClient } from 'shared/api'

import { JobPostRelationDetail } from '../model/application'

export type GetJobPostResumeRequest = {
  code: string
}

type GetJobPostResumeResponse = JobPostRelationDetail

export const getJobPostResumeByCode = async (
  queryParams: GetJobPostResumeRequest,
) => {
  const response = await apiClient.get<GetJobPostResumeResponse>({
    endpoint: '/job-post-resume-relations/by-code',
    queryParams,
  })

  return response
}
