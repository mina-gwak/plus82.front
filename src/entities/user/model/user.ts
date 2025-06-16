export type User = {
  id: number
  firstName: string
  lastName: string
  fullName?: string
  genderType: 'MALE' | 'FEMALE'
  birthDate: string
  email: string
  countryId: number
  countryNameEn: string
  countryCode: string
  countryCallingCode: string
  flag: string
  profileImagePath: string | null
}
