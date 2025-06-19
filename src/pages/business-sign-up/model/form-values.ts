import { AcademySignUpRequest, Location } from 'entities/auth'

export type FormValues = {
  email: string
  code: string
  password: string
  confirmPassword: string
  fullName: string
  genderType: 'FEMALE' | 'MALE'
  birthDate: string | null
  representativeName: string
  academyName: string
  academyNameEn: string
  locationType: Location | null
  address: string
  detailedAddress: string
  lat: number | null
  lng: number | null
  businessRegistrationNumber: string
}

export const defaultValues: FormValues = {
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  genderType: 'FEMALE',
  birthDate: null,
  representativeName: '',
  academyName: '',
  academyNameEn: '',
  locationType: null,
  address: '',
  detailedAddress: '',
  lat: null,
  lng: null,
  businessRegistrationNumber: '',
}

export const convertToAcademySignUpDTO = ({
  code,
  confirmPassword,
  ...restFormValues
}: FormValues): AcademySignUpRequest => {
  return {
    ...restFormValues,
    birthDate: restFormValues.birthDate!,
    locationType: restFormValues.locationType!,
    lat: restFormValues.lat!,
    lng: restFormValues.lng!,
  }
}
