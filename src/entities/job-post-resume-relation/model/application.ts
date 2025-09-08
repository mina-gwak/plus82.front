import { ApplicationStatus } from './status'

export type JobPostRelation = {
  id: number
  coverLetter: string
  status: ApplicationStatus
  submittedDate: string
  resumeTitle: string
  resumeFirstName: string
  resumeLastName: string
  jobPostId: number
  jobPostTitle: string
  academyId: number
  academyName: string
  academyMemo: string | null
  countryNameEn: string
}

export type JobPostRelationDetail = {
  id: number
  coverLetter: string
  status: ApplicationStatus
  submittedDate: string
  academyMemo: string | null
  resumeTitle: string
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
  forKindergarten: boolean
  forElementary: boolean
  forMiddleSchool: boolean
  forHighSchool: boolean
  forAdult: boolean
  countryId: number
  countryNameEn: string
  countryCode: string
  countryCallingCode: string
  flag: string
  residenceCountryId: number
  residenceCountryNameEn: string
  residenceCountryCode: string
  residenceCountryCallingCode: string
  residenceFlag: string
  userId: number
  profileImagePath?: string | null
  jobPostId: number
  jobPostTitle: string
  filePath: string | null
  fileName: string | null
}
