'use client'

import { useTranslations } from 'next-intl'
import { useState, MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { JobPostRelationDetail } from 'entities/job-post-resume-relation'
import { colors } from 'shared/config'
import { Icon } from 'shared/ui'

import { CoverLetter } from './cover-letter'
import { Resume } from './resume'
import { convertToResume } from '../lib/convert-to-resume'
import { downloadPDF, renderToTempContainer } from '../lib/download-pdf'

type Props = {
  resumeRelation: JobPostRelationDetail
}

export const DownloadResumeRelationButton = ({ resumeRelation }: Props) => {
  const t = useTranslations('applicant-management-detail')

  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    setIsLoading(true)

    const elementIds: string[] = ['resume-pdf', 'cover-letter-pdf']
    const containers: HTMLDivElement[] = []

    try {
      // 함수로 분리하여 사용
      containers.push(
        renderToTempContainer(
          elementIds[0],
          <Resume resume={convertToResume(resumeRelation)} />,
        ),
      )
      if (resumeRelation.coverLetter) {
        containers.push(
          renderToTempContainer(
            elementIds[1],
            <CoverLetter coverLetter={resumeRelation.coverLetter} />,
          ),
        )
      }

      await new Promise(resolve => setTimeout(resolve, 100))

      await downloadPDF(elementIds, resumeRelation.resumeTitle)

      containers.forEach(container => document.body.removeChild(container))
    } catch (error) {
      toast.error(t('error.download-resume'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      className="body-large flex gap-0.5 text-gray-700"
    >
      <Icon name="Download" size="medium" color={colors.gray[700]} />
      {isLoading ? t('button.downloading') : t('button.download-as-pdf')}
    </button>
  )
}
