'use server'

import { getBusinessSession } from 'entities/auth'
import { apiClient } from 'shared/api'

import { JobPostDetail } from '../model/job-post-detail'

type GetJobPostRequest = {
  jobPostId: number
}

type GetJobPostResponse = JobPostDetail

export const getBusinessJobPost = async ({ jobPostId }: GetJobPostRequest) => {
  const { accessToken } = await getBusinessSession()

  const response = await apiClient.get<GetJobPostResponse>({
    endpoint: `/job-posts/${jobPostId}/by-academy`,
    option: {
      authorization: `Bearer ${accessToken}`,
      tags: ['job-post'],
    },
  })

  return response
}
