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
  profileImagePath?: string | null
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

export type RepresentativeResumeSummary = Pick<
  Resume,
  | 'id'
  | 'title'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'hasVisa'
  | 'visaType'
  | 'genderType'
  | 'birthDate'
  | 'createdAt'
  | 'updatedAt'
  | 'countryId'
  | 'countryNameEn'
  | 'forKindergarten'
  | 'forElementary'
  | 'forMiddleSchool'
  | 'forHighSchool'
  | 'forAdult'
> & {
  countryCode: string
  userID: number
}

export type ResumeContactSummary = Pick<
  Resume,
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'degree'
  | 'major'
  | 'genderType'
  | 'birthDate'
  | 'hasVisa'
  | 'visaType'
  | 'forKindergarten'
  | 'forElementary'
  | 'forMiddleSchool'
  | 'forHighSchool'
  | 'forAdult'
  | 'countryId'
  | 'countryNameEn'
  | 'createdAt'
  | 'updatedAt'
> & {
  id: number
  interestReason: string
  appealMessage: string
  additionalMessage: string
  contactEmail: string
  resumeId: number
  resumeTitle: string
  teacherId: number
  academyUserId: number
}

export type RepresentativeResume = Resume & {
  isDraft: boolean
}

export type ResumeContact = Omit<ResumeContactSummary, 'academyUserId'> & {
  personalIntroduction?: string
  residenceCountryCode: string
  residenceCountryCallingCode: string
  countryCode: string
  countryCallingCode: string
  residenceFlag: string
}
