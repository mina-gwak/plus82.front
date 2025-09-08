import { Location } from '../config/location'

export type JobPost = {
  id: number
  title: string
  dueDate: string | null
  academyId: number
  academyName: string
  locationType: Location
  forKindergarten: boolean
  forElementary: boolean
  forMiddleSchool: boolean
  forHighSchool: boolean
  forAdult: boolean
  imageUrls: string[]
}

export type BusinessJobPost = {
  id: number
  title: string
  dueDate: string
  openDate: string
  createdAt: string
  salary: number
  salaryNegotiable?: boolean
  resumeCount: number
}
