export type Resume = {
  id: number
  title: string
  personalIntroduction: string
  firstName: string
  lastName: string
  email: string
  degree: string
  major: string
  genderType: 'MALE' | 'FEMALE'
  birthDate: string
  hasVisa: boolean
  visaType?: 'E2' | 'OTHERS' | null
  isRepresentative: boolean
  forKindergarten: boolean
  forElementary: boolean
  forMiddleSchool: boolean
  forHighSchool: boolean
  forAdult: boolean
  countryId: number
  countryNameEn: string
  residenceCountryId: number
  residenceCountryNameEn: string
  createdAt: string
  updatedAt: string
  profileImagePath?: string
  filePath: string | null
  fileName: string | null
}

export type ResumeDTO = Omit<
  Resume,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'profileImagePath'
  | 'filePath'
  | 'fileName'
> & {
  profileImage?: File | null
  resumeId?: number
}

export type ResumeSummary = Omit<
  Resume,
  | 'countryId'
  | 'residenceCountryId'
  | 'forKindergarten'
  | 'forElementary'
  | 'forMiddleSchool'
  | 'forHighSchool'
  | 'forAdult'
  | 'profileImagePath'
  | 'birthDate'
  | 'genderType'
  | 'degree'
  | 'major'
  | 'personalIntroduction'
> & {
  id: number
}
