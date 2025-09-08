import { getBusinessUserMe } from 'entities/user'
import { PersonalInformationPage } from 'pages/my-academy'

const Page = async () => {
  const user = await getBusinessUserMe()

  return <PersonalInformationPage user={user} />
}

export default Page
