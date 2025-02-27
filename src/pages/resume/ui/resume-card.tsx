'use client'

import { format } from 'date-fns'
import { MouseEvent } from 'react'

import { Card, ResumeSummary } from 'entities/resume'
import { DeleteResumeButton } from 'features/delete-resume'
import {
  DownloadResumeButton,
  DownloadResumeFileButton,
} from 'features/download-resume'
import { colors } from 'shared/config'
import { useDropdown } from 'shared/lib'
import { Dropdown, Icon } from 'shared/ui'

type Props = {
  resume: ResumeSummary
}

export const ResumeCard = ({ resume }: Props) => {
  const { isOpen, toggleIsOpen, dropdownRef } = useDropdown()

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleIsOpen()
  }

  const handleDownloadClick = () => {
    toggleIsOpen()
  }

  const showHeader = !resume.filePath || resume.isRepresentative

  const title = resume.filePath ? resume.fileName : resume.title

  return (
    <Card size="medium" ref={dropdownRef}>
      {showHeader && (
        <Card.Header>
          {!resume.filePath && <Card.PlatformBadge />}
          {resume.isRepresentative && <Card.RepresentativeBadge />}
        </Card.Header>
      )}
      <Card.Title className="text-left">{title}</Card.Title>
      <Card.Footer className="relative">
        <p className="body-medium text-gray-700">
          {format(resume.updatedAt, 'yyyy.MM.dd')}
        </p>
        <button
          type="button"
          onClick={handleMenuClick}
          className="focus:outline focus:outline-[#005fcc]"
        >
          <Icon name="Dot" size="medium" color={colors.gray[700]} />
        </button>
        {isOpen && (
          <Dropdown className="left-[calc(100%-30px)] right-4 w-[210px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
            <Dropdown.Item className="p-0">
              {resume.filePath ? (
                <DownloadResumeFileButton
                  filePath={resume.filePath!}
                  fileName={resume.fileName!}
                />
              ) : (
                <DownloadResumeButton
                  resumeId={resume.id}
                  onClick={handleDownloadClick}
                />
              )}
            </Dropdown.Item>
            <Dropdown.Item>Copy</Dropdown.Item>
            <Dropdown.Item className="p-0">
              <DeleteResumeButton resumeId={resume.id} />
            </Dropdown.Item>
          </Dropdown>
        )}
      </Card.Footer>
    </Card>
  )
}
