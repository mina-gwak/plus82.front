import { getBusinessJobPost } from 'entities/job-post'
import { UpdateJobPostingPage } from 'pages/business-job-posting'

type Params = {
  jobPostId: string
}

const Page = async ({ params }: { params: Promise<Params> }) => {
  const { jobPostId } = await params

  const jobPost = await getBusinessJobPost({ jobPostId: Number(jobPostId) })

  return (
    <UpdateJobPostingPage
      jobPostId={Number(jobPostId)}
      jobPostDetail={jobPost}
    />
  )
}

export default Page
