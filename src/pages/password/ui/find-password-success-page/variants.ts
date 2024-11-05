import { cva } from 'class-variance-authority'

export const layout = cva('flex flex-col items-center')
export const heading = cva(
  'display-small mb-2 text-center font-bold text-gray-900',
)
export const message = cva('title-medium mb-10 text-center text-gray-900')
