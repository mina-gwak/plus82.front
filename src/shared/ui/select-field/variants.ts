import { cva } from 'class-variance-authority'

export const wrapper = cva('relative flex w-full shrink-0 items-center gap-2', {
  variants: {
    disabled: {
      true: 'pointer-events-none',
      false: '',
    },
  },
})

export const selected = cva(
  'body-medium flex h-auto min-h-12 w-full cursor-pointer flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white p-3 pr-10 text-gray-900 outline-none transition-all focus:border-2',
  {
    variants: {
      error: {
        true: '',
        false: '',
      },
      readOnly: {
        true: 'cursor-text',
        false: '',
      },
      disabled: {
        true: 'bg-gray-100 text-gray-500',
        false: '',
      },
      isFocused: {
        true: 'border-2',
        false: '',
      },
      isSelectable: {
        true: '',
        false: 'cursor-default',
      },
      isRemoveButtonVisible: {
        true: 'pr-[4.25rem]',
        false: '',
      },
    },

    compoundVariants: [
      {
        error: false,
        disabled: false,
        isFocused: true,
        class: 'border-blue-800',
      },
      {
        error: true,
        disabled: false,
        class: 'border-error',
      },
    ],
  },
)

export const placeholder = cva('body-medium select-none text-gray-500', {
  variants: {
    readOnly: {
      true: 'text-gray-900',
      false: '',
    },
  },
})

export const removeButton = cva('absolute right-11 top-1/2 -translate-y-1/2')

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
