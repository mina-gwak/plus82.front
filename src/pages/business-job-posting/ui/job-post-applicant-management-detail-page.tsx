import { getBusinessJobPostResumeRelation } from 'entities/job-post-resume-relation'
import { Layout } from 'shared/ui'
import { FileResume, FormResume } from 'widgets/application-resume'

type Params = {
  jobPostResumeRelationId: string
}

export const JobPostApplicantManagementDetailPage = async ({
  params,
}: {
  params: Promise<Params>
}) => {
  const { jobPostResumeRelationId } = await params

  const jobPostResumeRelation = await getBusinessJobPostResumeRelation({
    jobPostResumeRelationId: Number(jobPostResumeRelationId),
  })

  const isFileResume = jobPostResumeRelation.filePath !== null

  return (
    <Layout wide>
      {isFileResume ? (
        <FileResume jobPostResumeRelation={jobPostResumeRelation} />
      ) : (
        <FormResume jobPostResumeRelation={jobPostResumeRelation} />
      )}
    </Layout>
  )
}
