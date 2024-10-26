import { cva, VariantProps } from 'class-variance-authority'

export const switchWrapper = cva('flex items-center gap-2', {
  variants: {
    labelPlacement: {
      start: 'flex-row-reverse',
      end: 'flex-row',
    },
    disabled: {
      true: 'pointer-events-none opacity-50',
      false: 'cursor-pointer',
    },
  },
})

export const switchComponent = cva(
  'block h-8 w-14 rounded-full p-1 outline-none transition-all focus:outline-none',
  {
    variants: {
      checked: {
        true: 'bg-blue-800',
        false: 'bg-gray-500',
      },
    },
  },
)

export const thumb = cva('block h-6 w-6 rounded-full bg-white transition-all', {
  variants: {
    checked: {
      true: 'translate-x-full transform',
    },
  },
})

export const label = cva('title-small text-gray-900')

export type SwitchVariants = VariantProps<typeof switchWrapper> &
  VariantProps<typeof switchComponent> &
  VariantProps<typeof thumb>
