'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  count: number
}

export const AnimatedCount = ({ count }: Props) => {
  const [prevCount, setPrevCount] = useState(count)
  const isIncreasing = count > prevCount

  useEffect(() => {
    setPrevCount(count)
  }, [count])

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'top',
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={count}
          initial={{
            y: isIncreasing ? 8 : -8,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.15,
            ease: 'easeOut',
          }}
          style={{
            display: 'inline-block',
            transformOrigin: 'center',
          }}
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
