import { getSession } from 'entities/auth'
import { apiClient } from 'shared/api'

type GetJobPostRequest = {
  jobPostId: number
}

export const getTeacherApplicationStatus = async ({
  jobPostId,
}: GetJobPostRequest) => {
  const { accessToken } = await getSession()

  let submitted = false

  try {
    await apiClient.get<boolean>({
      endpoint: `/job-posts/${jobPostId}/teacher/submitted-resume`,
      option: {
        authorization: `Bearer ${accessToken}`,
        tags: ['job-post-teacher-application-status'],
      },
    })

    submitted = true
  } catch (error) {
    console.log(error)
  }

  return submitted
}
