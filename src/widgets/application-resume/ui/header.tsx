import { getTranslations } from 'next-intl/server'

import { JobPostRelationDetail } from 'entities/job-post-resume-relation'
import {
  DownloadFileResumeRelationButton,
  DownloadResumeRelationButton,
} from 'features/download-resume'
import { formatDate } from 'shared/lib'

type Props = {
  resumeRelation: JobPostRelationDetail
}

export const Header = async ({ resumeRelation }: Props) => {
  const t = await getTranslations('field')

  const hasFile = resumeRelation.filePath !== null

  return (
    <div className="mb-4">
      <h2 className="title-medium mb-1 font-bold text-gray-900">
        {resumeRelation.jobPostTitle}
      </h2>
      <div className="flex items-center justify-between">
        <p className="title-small font-medium text-gray-700">
          <span>{t('application-date.label')}: </span>
          <span>{formatDate(resumeRelation.submittedDate)}</span>
        </p>
        {hasFile ? (
          <DownloadFileResumeRelationButton resumeRelation={resumeRelation} />
        ) : (
          <DownloadResumeRelationButton resumeRelation={resumeRelation} />
        )}
      </div>
    </div>
  )
}
