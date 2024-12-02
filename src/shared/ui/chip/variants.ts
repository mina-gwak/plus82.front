import { cva, VariantProps } from 'class-variance-authority'

export const chip = cva('flex w-fit items-center border', {
  variants: {
    size: {
      small: 'min-h-[30px] gap-1 rounded-md px-2 py-1',
      medium: 'min-h-9 gap-[6px] rounded-lg px-3 py-2',
      large: 'min-h-10 gap-[6px] rounded-lg px-3 py-2',
    },
    variant: {
      lined: '',
      solid: '',
    },
    selected: {
      true: '',
      false: '',
    },
    disabled: {
      true: 'pointer-events-none cursor-default',
      false: '',
    },
  },

  compoundVariants: [
    {
      variant: 'lined',
      class: 'border-gray-300',
    },
    {
      variant: 'lined',
      selected: true,
      disabled: false,
      class: 'border-gray-800 bg-gray-800',
    },
    {
      variant: 'solid',
      class: 'border-gray-100 bg-gray-100',
    },
    {
      variant: 'solid',
      selected: true,
      disabled: false,
      class: 'border-blue-50 bg-blue-50',
    },
  ],
})

export const label = cva('', {
  variants: {
    size: {
      small: 'body-small',
      medium: 'body-large',
      large: 'title-small',
    },
    variant: {
      lined: '',
      solid: '',
    },
    selected: {
      true: '',
      false: '',
    },
    disabled: {
      true: 'text-gray-300',
      false: '',
    },
  },

  compoundVariants: [
    {
      variant: 'lined',
      selected: false,
      disabled: false,
      class: 'text-gray-700',
    },
    {
      variant: 'lined',
      selected: true,
      disabled: false,
      class: 'text-white',
    },
    {
      variant: 'solid',
      selected: false,
      disabled: false,
      class: 'text-gray-800',
    },
    {
      variant: 'solid',
      selected: true,
      disabled: false,
      class: 'text-blue-800',
    },
  ],
})

export type ChipVariants = VariantProps<typeof chip>
