import { format } from 'date-fns'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { Card } from 'entities/resume'
import type { ResumeSummary } from 'entities/resume'
import { colors } from 'shared/config'
import { Checkbox, Icon } from 'shared/ui'

type Props = {
  resume: ResumeSummary
  checked: boolean
  onCheckboxChange: (id: number) => void
}

export const ResumeCard = ({
  resume,
  checked,
  onCheckboxChange,
}: PropsWithChildren<Props>) => {
  const handleCheckboxChange = () => {
    onCheckboxChange(resume.id)
  }

  const title = resume.fileName ?? resume.title

  const showPlatformBadge = !(resume.isRepresentative || resume.filePath)

  return (
    <Card size="small">
      <Card.Header>
        <Checkbox checked={checked} onChange={handleCheckboxChange} />
        {showPlatformBadge && <Card.PlatformBadge />}
        {resume.isRepresentative && <Card.RepresentativeBadge />}
      </Card.Header>
      <Card.Title>{title}</Card.Title>
      <Card.Footer>
        <p className="body-medium text-gray-700">
          {format(resume.updatedAt, 'yyyy.MM.dd')}
        </p>
        <Link
          href={`/setting/resume/${resume.id}`}
          target="_blank"
          className="flex items-center"
        >
          <Icon name="ChevronRight" size="medium" color={colors.gray[500]} />
        </Link>
      </Card.Footer>
    </Card>
  )
}
