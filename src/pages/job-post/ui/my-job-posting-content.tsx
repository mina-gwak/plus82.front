'use client'

import { useState } from 'react'

import {
  ApplicationTable,
  StatusPanel,
  ApplicationStatus,
  StatusSummary,
} from 'entities/job-post-resume-relation'

import { useJobPostRelations } from '../api/use-job-post-relations'

type Props = {
  summary: StatusSummary
}

const MyJobPostingContent = ({ summary }: Props) => {
  const [activePanel, setActivePanel] = useState<ApplicationStatus | null>(null)

  const { applications } = useJobPostRelations(activePanel)

  const changeActivePanel = (status: ApplicationStatus | null) => {
    setActivePanel(status)
  }

  return (
    <>
      <StatusPanel
        active={activePanel}
        onClick={changeActivePanel}
        summary={summary}
      />
      <ApplicationTable applications={applications} />
    </>
  )
}

export default MyJobPostingContent
