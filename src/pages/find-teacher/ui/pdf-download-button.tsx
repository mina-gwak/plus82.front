import { JobPostRelationDetail } from 'entities/job-post-resume-relation'
import {
  DownloadFileResumeRelationButton,
  DownloadResumeRelationButton,
} from 'features/download-resume'
import { isNilOrEmptyString } from 'shared/lib'

type Props = {
  resumeRelation: JobPostRelationDetail
}

export const PdfDownloadButton = ({ resumeRelation }: Props) => {
  const hasFile = !isNilOrEmptyString(resumeRelation.filePath)

  console.log(resumeRelation, hasFile)

  return (
    <div className="flex justify-end">
      {hasFile ? (
        <DownloadFileResumeRelationButton resumeRelation={resumeRelation} />
      ) : (
        <DownloadResumeRelationButton resumeRelation={resumeRelation} />
      )}
    </div>
  )
}
