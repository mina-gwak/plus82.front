import { ApplicationHistory } from './application-history'
import { UploadResume } from './upload-resume'
import { UserProfile } from './user-profile'

export const MyPage = async () => {
  return (
    <div className="w-full py-10 pl-[46px]">
      <UserProfile />
      <UploadResume />
      <ApplicationHistory />
    </div>
  )
}
