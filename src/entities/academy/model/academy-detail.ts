import { Location } from 'entities/job-post'

export type AcademyDetail = {
  id: number
  name: string
  nameEn: string
  representativeName: string
  representativeEmail: string
  description: string
  businessRegistrationNumber: string
  locationType: Location
  address: string
  detailedAddress: string
  lat: number
  lng: number
  forKindergarten: boolean
  forElementary: boolean
  forMiddleSchool: boolean
  forHighSchool: boolean
  forAdult: boolean
  imageList: {
    id: number
    path: string
  }[]
}

export type UpdateAcademyDetail = Omit<
  AcademyDetail,
  'id' | 'imageList' | 'businessRegistrationNumber' | 'representativeEmail'
> & {
  newImages: File[]
  oldImageIds: string
}
