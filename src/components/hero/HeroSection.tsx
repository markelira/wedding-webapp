'use client'

import { motion } from 'framer-motion'
import { CountdownTimer } from '@/components/countdown/CountdownTimer'
import { WeddingEmblem } from './WeddingEmblem'

// Decorative flourish divider
function FloralDivider() {
  return (
    <svg width="200" height="30" viewBox="0 0 200 30" fill="none" className="text-gold">
      <g stroke="currentColor" fill="none" strokeWidth="1">
        {/* Left flourish */}
        <path d="M 10 15 Q 30 5 50 15 Q 30 25 10 15" />
        <path d="M 50 15 L 85 15" />

        {/* Center diamond */}
        <path d="M 90 15 L 100 8 L 110 15 L 100 22 Z" fill="currentColor" fillOpacity="0.3" />

        {/* Right flourish */}
        <path d="M 115 15 L 150 15" />
        <path d="M 150 15 Q 170 5 190 15 Q 170 25 150 15" />
      </g>
    </svg>
  )
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-2xl text-center px-8"
      >
        {/* Small ornate subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-sm sm:text-base tracking-[0.3em] uppercase text-gold-dark"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          Esküvői Meghívó
        </motion.p>

        {/* Main title flourish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-4"
        >
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink"
            style={{ fontFamily: 'var(--font-pinyon)' }}
          >
            Vivien & Martin
          </h1>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-4 flex justify-center"
        >
          <FloralDivider />
        </motion.div>

        {/* Date with elegant spacing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-4 text-lg sm:text-xl tracking-[0.2em] uppercase text-ink-soft"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          2026. május 7.
        </motion.p>

        {/* Wedding Emblem - Floral wreath with V&M monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-6 flex justify-center"
        >
          <WeddingEmblem />
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="mt-2"
        >
          <CountdownTimer />
        </motion.div>
      </motion.div>

      {/* Elegant scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-8 bg-gradient-to-b from-gold/0 via-gold to-gold/0" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gold">
            <path d="M 1 4 L 6 9 L 11 4" stroke="currentColor" strokeWidth="1" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
