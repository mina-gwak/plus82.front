import { cn, padNumber } from 'shared/lib'
import { Panel, longDivide } from 'shared/ui'

import { ApplicationStatus, StatusSummary } from '../../model/status'

const getPanels = (summary: StatusSummary) => [
  { status: null, label: 'All', value: summary.total },
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
  active: ApplicationStatus | null
  onClick: (status: ApplicationStatus | null) => void
  summary: StatusSummary
}

export const StatusPanel = ({ active, onClick, summary }: Props) => {
  const panels = getPanels(summary)

  return (
    <div className={cn('grid w-full grid-cols-5', longDivide)}>
      {panels.map(panel => (
        <Panel
          key={panel.status}
          active={active === panel.status}
          onClick={() => onClick(panel.status)}
        >
          <Panel.Label>{panel.label}</Panel.Label>
          <Panel.Value>{padNumber(panel.value)}</Panel.Value>
        </Panel>
      ))}
    </div>
  )
}
