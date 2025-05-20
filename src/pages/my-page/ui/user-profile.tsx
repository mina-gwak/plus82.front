import { getUserMe } from 'entities/user'
import { colors } from 'shared/config'
import { Icon } from 'shared/ui'

import { UserImage } from './user-image'

export const UserProfile = async () => {
  const user = await getUserMe()

  return (
    <div className="mb-10 flex gap-6 border-b border-gray-300 pb-4">
      <UserImage
        src={user?.profileImagePath}
        alt={`${user.firstName} ${user.lastName} profile image`}
      />
      <div>
        <h2 className="title-large mb-2 font-bold text-gray-900">{`${user.firstName} ${user.lastName}`}</h2>
        <div className="body-large mb-1 flex items-center gap-1 font-normal text-gray-700">
          <Icon name="Message" size="large" color={colors.gray[500]} />
          <span>{user.email}</span>
        </div>
        <div className="body-large flex items-center gap-1 font-normal text-gray-700">
          <Icon name="Earth" size="large" color={colors.gray[500]} />
          <span>{`(+${user.countryCallingCode}) ${user.countryNameEn}`}</span>
        </div>
      </div>
    </div>
  )
}
