'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PROGRAM } from '@/lib/constants'

// Regency style section header
function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ink tracking-wide"
        style={{ fontFamily: 'var(--font-cinzel)' }}
      >
        {children}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 flex justify-center"
      >
        <svg width="150" height="20" viewBox="0 0 150 20" className="text-gold">
          <path d="M 10 10 L 60 10 M 90 10 L 140 10" stroke="currentColor" strokeWidth="1" />
          <circle cx="75" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="75" cy="10" r="2" fill="currentColor" />
        </svg>
      </motion.div>
    </div>
  )
}

// Ornate timeline marker
function TimelineMarker({ isHighlight }: { isHighlight: boolean }) {
  if (isHighlight) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" className="text-gold">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="text-gold">
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
    </svg>
  )
}

export function ProgramTimeline() {
  return (
    <Section className="relative overflow-hidden">

      <Container>
        <SectionHeader>Program</SectionHeader>

        <div className="relative mx-auto max-w-lg">
          {/* Elegant timeline line with decorative elements */}
          <div className="absolute left-[88px] top-0 h-full w-px sm:left-[108px]">
            <div className="h-full w-full bg-gradient-to-b from-gold/20 via-gold to-gold/20" />
          </div>

          {/* Events */}
          <div className="space-y-10">
            {PROGRAM.map((item, index) => {
              const isHighlight = item.event.toLowerCase().includes('szertartás') ||
                                  item.event.toLowerCase().includes('vacsora')

              return (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-5"
                >
                  {/* Time */}
                  <div className="w-16 flex-shrink-0 text-right sm:w-20">
                    <span
                      className={`text-xl font-semibold sm:text-2xl ${isHighlight ? 'text-gold' : 'text-gold-dark'}`}
                      style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                      {item.time}
                    </span>
                  </div>

                  {/* Timeline marker */}
                  <div className="relative z-10 flex flex-shrink-0 items-center justify-center bg-cream rounded-full p-1">
                    <TimelineMarker isHighlight={isHighlight} />
                  </div>

                  {/* Event description */}
                  <div className="flex-1">
                    <p
                      className={`text-xl sm:text-2xl ${isHighlight ? 'font-semibold text-ink' : 'text-ink-soft'}`}
                      style={{ fontFamily: 'var(--font-cormorant)' }}
                    >
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom flourish */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <svg width="80" height="30" viewBox="0 0 80 30" className="text-gold/40">
              <path
                d="M 10 15 Q 25 5 40 15 Q 55 25 70 15"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
              />
              <circle cx="40" cy="15" r="3" fill="currentColor" />
            </svg>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
