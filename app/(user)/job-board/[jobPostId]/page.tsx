import { getNullableTeacherSession } from 'entities/auth'
import { getJobPost, getTeacherApplicationStatus } from 'entities/job-post'
import { getResumeCount } from 'entities/resume'
import { JobPostingDetailPage as _JobPostingDetailPage } from 'pages/job-post'

type Params = {
  jobPostId: string
}

const JobPostingDetailPage = async ({
  params,
}: {
  params: Promise<Params>
}) => {
  const { jobPostId } = await params

  const session = await getNullableTeacherSession()

  const resumeCount = await getResumeCount()
  const jobPostDetail = await getJobPost({ jobPostId: Number(jobPostId) })

  let hasApplied = null

  if (session) {
    hasApplied = await getTeacherApplicationStatus({
      jobPostId: Number(jobPostId),
    })
  }

  const hasNoResume = resumeCount === 0

  return (
    <_JobPostingDetailPage
      jobPostDetail={jobPostDetail}
      hasApplied={hasApplied}
      hasNoResume={hasNoResume}
    />
  )
}

export default JobPostingDetailPage
