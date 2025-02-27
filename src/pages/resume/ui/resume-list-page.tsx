import Link from 'next/link'

import { Card, getResumes } from 'entities/resume'
import { getUserMe } from 'entities/user'
import { ShowResumeFileButton } from 'features/show-resume-file'
import { colors } from 'shared/config'
import { Icon } from 'shared/ui'

import { ResumeCard } from './resume-card'
import { UploadResume } from './upload-resume'

export const ResumeListPage = async () => {
  const userMe = await getUserMe()
  const { content: resumes } = await getResumes()

  return (
    <div className="py-10 pl-[46px]">
      <h2 className="title-large mb-4 font-bold text-gray-900">
        We support your successful job search, {userMe.firstName}!
      </h2>
      <div className="mb-3 flex gap-3">
        <Link href="/setting/resume/create">
          <Card
            size="medium"
            className="flex flex-col items-center justify-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800">
              <Icon name="Plus" size="large" color={colors.white} />
            </div>
            <p className="title-small text-gray-900">Create Resume</p>
          </Card>
        </Link>
        <UploadResume />
      </div>
      <div className="flex flex-wrap gap-3">
        {resumes.map(resume =>
          resume.filePath ? (
            <ShowResumeFileButton
              fileName={resume.fileName!}
              filePath={resume.filePath}
              key={resume.id}
            >
              <ResumeCard resume={resume} />
            </ShowResumeFileButton>
          ) : (
            <Link href={`/setting/resume/${resume.id}`} key={resume.id}>
              <ResumeCard resume={resume} />
            </Link>
          ),
        )}
      </div>
    </div>
  )
}
