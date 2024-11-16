import { cva, VariantProps } from 'class-variance-authority'

export const outerWrapper = cva('h-fit min-h-full w-full', {
  variants: {
    wide: {
      true: 'flex justify-center',
      false: 'flex justify-center',
    },
  },
})

export const innerWrapper = cva('', {
  variants: {
    wide: {
      true: 'm-[40px] w-[1060px]',
      false: 'm-[50px] w-[360px]',
    },
  },
})

export type LayoutVariants = VariantProps<typeof outerWrapper>
