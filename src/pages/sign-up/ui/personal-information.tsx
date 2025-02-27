import { Heading } from 'shared/ui'

import { PersonalInformationForm } from 'widgets/my-account'

export const PersonalInformation = () => {
  return (
    <div className="mb-10">
      <Heading as="h3" size="medium" className="mb-6">
        Personal information
      </Heading>
      <PersonalInformationForm />
    </div>
  )
}
