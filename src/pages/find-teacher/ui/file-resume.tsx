import { JobPostRelationDetail } from 'entities/job-post-resume-relation'
import { PDFViewer } from 'features/show-resume-file'

import { PdfDownloadButton } from './pdf-download-button'

export const FileResume = ({
  jobPostResumeRelation,
}: {
  jobPostResumeRelation: JobPostRelationDetail
}) => {
  return (
    <div>
      <PdfDownloadButton resumeRelation={jobPostResumeRelation} />
      <PDFViewer
        filePath={jobPostResumeRelation.filePath!}
        className="mb-8 h-fit"
      />
    </div>
  )
}
