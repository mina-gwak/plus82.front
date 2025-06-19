import { getTranslations } from 'next-intl/server'

import { NotificationSetting } from 'entities/notification'
import { NotificationSettingToggle } from 'features/update-notification-setting'
import { ServerError } from 'shared/api'

type Props = NotificationSetting & {
  updateNotificationSetting: (
    setting: NotificationSetting,
  ) => Promise<ServerError | undefined>
}

export const NotificationSettingPage = async ({
  allowEmail,
  updateNotificationSetting,
}: Props) => {
  const t = await getTranslations('notification-setting')

  return (
    <div className="flex flex-grow justify-center px-[46px] py-10">
      <div className="w-full">
        <h2 className="title-large mb-10 text-center font-bold text-gray-900">
          {t('title')}
        </h2>
        <NotificationSettingToggle
          allowEmail={allowEmail}
          update={updateNotificationSetting}
        />
      </div>
    </div>
  )
}
