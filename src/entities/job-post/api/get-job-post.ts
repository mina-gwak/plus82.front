import { apiClient } from 'shared/api'

import { JobPostDetail } from '../model/job-post-detail'

type GetJobPostRequest = {
  jobPostId: number
}

type GetJobPostResponse = JobPostDetail

export const getJobPost = async ({ jobPostId }: GetJobPostRequest) => {
  const response = await apiClient.get<GetJobPostResponse>(
    `/job-posts/${jobPostId}`,
  )

  return response
}
