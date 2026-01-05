import { JobPostRelationDetail } from 'entities/job-post-resume-relation'
import {
  CoverLetter,
  Introduction,
  PersonalInformation,
} from 'widgets/application-resume'

import { PdfDownloadButton } from './pdf-download-button'

type Props = {
  jobPostResumeRelation: JobPostRelationDetail
}

export const FormResume = ({ jobPostResumeRelation }: Props) => {
  return (
    <>
      <PdfDownloadButton resumeRelation={jobPostResumeRelation} />
      <div className="space-y-8">
        <PersonalInformation jobPostResumeRelation={jobPostResumeRelation} />
        <div className="flex-grow space-y-8">
          <Introduction
            personalIntroduction={jobPostResumeRelation.personalIntroduction}
          />

          {jobPostResumeRelation.coverLetter && (
            <CoverLetter coverLetter={jobPostResumeRelation.coverLetter} />
          )}
        </div>
      </div>
    </>
  )
}
