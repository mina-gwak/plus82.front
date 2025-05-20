import { JobPostRelationDetail } from 'entities/job-post-resume-relation'
import { ApplicationSidePanel } from 'features/application-side-panel'

import { CoverLetter } from './cover-letter'
import { Header } from './header'
import { Introduction } from './introduction'
import { PersonalInformation } from './personal-information'

type Props = {
  jobPostResumeRelation: JobPostRelationDetail
}

export const FormResume = ({ jobPostResumeRelation }: Props) => {
  return (
    <>
      <Header resumeRelation={jobPostResumeRelation} />
      <div className="space-y-8">
        <PersonalInformation jobPostResumeRelation={jobPostResumeRelation} />
        <div className="flex gap-5">
          <div className="flex-grow space-y-8">
            <Introduction
              personalIntroduction={jobPostResumeRelation.personalIntroduction}
            />

            {jobPostResumeRelation.coverLetter && (
              <CoverLetter coverLetter={jobPostResumeRelation.coverLetter} />
            )}
          </div>
          <ApplicationSidePanel
            values={{
              status: jobPostResumeRelation.status,
              memo: jobPostResumeRelation.academyMemo ?? '',
            }}
          />
        </div>
      </div>
    </>
  )
}
