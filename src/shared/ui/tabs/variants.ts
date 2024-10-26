import { cva } from 'class-variance-authority'

export const tabs = cva('flex items-center justify-center gap-1')

export const trigger = cva(
  'title-small bg-white px-3.5 py-2.5 text-gray-900 transition-all',
  {
    variants: {
      active: {
        true: 'text-blue-800',
      },
    },
  },
)
