import { Location } from 'entities/job-post'

export type AcademyDetail = {
  id: number
  name: string
  nameEn: string
  representativeName: string
  description: string
  businessRegistrationNumber: string
  locationType: Location
  detailedAddress: string
  lat: number
  lng: number
  forKindergarten: boolean
  forElementary: boolean
  forMiddleSchool: boolean
  forHighSchool: boolean
  forAdult: boolean
  imageUrls: string[]
}
