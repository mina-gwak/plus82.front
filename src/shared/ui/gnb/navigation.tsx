import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { cn } from 'shared/lib'

export const Root = ({ children }: PropsWithChildren) => {
  return <ul className="flex items-center justify-center gap-1">{children}</ul>
}

type ItemProps = {
  value: string
}

export const Item = ({ value, children }: PropsWithChildren<ItemProps>) => {
  const pathname = usePathname()

  const isActive = (pathname ?? '/') === value

  return (
    <li
      className={cn(
        'body-large bg-white px-3.5 py-2.5 text-gray-900 transition-all',
        isActive && 'text-blue-800',
      )}
    >
      <Link href={value}>{children}</Link>
    </li>
  )
}
