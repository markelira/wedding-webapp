'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const venueImages = [
  {
    src: '/images/venue/ceremony-arch.jpg',
    alt: 'Kültéri ceremónia virágívvel',
  },
  {
    src: '/images/venue/building-night.jpg',
    alt: 'A Kúria éjszakai kivilágításban',
  },
  {
    src: '/images/venue/building-exterior.jpg',
    alt: 'A Kúria épülete nappal',
  },
]

export function VenueCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % venueImages.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ornate frame border */}
      <div className="absolute inset-0 border border-gold/30 m-2 pointer-events-none z-20" />
      <div className="absolute inset-0 border border-gold/20 m-4 pointer-events-none z-20" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={venueImages[current].src}
            alt={venueImages[current].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gold/0 transition-colors duration-500 hover:bg-gold/5 z-10" />

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {venueImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
              i === current
                ? 'bg-gold border-gold scale-110'
                : 'bg-gold/20 border-gold/40 hover:bg-gold/40'
            }`}
            aria-label={`Kép ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
