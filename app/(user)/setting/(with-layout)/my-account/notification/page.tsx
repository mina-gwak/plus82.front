import {
  getTeacherNotificationSetting,
  updateTeacherNotificationSetting,
} from 'entities/notification'
import { NotificationSettingPage } from 'pages/notification-setting'

const Page = async () => {
  const { allowEmail } = await getTeacherNotificationSetting()

  return (
    <NotificationSettingPage
      allowEmail={allowEmail}
      updateNotificationSetting={updateTeacherNotificationSetting}
    />
  )
}

export default Page
