import { isNil } from 'lodash-es'

import { convertStudentTypeToArray } from 'entities/job-post'
import { ResumeDTO, Resume } from 'entities/resume'

export type ResumeFormValues = Omit<
  ResumeDTO,
  | 'countryId'
  | 'residenceCountryId'
  | 'birthDate'
  | 'forAdult'
  | 'forKindergarten'
  | 'forElementary'
  | 'forMiddleSchool'
  | 'forHighSchool'
  | 'isRepresentative'
  | 'hasVisa'
> & {
  studentType: string[] | null
  birthDate: string | null
  countryId: number | null
  residenceCountryId: number | null
  isRepresentative: string[] | null
  hasVisa: 'true' | 'false'
}

export const defaultValues: ResumeFormValues = {
  title: '',
  personalIntroduction: '',
  firstName: '',
  lastName: '',
  email: '',
  countryId: null,
  countryNameEn: '',
  residenceCountryId: null,
  residenceCountryNameEn: '',
  degree: '',
  major: '',
  genderType: 'FEMALE',
  birthDate: null,
  hasVisa: 'true',
  visaType: null,
  studentType: [],
  profileImage: null,
  isRepresentative: [] as string[],
}

export const convertToFormValues = (resume?: Resume): ResumeFormValues => {
  if (isNil(resume)) return defaultValues

  return {
    ...resume,
    hasVisa: resume.hasVisa ? 'true' : 'false',
    studentType: convertStudentTypeToArray({
      forKindergarten: resume.forKindergarten,
      forElementary: resume.forElementary,
      forMiddleSchool: resume.forMiddleSchool,
      forHighSchool: resume.forHighSchool,
      forAdult: resume.forAdult,
    }),
    isRepresentative: resume.isRepresentative ? ['true'] : [],
    profileImage: null,
  }
}

export const convertToResumeDTO = ({
  studentType,
  visaType,
  profileImage,
  ...formValues
}: ResumeFormValues): ResumeDTO => {
  return {
    ...formValues,
    forKindergarten: studentType?.includes('Kindergarten') ?? false,
    forElementary: studentType?.includes('Elementary') ?? false,
    forMiddleSchool: studentType?.includes('MiddleSchool') ?? false,
    forHighSchool: studentType?.includes('HighSchool') ?? false,
    forAdult: studentType?.includes('Adult') ?? false,
    birthDate: formValues.birthDate!,
    hasVisa: formValues.hasVisa === 'true',
    isRepresentative: formValues.isRepresentative?.includes('true') ?? false,
    countryId: formValues.countryId!,
    residenceCountryId: formValues.residenceCountryId!,
    ...(profileImage && { profileImage }),
    ...(visaType && { visaType }),
  }
}
