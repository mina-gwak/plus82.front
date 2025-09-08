import { cva, VariantProps } from 'class-variance-authority'

export const link = cva('body-large transition-all', {
  variants: {
    variant: {
      primary:
        'text-blue-800 underline visited:text-blue-800 hover:text-blue-900',
      secondary:
        'text-gray-700 visited:text-gray-900 hover:text-gray-900 hover:underline',
      tertiary: 'text-gray-700 visited:text-gray-700 hover:text-gray-900',
    },
    disabled: {
      true: 'pointer-events-none cursor-default',
      false: '',
    },
  },

  compoundVariants: [
    {
      variant: 'primary',
      disabled: true,
      class: 'text-blue-100 visited:text-blue-100',
    },
    {
      variant: 'secondary',
      disabled: true,
      class: 'text-gray-300 visited:text-gray-300',
    },
    {
      variant: 'tertiary',
      disabled: true,
      class: 'text-gray-300 visited:text-gray-300',
    },
  ],
})

export type LinkVariants = VariantProps<typeof link>
