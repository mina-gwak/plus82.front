import { format } from 'date-fns'
import Link from 'next/link'

import { getResumes } from 'entities/resume/api/get-resumes'
import { colors } from 'shared/config'
import { Icon } from 'shared/ui'

const ResumeBoxLink = async () => {
  const resumes = await getResumes()

  const presentativeResume = resumes.content.find(
    resume => resume.isRepresentative,
  )

  if (presentativeResume) {
    return (
      <Link
        href="/setting/resume"
        className="flex h-[110px] flex-col justify-between gap-2 rounded-lg border border-gray-300 p-6"
      >
        <div className="flex gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
            <Icon name="StarFill" size="small" color={colors.blue[800]} />
          </div>
          <p className="title-small text-gray-900">
            {presentativeResume.title}
          </p>
        </div>
        {presentativeResume?.updatedAt && (
          <p className="body-large text-right text-gray-700">
            {format(presentativeResume.updatedAt, 'yyyy.MM.dd')}
          </p>
        )}
      </Link>
    )
  }

  return (
    <Link
      href="/setting/resume"
      className="flex h-[110px] flex-col items-center justify-center gap-2 rounded-lg border border-gray-300"
    >
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-100">
        <Icon name="Plus" size="small" color={colors.gray[500]} />
      </div>
      <p className="body-large text-gray-700">Upload your resume</p>
    </Link>
  )
}

export const UploadResume = () => {
  return (
    <div className="mb-10">
      <h3 className="title-small mb-0.5 text-gray-900">Upload Resume</h3>
      <p className="title-small mb-4 font-normal text-gray-700">
        You can receive job offers through your representative resume
      </p>
      <ResumeBoxLink />
    </div>
  )
}
