'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, VariantProps } from 'class-variance-authority'
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  createContext,
  ElementRef,
  forwardRef,
  useContext,
} from 'react'

import { cn, useFixWidth } from 'shared/lib'

const groupVariants = cva('group/toggle-group flex bg-white', {
  variants: {
    variant: {
      box: '',
      underline: 'border-b border-gray-200',
    },
    size: {
      small: '',
      large: '',
    },
  },
})

const itemVariants = cva(
  [
    'flex items-center justify-center font-medium transition-all',
    'font-medium text-gray-700 focus-visible:ring-blue-100 [&_svg]:text-gray-500',
    '[&_span]:inline-block [&_span]:w-fit',
    '[&_svg]:size-4',
  ],
  {
    variants: {
      variant: {
        box: [
          'border',
          '[&:first-child]:rounded-r-none [&:last-child]:rounded-l-none [&:not(:first-child)]:-ml-[1px] [&:not(:first-child)]:border-l-transparent [&:nth-child(n+2):nth-last-child(n+2)]:rounded-none',
          'hover:bg-gray-100',
          'disabled:text-gray-200 disabled:[&_svg]:text-gray-200',
          'data-[state=active]:text-blue-800',
          'focus-visible:border-2 focus-visible:!border-blue-800',
        ],
        underline: [
          'relative rounded-sm text-gray-500',
          'hover:text-gray-700',
          'data-[state=active]:after:content-[" "] data-[state=active]:text-blue-800 data-[state=active]:after:absolute data-[state=active]:after:-bottom-px data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-800 data-[state=active]:after:transition-all',
          'focus-visible:ring-2 focus-visible:ring-blue-800 data-[state=active]:focus-visible:after:bg-[rgba(0,0,0,0)]',
        ],
      },
      size: {
        small: 'body-large',
        large: 'title-small',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: 'cursor-pointer hover:bg-gray-50/50 active:font-bold',
      },
    },

    compoundVariants: [
      {
        variant: 'underline',
        size: 'small',
        className: 'h-9 px-2.5 py-2',
      },
      {
        variant: 'underline',
        size: 'large',
        className: 'h-12 p-3',
      },
      {
        variant: 'box',
        size: 'small',
        className: 'h-10 w-[120px] rounded-[10px] p-[10px]',
      },
      {
        variant: 'box',
        size: 'large',
        className: 'h-12 w-[146px] rounded-[12px] p-[12px]',
      },
    ],
  },
)

const ToggleGroupContext = createContext<
  VariantProps<typeof groupVariants> & {
    width?: 'full' | 'fit'
  }
>({
  size: 'large',
  variant: 'box',
  width: 'full',
})

// eslint-disable-next-line prefer-destructuring
export const Root = TabsPrimitive.Root

type ListProps = ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof groupVariants> & {
    width?: 'full' | 'fit'
  }

export const List = ({
  variant = 'box',
  size = 'large',
  width,
  className,
  ref,
  children,
  ...props
}: ListProps) => (
  <ToggleGroupContext.Provider value={{ size, variant, width }}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        groupVariants({ variant }),
        ['--segment-color:theme(colors.blue.800)'],
        width === 'full' ? 'w-full' : 'w-fit',
        className,
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  </ToggleGroupContext.Provider>
)

type TriggerProps = ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof itemVariants>

export const Trigger = ({
  disabled,
  className,
  children,
  ref,
  ...props
}: TriggerProps) => {
  const { width: widthState, variant, size } = useContext(ToggleGroupContext)

  const { width: widthFromChildren, childrenRef } =
    useFixWidth<HTMLDivElement>(children)

  const width = widthState === 'full' ? null : widthFromChildren

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        itemVariants({ variant, size, disabled }),
        'min-w-0 shrink-0 focus:z-10 focus-visible:z-10',
        width ? 'w-full' : 'flex-1',
        className,
      )}
      {...(width && { style: { width: `${width}px` } })}
      {...props}
    >
      <div ref={childrenRef} className="whitespace-pre">
        {children}
      </div>
    </TabsPrimitive.Trigger>
  )
}

export const Content = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('', className)} {...props} />
))
Content.displayName = TabsPrimitive.Content.displayName
