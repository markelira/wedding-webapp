'use client'

import { motion } from 'framer-motion'
import { MapPin, ExternalLink } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { VENUE } from '@/lib/constants'
import { VenueCarousel } from './VenueCarousel'

// Regency style section header with flourishes
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

      {/* Decorative underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 flex justify-center"
      >
        <svg width="150" height="20" viewBox="0 0 150 20" className="text-gold">
          <path
            d="M 10 10 L 60 10 M 90 10 L 140 10"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="75" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="75" cy="10" r="2" fill="currentColor" />
        </svg>
      </motion.div>
    </div>
  )
}

export function VenueSection() {
  return (
    <Section className="relative overflow-hidden">

      <Container>
        <SectionHeader>Helyszín</SectionHeader>

        {/* Whistledown description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto max-w-2xl text-center text-lg sm:text-xl leading-relaxed text-ink-soft mb-12"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
        >
          E szerző értesülése szerint az ifjú pár nem kevesebbre esett választása,
          mint a biri-i Le Til Kúria — e páratlan birtok, melynek oszlopos homlokzata
          és gondozott kertjei még a legkényesebb vendég tetszését is kivívják.
        </motion.p>

        <div className="relative grid gap-8 md:grid-cols-2">
          {/* Venue Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="group relative shadow-lg"
            style={{
              boxShadow: '0 4px 20px rgba(44, 36, 22, 0.1), 0 8px 40px rgba(44, 36, 22, 0.08)',
            }}
          >
            <VenueCarousel />
          </motion.div>

          {/* Venue Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-ink"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              {VENUE.name}
            </h3>

            <div className="mt-4 flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gold" />
              <p
                className="text-lg sm:text-xl text-ink-soft"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {VENUE.address}
              </p>
            </div>

            <a
              href={VENUE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors duration-300"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              <span className="text-lg">Megnyitás térképen</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            {/* Embedded Map with vintage styling */}
            <div
              className="mt-6 aspect-video overflow-hidden rounded-sm shadow-md"
              style={{
                boxShadow: 'inset 0 0 20px rgba(196, 163, 90, 0.1), 0 4px 16px rgba(44, 36, 22, 0.08)',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1718.4369285581172!2d21.853674719797173!3d47.80636316493026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47477b693f51e3f9%3A0xa89754405498e247!2sLe%20Til%20K%C3%BAria!5e1!3m2!1shu!2shu!4v1770150173134!5m2!1shu!2shu"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'sepia(20%) saturate(85%) contrast(95%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
