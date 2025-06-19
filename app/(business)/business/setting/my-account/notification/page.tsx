import {
  getBusinessNotificationSetting,
  updateBusinessNotificationSetting,
} from 'entities/notification'
import { NotificationSettingPage } from 'pages/notification-setting'

const Page = async () => {
  const { allowEmail } = await getBusinessNotificationSetting()

  return (
    <NotificationSettingPage
      allowEmail={allowEmail}
      updateNotificationSetting={updateBusinessNotificationSetting}
    />
  )
}

export default Page
