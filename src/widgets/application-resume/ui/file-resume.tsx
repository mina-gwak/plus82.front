import { JobPostRelationDetail } from 'entities/job-post-resume-relation'
import { ApplicationSidePanel } from 'features/application-side-panel'
import { PDFViewer } from 'features/show-resume-file'

import { CoverLetter } from './cover-letter'
import { Header } from './header'

export const FileResume = ({
  jobPostResumeRelation,
}: {
  jobPostResumeRelation: JobPostRelationDetail
}) => {
  return (
    <div className="flex gap-5">
      <div className="flex-grow">
        <Header resumeRelation={jobPostResumeRelation} />
        <PDFViewer
          filePath={jobPostResumeRelation.filePath!}
          className="mb-8 h-fit"
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
  )
}
