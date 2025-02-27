'use server'

import { getSession } from 'entities/auth'
import { apiClient, Pagination, PaginationParams } from 'shared/api'

import { JobPostRelation } from '../model/application'
import { ApplicationStatus } from '../model/status'

export type GetJobPostResumeRequest = PaginationParams<{
  status?: ApplicationStatus
}>

type GetJobPostResumeResponse = Pagination<JobPostRelation>

export const getJobPostResumeRelations = async (
  queryParams: GetJobPostResumeRequest,
) => {
  const { accessToken } = await getSession()

  const response = await apiClient.get<GetJobPostResumeResponse>({
    endpoint: '/job-post-resume-relations',
    queryParams,
    option: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
