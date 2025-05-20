import Link from 'next/link'

import {
  ApplicationStatus,
  StatusSummary,
} from 'entities/job-post-resume-relation/model/status'
import { cn, padNumber } from 'shared/lib'
import { Panel, shortDivide } from 'shared/ui'

const getPanels = (summary: StatusSummary) => [
  {
    status: ApplicationStatus.SUBMITTED,
    label: 'Submitted',
    value: summary.submitted,
  },
  {
    status: ApplicationStatus.REVIEWED,
    label: 'Reviewed',
    value: summary.reviewed,
  },
  {
    status: ApplicationStatus.ACCEPTED,
    label: 'Accepted',
    value: summary.accepted,
  },
  {
    status: ApplicationStatus.REJECTED,
    label: 'Rejected',
    value: summary.rejected,
  },
]

type Props = {
  summary: StatusSummary
}

export const HistoryPanel = ({ summary }: Props) => {
  const panels = getPanels(summary)

  return (
    <Link
      href="/setting/my-job-posting"
      className={cn(
        'grid w-full grid-cols-4 rounded-lg border border-gray-300',
        shortDivide,
      )}
    >
      {panels.map(panel => (
        <Panel key={panel.status} active={false}>
          <Panel.Label>{panel.label}</Panel.Label>
          <Panel.Value>{padNumber(panel.value)}</Panel.Value>
        </Panel>
      ))}
    </Link>
  )
}
