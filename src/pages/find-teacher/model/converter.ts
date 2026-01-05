import { convertStudentType } from 'entities/job-post'
import {
  ApplicationStatus,
  JobPostRelationDetail,
} from 'entities/job-post-resume-relation'
import { RepresentativeResume, ResumeContact } from 'entities/resume'

import { FormValues } from './form-values'

export const convertToJobPostRelationDetail = (
  resume: RepresentativeResume,
): JobPostRelationDetail => {
  return {
    ...resume,
    coverLetter: '',
    resumeTitle: resume.title,
    academyMemo: '',
    status: ApplicationStatus.SUBMITTED,
    submittedDate: '',
    countryId: resume.countryId,
    countryCode: '',
    countryCallingCode: '',
    countryNameEn: resume.countryNameEn,
    flag: '',
    residenceCountryId: resume.residenceCountryId,
    residenceCountryCode: '',
    residenceCountryCallingCode: '',
    residenceCountryNameEn: resume.residenceCountryNameEn,
    residenceFlag: '',
    userId: 0,
    jobPostId: 0,
    jobPostTitle: '',
  }
}

export const convertResumeContactToJobPostRelationDetail = (
  resumeContact: ResumeContact,
): JobPostRelationDetail => {
  return {
    ...resumeContact,
    coverLetter: '',
    academyMemo: '',
    status: ApplicationStatus.SUBMITTED,
    submittedDate: '',
    flag: '',
    userId: 0,
    jobPostId: 0,
    jobPostTitle: '',
    residenceCountryId: 0,
    residenceCountryNameEn: '',
    filePath: '',
    fileName: '',
    personalIntroduction: resumeContact.personalIntroduction ?? '',
  }
}

export const convertFormValuesToFilter = (values: FormValues) => {
  const genderType = (() => {
    if (values.genderType?.length === 0 || values.genderType?.length === 2) {
      return null
    }

    return values.genderType?.[0] as 'MALE' | 'FEMALE'
  })()

  const age = (() => {
    const [minAge, maxAge] = values.age

    const fromAge = minAge !== 0 ? minAge : null
    const toAge = maxAge !== 50 ? maxAge : null

    return { fromAge, toAge }
  })()

  return {
    genderType,
    ...age,
    visaTypeList: values.visaTypeList ?? [],
    ...(values.studentType?.includes('Kindergarten') && {
      forKindergarten: true,
    }),
    ...(values.studentType?.includes('Elementary') && {
      forElementary: true,
    }),
    ...(values.studentType?.includes('MiddleSchool') && {
      forMiddleSchool: true,
    }),
    ...(values.studentType?.includes('HighSchool') && {
      forHighSchool: true,
    }),
    ...(values.studentType?.includes('Adult') && {
      forAdult: true,
    }),
    countryIdList: values.countryIdList ?? [],
  }
}
