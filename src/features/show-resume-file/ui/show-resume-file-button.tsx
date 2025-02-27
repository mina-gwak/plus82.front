'use client'

import { ReactNode } from 'react'

import { Button, Modal } from 'shared/ui'

import { PDFViewer } from './pdf-viewer'

type Props = {
  children: ReactNode
  fileName: string
  filePath: string
}

export const ShowResumeFileButton = ({
  children,
  fileName,
  filePath,
}: Props) => {
  return (
    <Modal>
      <Modal.Trigger asChild>
        <div className="cursor-pointer" role="button" tabIndex={0}>
          {children}
        </div>
      </Modal.Trigger>
      <Modal.Content className="flex min-h-[670px] w-[900px] flex-col items-end gap-4">
        <Modal.Title className="title-large w-full text-center font-bold text-gray-900">
          {fileName}
        </Modal.Title>
        <PDFViewer filePath={filePath} className="h-[480px]" />
        <Modal.Close asChild>
          <Button type="button" size="large">
            Confirm
          </Button>
        </Modal.Close>
      </Modal.Content>
    </Modal>
  )
}
