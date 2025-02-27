'use client'

import { useMemo } from 'react'

import { Modal } from 'shared/ui'

import { ApplyButton } from './apply-button'
import { CoverLetterForm } from './cover-letter-form'
import { ResumeList } from './resume-list'
import { useCoverLetter } from '../model/use-cover-letter'
import { useSelectResume } from '../model/use-select-resume'

export const ApplyForm = () => {
  const { coverLetter, handleCoverLetterChange } = useCoverLetter()
  const { selectedResumeId, changeSelectedResumeId } = useSelectResume()

  const formValues = useMemo(() => {
    return {
      coverLetter,
      selectedResumeId,
    }
  }, [coverLetter, selectedResumeId])

  return (
    <>
      <Modal.Title className="hidden">Apply to Job</Modal.Title>
      <ResumeList
        selectedResumeId={selectedResumeId}
        onSelect={changeSelectedResumeId}
      />
      <CoverLetterForm
        coverLetter={coverLetter}
        onChange={handleCoverLetterChange}
      />
      <ApplyButton formValues={formValues} />
    </>
  )
}
