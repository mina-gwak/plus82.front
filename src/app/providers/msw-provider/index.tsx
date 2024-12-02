'use client'

import { type ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
}

export const MSWProvider = ({ children }: Props) => {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      const initMsw = await import('./init-msw').then(res => res.initMSW)
      await initMsw()
      setMswReady(true)
    }

    if (!mswReady) {
      init()
    }
  }, [mswReady])

  return <>{mswReady ? children : <></>}</>
}
