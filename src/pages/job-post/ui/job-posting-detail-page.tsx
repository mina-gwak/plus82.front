import { isAfter, parseISO } from 'date-fns'

import { auth } from 'auth'
import {
  convertToJobPost,
  getTeacherApplicationStatus,
  PostingDetail,
  PostingImageSwiper,
  PostingTitle,
} from 'entities/job-post'
import { getJobPost } from 'entities/job-post'
import { getResumeCount } from 'entities/resume'
import { ApplyToJobButton } from 'features/apply'
import { colors } from 'shared/config'
import { Layout, Button, Icon } from 'shared/ui'

type Params = {
  jobPostId: string
}

// TODO: 버튼 위치 고민 후 이동
const RegisterResumeButton = () => {
  return (
    <Button as="a" href="/setting/resume" variant="lined" size="large">
      <Icon name="Plus" color={colors.gray[900]} />
      Register Resume
    </Button>
  )
}

type JobPostingButtonProps = {
  isExpired: boolean
  hasApplied: boolean | null
  hasNoResume: boolean
}

const JobPostingButton = ({
  isExpired,
  hasApplied,
  hasNoResume,
}: JobPostingButtonProps) => {
  if (isExpired) {
    return (
      <Button type="button" size="large" disabled>
        Closed
      </Button>
    )
  }

  if (hasApplied) {
    return (
      <Button type="button" size="large" disabled>
        Already Applied
      </Button>
    )
  }

  if (hasNoResume) {
    return <RegisterResumeButton />
  }

  return <ApplyToJobButton />
}

export const JobPostingDetailPage = async ({
  params,
}: {
  params: Promise<Params>
}) => {
  const { jobPostId } = await params

  const session = await auth()

  const resumeCount = await getResumeCount()
  const data = await getJobPost({ jobPostId: Number(jobPostId) })

  let hasApplied = null

  if (session) {
    hasApplied = await getTeacherApplicationStatus({
      jobPostId: Number(jobPostId),
    })
  }

  const hasNoResume = resumeCount === 0

  const jobPost = convertToJobPost(data)

  const isExpired = jobPost.dueDate
    ? isAfter(new Date(), parseISO(jobPost.dueDate))
    : false

  return (
    <Layout wide className="flex gap-5">
      <div className="flex-grow">
        <PostingImageSwiper images={data.academyImageUrls} />
        <PostingDetail jobPost={data} />
      </div>
      <div>
        <div className="sticky top-6 flex w-[340px] flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
          <PostingTitle jobPost={jobPost} size="medium" />
          <JobPostingButton
            isExpired={isExpired}
            hasApplied={hasApplied}
            hasNoResume={hasNoResume}
          />
        </div>
      </div>
    </Layout>
  )
}
