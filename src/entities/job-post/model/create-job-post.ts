export type CreateJobPost = {
  title: string
  jobDescription: string
  requiredQualification: string
  preferredQualification: string
  benefits: string
  salary: number
  salaryNegotiable: boolean
  jobStartDate: string
  dueDate: string | null
  forKindergarten: boolean
  forElementary: boolean
  forMiddleSchool: boolean
  forHighSchool: boolean
  forAdult: boolean
}
