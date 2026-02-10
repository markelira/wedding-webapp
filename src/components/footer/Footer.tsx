'use client'

import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { hu } from 'date-fns/locale'
import { MapPin } from 'lucide-react'
import { RSVP_DEADLINE, VENUE } from '@/lib/constants'

// Regency style ornamental divider
function FooterDivider() {
  return (
    <svg width="200" height="40" viewBox="0 0 200 40" className="text-gold-light/40" fill="none">
      {/* Laurel branches */}
      <g stroke="currentColor" strokeWidth="1">
        {/* Left branch */}
        <path d="M 20 20 Q 40 15 60 20" />
        <path d="M 30 15 Q 25 10 30 5 Q 33 12 30 15" fill="currentColor" fillOpacity="0.3" />
        <path d="M 45 17 Q 40 12 45 7 Q 48 14 45 17" fill="currentColor" fillOpacity="0.3" />

        {/* Center ornament */}
        <circle cx="100" cy="20" r="8" />
        <circle cx="100" cy="20" r="4" fill="currentColor" fillOpacity="0.3" />

        {/* Right branch */}
        <path d="M 140 20 Q 160 15 180 20" />
        <path d="M 155 17 Q 160 12 155 7 Q 152 14 155 17" fill="currentColor" fillOpacity="0.3" />
        <path d="M 170 15 Q 175 10 170 5 Q 167 12 170 15" fill="currentColor" fillOpacity="0.3" />

        {/* Connecting lines */}
        <path d="M 60 20 L 92 20 M 108 20 L 140 20" />
      </g>
    </svg>
  )
}

export function Footer() {
  const formattedDeadline = format(RSVP_DEADLINE, 'yyyy. MMMM d.', { locale: hu })

  return (
    <footer
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2D3436 0%, #1a1e1f 100%)',
      }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4A35A' fill-opacity='1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20v20h20zm0 0c0 11.046 8.954 20 20 20V30H30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4">
        {/* Decorative divider */}
        <div className="flex justify-center mb-12">
          <FooterDivider />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Names */}
          <p
            className="text-4xl sm:text-5xl md:text-6xl text-gold"
            style={{ fontFamily: 'var(--font-pinyon)' }}
          >
            Vivien & Martin
          </p>

          {/* RSVP reminder */}
          <p
            className="mt-8 text-lg sm:text-xl text-ivory/70"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Visszajelzéseteket{' '}
            <span
              className="text-gold-light"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              {formattedDeadline}
            </span>
            -ig várjuk
          </p>

          {/* Venue info */}
          <div className="mt-6 flex items-center justify-center gap-2 text-ivory/50">
            <MapPin className="h-5 w-5" />
            <p
              className="text-base sm:text-lg"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {VENUE.name} · {VENUE.address}
            </p>
          </div>

          {/* Whistledown farewell */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 text-base sm:text-lg italic text-ivory/50 leading-relaxed max-w-md mx-auto"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
          >
            Ezzel Lady Whistledown búcsút vesz. Maradok, a Társaság hű szolgálója.
          </motion.p>

          {/* Date */}
          <div className="mt-10">
            <p
              className="text-sm tracking-[0.25em] uppercase text-ivory/30"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              2026. május 7.
            </p>
          </div>

          {/* Small flourish */}
          <div className="mt-8 flex justify-center">
            <svg width="40" height="20" viewBox="0 0 40 20" className="text-gold/30">
              <path
                d="M 5 10 Q 20 0 35 10"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
              />
              <circle cx="20" cy="5" r="2" fill="currentColor" />
            </svg>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
