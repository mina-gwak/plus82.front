'use client'

import Link from 'next/link'

import { colors } from 'shared/config'
import { Icon } from 'shared/ui'

import { ResumeCard } from './resume-card'
import { useResumes } from '../api/use-resumes'

type Props = {
  selectedResumeId: number | null
  onSelect: (id: number) => void
}

export const ResumeList = ({ selectedResumeId, onSelect }: Props) => {
  const { resumes } = useResumes()

  return (
    <section>
      <div className="flex h-11 items-center justify-between">
        <h2 className="title-medium font-bold text-gray-900">Resume</h2>
        <Link
          href="/setting/resume"
          target="_blank"
          className="body-large flex items-center font-medium text-gray-700"
        >
          View All
          <Icon
            name="ChevronRight"
            size="medium"
            color={colors.gray[700]}
            className="relative bottom-px"
          />
        </Link>
      </div>
      <div className="w-[678px] overflow-scroll">
        <ul className="flex flex-nowrap gap-3">
          {resumes?.map(resume => (
            <li key={resume.id}>
              <ResumeCard
                resume={resume}
                checked={selectedResumeId === resume.id}
                onCheckboxChange={onSelect}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
