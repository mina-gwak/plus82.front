import { getResume } from 'entities/resume'
import { updateResume } from 'entities/resume/api/update-resume'
import { ResumeForm } from 'features/resume-form'
import { PDFViewer } from 'features/show-resume-file'
import { Layout } from 'shared/ui'

type Params = {
  resumeId: string
}

export const UpdateResumePage = async ({
  params,
}: {
  params: Promise<Params>
}) => {
  const { resumeId } = await params

  const resume = await getResume(resumeId)

  if (resume.filePath) {
    return (
      <Layout wide>
        <PDFViewer filePath={resume.filePath} />
      </Layout>
    )
  }

  return <ResumeForm resume={resume} submit={updateResume} />
}
