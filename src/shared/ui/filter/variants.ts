import { cva, VariantProps } from 'class-variance-authority'

export const wrapper = cva('relative flex w-fit shrink-0 items-center gap-2', {
  variants: {
    disabled: {
      true: 'pointer-events-none',
      false: '',
    },
  },
})

export const checked = cva(
  'body-large flex h-auto min-h-9 w-full cursor-pointer flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 pr-9 text-gray-900 outline-none transition-all',
  {
    variants: {
      disabled: {
        true: 'bg-gray-100 text-gray-500',
        false: '',
      },
      isFocused: {
        true: 'border-2 focus:border-2',
        false: '',
      },
      canCheck: {
        true: '',
        false: 'cursor-default',
      },
    },

    compoundVariants: [
      {
        disabled: false,
        isFocused: true,
        class: 'border-blue-800',
      },
    ],
  },
)

export const arrowIcon = cva(
  'pointer-events-none absolute right-3 top-1/2 z-auto origin-center -translate-y-1/2 rotate-0 transform transition-all duration-200',
  {
    variants: {
      isOpen: {
        true: 'rotate-180 transform',
        false: 'rotate-0',
      },
    },
  },
)

export type FilterVariants = VariantProps<typeof checked>
