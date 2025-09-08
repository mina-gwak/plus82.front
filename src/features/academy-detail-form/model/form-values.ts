/* eslint-disable @typescript-eslint/no-unused-vars */

import { isNil } from 'lodash-es'

import type { AcademyDetail, UpdateAcademyDetail } from 'entities/academy'
import { Location } from 'entities/auth'
import { convertStudentType } from 'entities/job-post'

type Image = {
  imageId: number | null
  image: File | null
  url: string | null
}

export type FormValues = {
  name: string
  nameEn: string
  representativeName: string
  description: string
  studentType: string[] | null
  images: Image[]
  locationType: Location | null
  address: string
  detailedAddress: string
  lat: number | null
  lng: number | null
  businessRegistrationNumber: string
}

export const convertToFormValues = (academyDetail: AcademyDetail) => {
  const images: Image[] = academyDetail.imageList.map(({ id, path }) => ({
    imageId: id,
    image: null,
    url: path,
  }))

  if (images.length < 6) {
    images.push({
      imageId: null,
      image: null,
      url: null,
    })
  }

  return {
    name: academyDetail.name,
    nameEn: academyDetail.nameEn,
    representativeName: academyDetail.representativeName,
    description: academyDetail.description ?? '',
    studentType: convertStudentType({
      forKindergarten: academyDetail.forKindergarten,
      forElementary: academyDetail.forElementary,
      forMiddleSchool: academyDetail.forMiddleSchool,
      forHighSchool: academyDetail.forHighSchool,
      forAdult: academyDetail.forAdult,
    }),
    images,
    locationType: academyDetail.locationType,
    address: academyDetail.address,
    detailedAddress: academyDetail.detailedAddress,
    lat: academyDetail.lat,
    lng: academyDetail.lng,
    businessRegistrationNumber:
      academyDetail.businessRegistrationNumber.replace(
        /(\d{3})(\d{2})(\d{5})/,
        '$1-$2-$3',
      ),
  }
}

export const convertToUpdateAcademyDetail = ({
  studentType,
  lat,
  lng,
  locationType,
  businessRegistrationNumber,
  ...restFormValues
}: FormValues): UpdateAcademyDetail => {
  const [newImages, oldImageIds] = (() => {
    const newImages: File[] = []
    const oldImageIds: string[] = []

    for (const { imageId, image } of restFormValues.images) {
      if (imageId) {
        oldImageIds.push(imageId.toString())
      } else if (image) {
        newImages.push(image!)
      }
    }

    return [newImages, oldImageIds]
  })()

  return {
    ...restFormValues,
    lat: lat!,
    lng: lng!,
    locationType: locationType!,
    newImages,
    oldImageIds: oldImageIds.join(','),
    forKindergarten: studentType?.includes('Kindergarten') ?? false,
    forElementary: studentType?.includes('Elementary') ?? false,
    forMiddleSchool: studentType?.includes('MiddleSchool') ?? false,
    forHighSchool: studentType?.includes('HighSchool') ?? false,
    forAdult: studentType?.includes('Adult') ?? false,
  }
}

export const canRegisterForm = (
  formValues: Pick<
    FormValues,
    | 'representativeName'
    | 'name'
    | 'nameEn'
    | 'address'
    | 'detailedAddress'
    | 'description'
    | 'studentType'
    | 'images'
  >,
) => {
  return (
    formValues.name &&
    formValues.nameEn &&
    formValues.representativeName &&
    formValues.address &&
    formValues.detailedAddress &&
    formValues.description &&
    !isNil(formValues.studentType) &&
    formValues.studentType.length > 0 &&
    formValues.images.filter(({ url, image }) => url || image).length > 0
  )
}
