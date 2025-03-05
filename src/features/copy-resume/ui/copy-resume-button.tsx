import { MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { copyResume } from 'entities/resume'
import { isServerError, useServerErrorHandler } from 'shared/api'

type Props = {
  resumeId: number
  onClick: () => void
}

export const CopyResumeButton = ({ resumeId, onClick }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const { handleServerError } = useServerErrorHandler()

  const handleCopyClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    setIsLoading(true)

    const response = await copyResume(resumeId)

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      toast.success('Resume copied successfully')
    }

    setIsLoading(false)
    onClick()
  }

  return (
    <button
      type="button"
      onClick={handleCopyClick}
      disabled={isLoading}
      className="w-full p-3 text-left disabled:bg-gray-100 disabled:text-gray-500"
    >
      {isLoading ? 'Copying...' : 'Copy'}
    </button>
  )
}
