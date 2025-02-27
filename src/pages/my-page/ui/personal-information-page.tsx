import { getUserMe } from 'entities/user'

import { PersonalInformationContent } from './personal-information-content'

export const PersonalInformationPage = async () => {
  const user = await getUserMe()

  return (
    <div className="flex flex-grow justify-center p-10">
      <PersonalInformationContent user={user} />
    </div>
  )
}
