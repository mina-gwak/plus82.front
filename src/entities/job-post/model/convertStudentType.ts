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
}
