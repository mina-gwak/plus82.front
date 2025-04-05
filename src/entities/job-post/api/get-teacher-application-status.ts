import { getTeacherSession } from 'entities/auth'
import { apiClient } from 'shared/api'

type GetJobPostRequest = {
  jobPostId: number
}

export const getTeacherApplicationStatus = async ({
  jobPostId,
}: GetJobPostRequest) => {
  const { accessToken } = await getTeacherSession()

  let submitted: boolean

  try {
    await apiClient.get<boolean>({
      endpoint: `/job-posts/${jobPostId}/teacher/submitted-resume`,
      option: {
        authorization: `Bearer ${accessToken}`,
        tags: ['job-post-teacher-application-status'],
      },
    })

    submitted = true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    submitted = false
  }

  return submitted
}
