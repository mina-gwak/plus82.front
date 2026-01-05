import { JobPost } from './job-post'

export const convertStudentType = ({
  forKindergarten,
  forElementary,
  forMiddleSchool,
  forHighSchool,
  forAdult,
}: Pick<
  JobPost,
  | 'forKindergarten'
  | 'forElementary'
  | 'forMiddleSchool'
  | 'forHighSchool'
  | 'forAdult'
>) => {
  if (forKindergarten) return 'Kindergarten'
  if (forElementary) return 'Elementary'
  if (forMiddleSchool) return 'MiddleSchool'
  if (forHighSchool) return 'HighSchool'
  if (forAdult) return 'Adult'

  return null
}

export const convertStudentTypeToArray = ({
  forKindergarten,
  forElementary,
  forMiddleSchool,
  forHighSchool,
  forAdult,
  locale,
}: Pick<
  JobPost,
  | 'forKindergarten'
  | 'forElementary'
  | 'forMiddleSchool'
  | 'forHighSchool'
  | 'forAdult'
> & {
  locale?: string
}) => {
  const studentType: string[] = []

  if (forKindergarten)
    studentType.push(locale === 'ko' ? '유치원' : 'Kindergarten')
  if (forElementary)
    studentType.push(locale === 'ko' ? '초등학생' : 'Elementary')
  if (forMiddleSchool)
    studentType.push(locale === 'ko' ? '중학생' : 'MiddleSchool')
  if (forHighSchool)
    studentType.push(locale === 'ko' ? '고등학생' : 'HighSchool')
  if (forAdult) studentType.push(locale === 'ko' ? '성인' : 'Adult')

  return studentType
}
