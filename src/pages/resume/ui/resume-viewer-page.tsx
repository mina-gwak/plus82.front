import { getJobPostResumeByCode } from 'entities/job-post-resume-relation'
import { CoverLetter, Resume } from 'features/download-resume'
import { PDFViewer } from 'features/show-resume-file'
import { Layout } from 'shared/ui'

import { convertToResume } from '../model/convert-to-resume'

export const ResumeViewerPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ code: string }>
}) => {
  const { code } = await searchParams

  const jobPostResume = await getJobPostResumeByCode({ code })

  if (jobPostResume.filePath) {
    return (
      <Layout wide>
        <div className="flex flex-col items-center gap-2">
          <PDFViewer
            width={927}
            className="h-fit"
            filePath={jobPostResume.filePath}
          />
          {jobPostResume.coverLetter && (
            <CoverLetter coverLetter={jobPostResume.coverLetter} />
          )}
        </div>
      </Layout>
    )
  }

  return (
    <Layout wide>
      <div className="flex flex-col items-center gap-2">
        <Resume resume={convertToResume(jobPostResume)} />
        {jobPostResume.coverLetter && (
          <CoverLetter coverLetter={jobPostResume.coverLetter} />
        )}
      </div>
    </Layout>
  )
}
