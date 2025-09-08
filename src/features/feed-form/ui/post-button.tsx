import { useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { addBusinessFeed, addFeed, feedQueries } from 'entities/feed'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Button } from 'shared/ui'

import { convertFormValuesToAddFeedValues } from '../model/converter'
import { type FormValues } from '../model/form-values'

type Props = {
  onSuccess: () => void
}

export const PostButton = ({ onSuccess }: Props) => {
  const t = useTranslations('feed-list')

  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const { control, handleSubmit } = useFormContext<FormValues>()

  const { handleServerError } = useServerErrorHandler()

  const content = useWatch({
    control,
    name: 'content',
  })

  const isDisabled = content.length === 0

  const handleSuccess = () => {
    onSuccess()
    toast.success(t('feed-form.success.post'))
    queryClient.invalidateQueries({
      queryKey: isBusiness ? feedQueries.businessLists() : feedQueries.lists(),
    })
    router.refresh()
  }

  const submitForm = async (data: FormValues) => {
    const convertedValues = convertFormValuesToAddFeedValues(data)
    const response = await (isBusiness
      ? addBusinessFeed(convertedValues)
      : addFeed(convertedValues))

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSuccess()
    }
  }

  return (
    <Button
      size="large"
      className="w-[93px]"
      disabled={isDisabled}
      onClick={handleSubmit(submitForm)}
    >
      {t('feed-form.button.post')}
    </Button>
  )
}
