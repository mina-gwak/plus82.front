import { getAcademyMe } from 'entities/academy'
import { getRepresentativeResume } from 'entities/resume'
import { Layout } from 'shared/ui'

import { ContactButton } from './contact-button'
import { FormResume } from './form-resume'
import { convertToJobPostRelationDetail } from '../model/converter'

type Params = {
  resumeId: string
}

export const ResumeDetailPage = async ({
  params,
}: {
  params: Promise<Params>
}) => {
  const { resumeId } = await params

  const resume = await getRepresentativeResume(resumeId)
  const academyDetail = await getAcademyMe()

  const jobPostRelationDetail = convertToJobPostRelationDetail(resume)

  return (
    <Layout wide>
      <FormResume jobPostResumeRelation={jobPostRelationDetail} />
      <ContactButton
        teacherName={`${resume.firstName} ${resume.lastName}`}
        academyName={academyDetail.nameEn}
        academyEmail={academyDetail.representativeEmail}
        resumeId={resume.id}
      />
    </Layout>
  )
}
