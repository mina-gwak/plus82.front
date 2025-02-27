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
}: Pick<
  JobPost,
  | 'forKindergarten'
  | 'forElementary'
  | 'forMiddleSchool'
  | 'forHighSchool'
  | 'forAdult'
>) => {
  const studentType: string[] = []

  if (forKindergarten) studentType.push('Kindergarten')
  if (forElementary) studentType.push('Elementary')
  if (forMiddleSchool) studentType.push('MiddleSchool')
  if (forHighSchool) studentType.push('HighSchool')
  if (forAdult) studentType.push('Adult')

  return studentType
}
