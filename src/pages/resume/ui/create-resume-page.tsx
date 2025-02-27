import { createResume } from 'entities/resume'
import { ResumeForm } from 'features/resume-form'

export const CreateResumePage = () => {
  return <ResumeForm submit={createResume} />
}
