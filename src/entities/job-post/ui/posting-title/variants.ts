import { cva } from 'class-variance-authority'

export const title = cva('font-medium text-gray-900', {
  variants: {
    size: {
      small: 'title-medium',
      medium: 'display-small',
    },
  },
})

export const academyName = cva('font-medium text-gray-500', {
  variants: {
    size: {
      small: 'body-large',
      medium: 'title-small',
    },
  },
})

export const description = cva(
  'flex items-center gap-0.5 font-normal text-gray-700',
  {
    variants: {
      size: {
        small: 'body-large',
        medium: 'body-small',
      },
    },
  },
)
