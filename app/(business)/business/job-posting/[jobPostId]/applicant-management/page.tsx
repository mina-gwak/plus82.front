import { isAfter, parseISO } from 'date-fns'

import { getBusinessJobPost } from 'entities/job-post'
import { JobPostApplicantManagementListPage } from 'pages/business-job-posting'

type Params = {
  jobPostId: string
}

const Page = async ({ params }: { params: Promise<Params> }) => {
  const { jobPostId } = await params

  const jobPost = await getBusinessJobPost({ jobPostId: Number(jobPostId) })

  const isExpired = jobPost.dueDate
    ? isAfter(new Date(), parseISO(jobPost.dueDate))
    : false

  return (
    <JobPostApplicantManagementListPage
      title={jobPost.title}
      jobPostId={Number(jobPostId)}
      isExpired={isExpired}
    />
  )
}

export default Page
