import {
  BirthDate,
  FirstName,
  LastName,
  Nationality,
  Gender,
} from 'features/sign-up'

type Props = {
  className?: string
}

export const PersonalInformationForm = ({ className }: Props) => {
  return (
    <div className={className}>
      <FirstName />
      <LastName />
      <Nationality />
      <Gender />
      <BirthDate />
    </div>
  )
}
