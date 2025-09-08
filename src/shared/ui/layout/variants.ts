import { cva, VariantProps } from 'class-variance-authority'

export const outerWrapper = cva('h-[calc(100dvh-65px)] w-fit flex-grow', {
  variants: {
    wide: {
      true: 'mx-auto my-0 flex',
      false: 'mx-auto my-0 flex',
    },
  },
})

export const innerWrapper = cva('flex-shrink-0', {
  variants: {
    wide: {
      true: 'm-[40px] w-[1060px] min-w-[1060px]',
      false: 'm-[50px] w-[360px] min-w-[360px]',
    },
  },
})

export type LayoutVariants = VariantProps<typeof outerWrapper>
