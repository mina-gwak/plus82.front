'use client'

import { useState, MouseEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { toast } from 'react-toastify'

import { getResume } from 'entities/resume'

import { Resume } from './resume'
import { downloadPDF } from '../lib/download-pdf'

type Props = {
  resumeId: number
  onClick: () => void
}

export const DownloadResumeButton = ({ resumeId, onClick }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    setIsLoading(true)

    try {
      const container = document.createElement('div')
      container.id = 'resume'
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      document.body.appendChild(container)

      const resume = await getResume(String(resumeId))

      // React 컴포넌트를 임시 컨테이너에 렌더링
      const root = createRoot(container)
      root.render(<Resume resume={resume} />)

      // 약간의 지연을 주어 렌더링이 완료되도록 함
      await new Promise(resolve => setTimeout(resolve, 100))

      // PDF 생성
      await downloadPDF('resume', resume.title)

      // 정리: 임시 컨테이너 제거
      document.body.removeChild(container)
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to download resume')
    } finally {
      setIsLoading(false)
      onClick()
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      className="w-full p-3 text-left disabled:bg-gray-100 disabled:text-gray-500"
    >
      {isLoading ? 'Downloading...' : 'Download'}
    </button>
  )
}
