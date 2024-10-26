import { cva } from 'class-variance-authority'

export const welcomeMessage = cva(
  'title-medium mb-10 text-center text-gray-900',
)

export const headerWrapper = cva('mb-[30px] flex flex-col items-center gap-1')

export const header = cva('display-small font-bold text-gray-900')

export const goToSignIn = cva(
  'body-large flex items-center gap-1 text-gray-700',
)

export const checkbox = cva('mb-4 pl-[15px]')
