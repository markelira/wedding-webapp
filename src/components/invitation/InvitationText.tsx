'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

// Regency style ornamental divider
function OrnamentalDivider() {
  return (
    <svg
      width="280"
      height="40"
      viewBox="0 0 280 40"
      fill="none"
      className="text-gold"
    >
      <g stroke="currentColor" fill="none" strokeWidth="1">
        {/* Left side flourish */}
        <path d="M 20 20 Q 40 10 60 20 Q 40 30 20 20" />
        <path d="M 60 20 Q 70 15 80 20 Q 70 25 60 20" opacity="0.6" />
        <path d="M 80 20 L 120 20" />

        {/* Center ornament - laurel wreath inspired */}
        <ellipse cx="140" cy="20" rx="15" ry="12" />
        <circle cx="140" cy="20" r="6" fill="currentColor" fillOpacity="0.2" />

        {/* Laurel leaves */}
        <path d="M 125 15 Q 120 10 125 5 Q 128 12 125 15" fill="currentColor" fillOpacity="0.3" />
        <path d="M 125 25 Q 120 30 125 35 Q 128 28 125 25" fill="currentColor" fillOpacity="0.3" />
        <path d="M 155 15 Q 160 10 155 5 Q 152 12 155 15" fill="currentColor" fillOpacity="0.3" />
        <path d="M 155 25 Q 160 30 155 35 Q 152 28 155 25" fill="currentColor" fillOpacity="0.3" />

        {/* Right side flourish */}
        <path d="M 160 20 L 200 20" />
        <path d="M 200 20 Q 210 15 220 20 Q 210 25 200 20" opacity="0.6" />
        <path d="M 220 20 Q 240 10 260 20 Q 240 30 220 20" />
      </g>
    </svg>
  )
}

export function InvitationText() {
  return (
    <Section className="relative overflow-hidden">

      <Container>
        <div className="relative mx-auto max-w-3xl text-center">
          {/* Opening salutation */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ink tracking-wide"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Legdrágább Nyájas Olvasó,
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-3 text-lg sm:text-xl md:text-2xl text-ink-soft tracking-wide"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            avagy szeretett Családunk és Barátaink!
          </motion.p>

          {/* Ornamental divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto my-10 flex items-center justify-center"
          >
            <OrnamentalDivider />
          </motion.div>

          {/* Main text with elegant drop cap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8 text-left"
          >
            <p
              className="drop-cap text-xl sm:text-2xl leading-relaxed text-ink-soft"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
            >
              Örömmel és illendő izgalommal adjuk tudtára mindazoknak,
              kik szívünknek oly kedvesek, hogy egy várhatóan napsütéses
              délutánon életünk legfontosabb ígéretét készülünk egymásnak tenni.
            </p>

            <p
              className="text-xl sm:text-2xl leading-relaxed text-ink-soft"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
            >
              E jeles alkalomból tisztelettel és szeretettel hívunk meg
              Benneteket, hogy jelenlétetekkel megtiszteljétek egybekelésünket{' '}
              <span
                className="inline-block border-b-2 border-gold/40 pb-0.5 font-semibold text-ink"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                2026. május havának 7. napján, délután 15 órakor
              </span>
              , valamint az azt követő ünnepi vacsorán, ahol a jó társaság,
              a derű és a koccintások bizonyosan nem maradnak el.
            </p>
          </motion.div>

          {/* Closing flourish */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <svg width="60" height="30" viewBox="0 0 60 30" className="text-gold/50">
              <path
                d="M 5 15 Q 15 5 30 15 Q 45 25 55 15"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
              />
              <circle cx="30" cy="15" r="3" fill="currentColor" />
            </svg>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
