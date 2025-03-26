import { apiClient } from 'shared/api'

import { JobPostDetail } from '../model/job-post-detail'

type GetJobPostRequest = {
  jobPostId: number
}

type GetJobPostResponse = JobPostDetail

export const getJobPost = async ({ jobPostId }: GetJobPostRequest) => {
  const response = await apiClient.get<GetJobPostResponse>({
    endpoint: `/job-posts/${jobPostId}`,
    option: {
      tags: ['job-post'],
    },
  })

  return response
}
