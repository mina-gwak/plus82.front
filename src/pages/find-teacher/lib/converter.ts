import { convertStudentTypeToArray } from 'entities/job-post'

export const convertVisaType = (visaType?: 'E2' | 'OTHERS' | null) => {
  if (visaType === 'E2') {
    return 'E2'
  }

  if (visaType === 'OTHERS') {
    return '기타'
  }

  return '비자 없음'
}

export const convertStudentType = ({
  forKindergarten,
  forElementary,
  forMiddleSchool,
  forHighSchool,
  forAdult,
}: {
  forKindergarten: boolean
  forElementary: boolean
  forMiddleSchool: boolean
  forHighSchool: boolean
  forAdult: boolean
}) => {
  const studentType = convertStudentTypeToArray({
    forKindergarten,
    forElementary,
    forMiddleSchool,
    forHighSchool,
    forAdult,
    locale: 'ko',
  })

  const hasMultipleStudentType = studentType.length > 1
  const hasAllStudentType = studentType.length === 5

  if (hasAllStudentType) {
    return '모두'
  }

  if (hasMultipleStudentType) {
    return `${studentType[0]} 외 ${studentType.length - 1}`
  }

  return studentType[0]
}
