import { differenceInDays, format } from 'date-fns'
import { lowerCase } from 'lodash-es'
import { useTranslations } from 'next-intl'

import { colors } from 'shared/config'
import { cn, isNilOrEmptyString } from 'shared/lib'
import { Icon } from 'shared/ui'

import * as css from './variants'
import { convertStudentTypeToArray } from '../../model/convert-to-student-type'
import { JobPost } from '../../model/job-post'

type Props = {
  jobPost: JobPost
  size: 'small' | 'medium'
}

export const PostingTitle = ({ jobPost, size }: Props) => {
  const t = useTranslations()

  const studentType = convertStudentTypeToArray({
    forKindergarten: jobPost.forKindergarten,
    forElementary: jobPost.forElementary,
    forMiddleSchool: jobPost.forMiddleSchool,
    forHighSchool: jobPost.forHighSchool,
    forAdult: jobPost.forAdult,
  })

  const hasMultipleStudentType = studentType.length > 1
  const hasAllStudentType = studentType.length === 5

  return (
    <div className={cn(css.container({ size }))}>
      <div className="flex flex-col gap-0.5">
        <h3 className={cn(css.title({ size }))}>{jobPost.title}</h3>
        <p className={cn(css.academyName({ size }))}>{jobPost.academyName}</p>
      </div>
      <ul className="flex flex-col gap-1">
        <li className={cn(css.description({ size }))}>
          <Icon name="LocationFilled" color={colors.gray[500]} size={size} />
          <span>
            {t(`field.location.option.${lowerCase(jobPost.locationType)}`)}
          </span>
        </li>
        <li className={cn(css.description({ size }))}>
          <Icon name="User" color={colors.gray[500]} size={size} />
          <span>
            {(() => {
              if (hasAllStudentType) {
                return 'All'
              }

              if (hasMultipleStudentType) {
                return `${studentType[0]} and Others`
              }

              return studentType[0]
            })()}
          </span>
        </li>
        <li className={cn(css.description({ size }))}>
          <Icon name="Date" color={colors.gray[500]} size={size} />
          <span>
            {(() => {
              if (isNilOrEmptyString(jobPost.dueDate)) {
                return 'Ongoing Recruitment'
              }

              const dueDate = new Date(jobPost.dueDate).setHours(0, 0, 0, 0)
              const today = new Date().setHours(0, 0, 0, 0)
              const diffDays = differenceInDays(dueDate, today)

              if (diffDays >= 8) {
                return `~${format(dueDate, 'yyyy.MM.dd')}`
              }

              if (diffDays <= 7 && diffDays > 0) {
                return `D-${diffDays}`
              }

              if (diffDays === 0) {
                return 'Ends Today'
              }

              return 'Closed'
            })()}
          </span>
        </li>
      </ul>
    </div>
  )
}
