import { createResume } from 'entities/resume'
import { getUserMe } from 'entities/user'
import { ResumeForm } from 'features/resume-form'

export const CreateResumePage = async () => {
  const user = await getUserMe()

  return (
    <ResumeForm
      userProfileImage={user.profileImagePath}
      submit={createResume}
    />
  )
}
