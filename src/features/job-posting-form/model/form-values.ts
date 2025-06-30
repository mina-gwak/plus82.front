import { isValid, parse } from 'date-fns'
import { isArray, isNil } from 'lodash-es'

import { AcademyDetail } from 'entities/academy'
import {
  convertStudentTypeToArray,
  CreateJobPost,
  JobPostDetail,
} from 'entities/job-post'
import { isNilOrEmptyString } from 'shared/lib'

export type FormValues = {
  title: string
  jobDescription: string
  requiredQualification: string
  preferredQualification: string
  benefits: string
  salary: number | null
  salaryNegotiable: string[]
  jobStartDate?: string
  dueDate?: string | null
  noExpirationDate: string[]
  studentType: string[] | null
}

export const defaultValues: FormValues = {
  title: '',
  jobDescription: '',
  requiredQualification: '',
  preferredQualification: '',
  benefits: '',
  salary: null,
  salaryNegotiable: [],
  jobStartDate: undefined,
  dueDate: undefined,
  studentType: null,
  noExpirationDate: [],
}

export const convertToFormValues = (jobPost?: JobPostDetail): FormValues => {
  if (isNil(jobPost)) return defaultValues

  return {
    title: jobPost.title,
    jobDescription: jobPost.jobDescription,
    requiredQualification: jobPost.requiredQualification,
    preferredQualification: jobPost.preferredQualification,
    benefits: jobPost.benefits,
    salary: jobPost.salary,
    salaryNegotiable: jobPost.salaryNegotiable ? ['true'] : [],
    jobStartDate: isNilOrEmptyString(jobPost.jobStartDate)
      ? undefined
      : jobPost.jobStartDate,
    dueDate: isNilOrEmptyString(jobPost.dueDate) ? undefined : jobPost.dueDate,
    noExpirationDate: isNil(jobPost.dueDate) ? ['true'] : [],
    studentType: convertStudentTypeToArray({
      forKindergarten: jobPost.forKindergarten,
      forElementary: jobPost.forElementary,
      forMiddleSchool: jobPost.forMiddleSchool,
      forHighSchool: jobPost.forHighSchool,
      forAdult: jobPost.forAdult,
    }),
  }
}

export const convertToCreateJobPostDTO = ({
  studentType,
  noExpirationDate,
  ...formValues
}: FormValues): CreateJobPost => {
  return {
    ...formValues,
    salary: Number(formValues.salary),
    forKindergarten: studentType?.includes('Kindergarten') ?? false,
    forElementary: studentType?.includes('Elementary') ?? false,
    forMiddleSchool: studentType?.includes('MiddleSchool') ?? false,
    forHighSchool: studentType?.includes('HighSchool') ?? false,
    forAdult: studentType?.includes('Adult') ?? false,
    dueDate: noExpirationDate.includes('true')
      ? null
      : formValues.dueDate || null,
    jobStartDate: formValues.jobStartDate || '',
    salaryNegotiable:
      isArray(formValues.salaryNegotiable) &&
      formValues.salaryNegotiable.includes('true'),
  }
}

export const convertToJobDetail = (
  jobPost: CreateJobPost,
  academy: AcademyDetail,
): JobPostDetail => {
  return {
    ...jobPost,
    academyId: academy.id,
    academyName: academy.name,
    academyNameEn: academy.nameEn,
    academyRepresentativeName: academy.representativeName,
    academyDescription: academy.description,
    academyLocationType: academy.locationType,
    academyAddress: academy.address,
    academyDetailedAddress: academy.detailedAddress,
    lat: academy.lat,
    lng: academy.lng,
    academyImageUrls: academy.imageList.map(image => image.path),
    id: academy.id,
  }
}

export const canRegisterForm = (
  formValues: Pick<
    FormValues,
    | 'title'
    | 'jobDescription'
    | 'salary'
    | 'studentType'
    | 'dueDate'
    | 'noExpirationDate'
  >,
) => {
  const isDateString = (str?: string | null) => {
    if (isNil(str)) return false

    const parsedDate = parse(str, 'yyyy-MM-dd', new Date())

    return isValid(parsedDate)
  }

  return (
    formValues.title &&
    formValues.jobDescription &&
    formValues.salary &&
    !isNil(formValues.studentType) &&
    formValues.studentType.length > 0 &&
    ((formValues.noExpirationDate.includes('true') &&
      isNil(formValues.dueDate)) ||
      isDateString(formValues.dueDate))
  )
}
