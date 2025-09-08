import { isEmpty, isNil } from 'lodash-es'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { reportBusinessFeed, reportFeed } from 'entities/report'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { isNilOrEmptyString } from 'shared/lib'
import { Button } from 'shared/ui'

type Props = {
  feedId: number
  onSuccess: () => void
}

export const ReportButton = ({ feedId, onSuccess }: Props) => {
  const t = useTranslations()

  const router = useRouter()
  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const { handleServerError } = useServerErrorHandler()

  const { control } = useFormContext()

  const [reason, otherReason] = useWatch({
    control,
    name: ['reason', 'otherReason'],
  })

  const isDisabled =
    isNil(reason) ||
    isEmpty(reason) ||
    (reason?.includes('Other') && isNilOrEmptyString(otherReason))

  const handleSuccess = () => {
    toast.success(t('feed-list.feed-item.report-post-modal.success'))
    router.refresh()
    onSuccess()
  }

  const handleReportButtonClick = async () => {
    const response = await (isBusiness
      ? reportBusinessFeed({
          feedId,
          reason: reason[0],
          otherReason: otherReason ?? '',
        })
      : reportFeed({
          feedId,
          reason: reason[0],
          otherReason: otherReason ?? '',
        }))

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSuccess()
    }
  }

  return (
    <Button
      variant="primary"
      size="large"
      className="w-[93px]"
      onClick={handleReportButtonClick}
      disabled={isDisabled}
    >
      {t('feed-list.feed-item.report-post-modal.button.report')}
    </Button>
  )
}
