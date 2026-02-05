'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCountdown } from '@/hooks/useCountdown'
import { WEDDING_DATE } from '@/lib/constants'

interface FlipNumberProps {
  value: number
  label: string
}

function FlipNumber({ value, label }: FlipNumberProps) {
  const prevValue = useRef(value)
  const [displayValue, setDisplayValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (prevValue.current !== value) {
      setIsFlipping(true)
      const timer = setTimeout(() => {
        setDisplayValue(value)
        setIsFlipping(false)
        prevValue.current = value
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [value])

  return (
    <div className="text-center">
      <div
        className="
          relative flex h-16 w-16 items-center justify-center
          overflow-hidden rounded-lg
          border border-gold-dark/30
          bg-cream
          shadow-sm
          sm:h-20 sm:w-20
        "
      >
        {/* Subtle inner border glow */}
        <div className="absolute inset-[1px] rounded-[7px] border border-gold/10" />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={displayValue}
            initial={isFlipping ? { y: 20, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="text-2xl font-semibold text-ink sm:text-3xl"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            {displayValue.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <p
        className="mt-2 text-sm text-ink-muted sm:text-base"
        style={{ fontFamily: 'var(--font-cormorant)' }}
      >
        {label}
      </p>
    </div>
  )
}

export function CountdownTimer() {
  const { days, hours, minutes, isExpired } = useCountdown(WEDDING_DATE)

  if (isExpired) {
    return (
      <p
        className="text-xl text-gold"
        style={{ fontFamily: 'var(--font-pinyon)' }}
      >
        A nagy nap elérkezett!
      </p>
    )
  }

  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      <FlipNumber value={days} label="nap" />
      <FlipNumber value={hours} label="óra" />
      <FlipNumber value={minutes} label="perc" />
    </div>
  )
}
