'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { NotificationSetting } from 'entities/notification'
import { isServerError, ServerError, useServerErrorHandler } from 'shared/api'
import { Switch } from 'shared/ui'

type Props = NotificationSetting & {
  update: (setting: NotificationSetting) => Promise<ServerError | undefined>
}

export const NotificationSettingToggle = ({ allowEmail, update }: Props) => {
  const t = useTranslations('notification-setting')
  const [isLoading, setIsLoading] = useState(false)

  const { handleServerError } = useServerErrorHandler()

  const handleUpdate = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const response = await update({ allowEmail: !allowEmail })

      if (isServerError(response)) {
        handleServerError(response)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-between">
      <div className="space-y-2">
        <h3 className="title-small font-bold text-gray-900">{t('label')}</h3>
        <p className="body-large font-normal text-gray-700">
          {t('description')}
        </p>
      </div>
      <Switch
        checked={allowEmail}
        onClick={handleUpdate}
        disabled={isLoading}
      />
    </div>
  )
}
