import type { JobPostRelationDetail } from 'entities/job-post-resume-relation'
import type { Resume } from 'entities/resume'

export const convertToResume = (data: JobPostRelationDetail): Resume => {
  return {
    id: data.id,
    title: data.jobPostTitle,
    personalIntroduction: data.personalIntroduction,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    degree: data.degree,
    major: data.major,
    genderType: data.genderType,
    birthDate: data.birthDate,
    hasVisa: data.hasVisa,
    visaType: data.visaType,
    isRepresentative: false,
    forKindergarten: data.forKindergarten,
    forElementary: data.forElementary,
    forMiddleSchool: data.forMiddleSchool,
    forHighSchool: data.forHighSchool,
    forAdult: data.forAdult,
    countryId: data.countryId,
    countryNameEn: data.countryNameEn,
    residenceCountryId: data.residenceCountryId,
    residenceCountryNameEn: data.residenceCountryNameEn,
    createdAt: '',
    updatedAt: '',
    profileImagePath: data.profileImagePath,
    filePath: data.filePath,
    fileName: data.fileName,
  }
}
