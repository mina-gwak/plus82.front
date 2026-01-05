import { getResumeContact } from 'entities/resume'
import { Layout } from 'shared/ui'

import { ContactForm } from './contact-form'
import { FormResume } from './form-resume'
import { convertResumeContactToJobPostRelationDetail } from '../model/converter'

type Params = {
  historyId: string
}

export const HistoryDetailPage = async ({
  params,
}: {
  params: Promise<Params>
}) => {
  const { historyId } = await params

  const resumeContact = await getResumeContact(historyId)

  const jobPostResumeRelation =
    convertResumeContactToJobPostRelationDetail(resumeContact)

  return (
    <Layout wide>
      <FormResume jobPostResumeRelation={jobPostResumeRelation} />

      <div className="pt-20">
        <h2 className="title-large mb-4 font-medium text-gray-900">
          선생님한테 보낸 메시지
        </h2>
        <ContactForm
          defaultValues={{
            interestReason: resumeContact.interestReason,
            appealMessage: resumeContact.appealMessage,
            additionalMessage: resumeContact.additionalMessage,
            contactEmail: resumeContact.contactEmail,
          }}
          teacherName={`${jobPostResumeRelation.firstName} ${jobPostResumeRelation.lastName}`}
          academyName="학원"
          resumeId={resumeContact.resumeId}
          readOnly
        />
      </div>
    </Layout>
  )
}
