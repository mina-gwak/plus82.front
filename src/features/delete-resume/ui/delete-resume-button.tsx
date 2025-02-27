'use client'

import { useState, MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { deleteResume } from 'entities/resume'
import { isServerError, useServerErrorHandler } from 'shared/api'

type Props = {
  resumeId: number
}

export const DeleteResumeButton = ({ resumeId }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const { handleServerError } = useServerErrorHandler()

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    setIsLoading(true)

    const response = await deleteResume(resumeId)

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      toast.success('Resume deleted successfully')
    }
  }

  return (
    <button
      type="button"
      onClick={handleButtonClick}
      disabled={isLoading}
      className="w-full p-3 text-left text-error disabled:bg-gray-100 disabled:text-gray-500"
    >
      {isLoading ? 'Deleting...' : 'Delete'}
    </button>
  )
}
