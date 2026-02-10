'use client'

import { motion } from 'framer-motion'
import { Gift, Hotel, Pizza } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { ACCOMMODATION } from '@/lib/constants'

// Decorative quotation marks - Regency style
function QuoteMark({ position }: { position: 'open' | 'close' }) {
  return (
    <span
      className={`absolute text-5xl text-gold/25 ${
        position === 'open' ? '-top-4 -left-2' : '-bottom-8 -right-2'
      }`}
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {position === 'open' ? '\u201C' : '\u201D'}
    </span>
  )
}

// Ornate card with Regency styling
function OrnateCard({
  children,
  className = '',
  featured = false,
}: {
  children: React.ReactNode
  className?: string
  featured?: boolean
}) {
  return (
    <div
      className={`relative rounded-sm p-8 sm:p-10 ${className}`}
      style={{
        background: featured
          ? 'linear-gradient(145deg, #FBF9F7 0%, #F5F0E8 100%)'
          : 'linear-gradient(145deg, #FBF9F7 0%, #F8F5F0 100%)',
        boxShadow: featured
          ? '0 4px 20px rgba(196, 163, 90, 0.15), 0 8px 40px rgba(44, 36, 22, 0.08), inset 0 0 40px rgba(196, 163, 90, 0.05)'
          : '0 2px 12px rgba(44, 36, 22, 0.06), 0 4px 24px rgba(44, 36, 22, 0.04)',
      }}
    >
      {/* Corner decorations */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/30" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold/30" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold/30" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/30" />

      {children}
    </div>
  )
}

export function InfoSection() {
  return (
    <Section className="relative overflow-hidden">

      <Container>
        <div className="relative mx-auto max-w-3xl space-y-12">
          {/* Gift message - featured card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <OrnateCard featured className="text-center">
              <Gift className="mx-auto h-10 w-10 text-gold" />

              <div className="relative mt-8 px-4">
                <QuoteMark position="open" />
                <p
                  className="text-xl sm:text-2xl leading-relaxed text-ink-soft"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
                >
                  Ami az ajándékot illeti — nos, a fiatal pár már mindennel bír,
                  mi egy háztartáshoz illik. Ami még hiányzik, az elegánsan elfér
                  egy boríték mélyén. Lady Whistledown természetesen sosem beszélne
                  pénzről... de a borítékról igen.
                </p>
                <QuoteMark position="close" />
              </div>
            </OrnateCard>
          </motion.div>

          {/* Accommodation info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <OrnateCard>
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-gold/30">
                  <Hotel className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3
                    className="text-xl sm:text-2xl font-semibold text-ink"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    Szállás
                  </h3>
                  <p
                    className="mt-2 text-lg sm:text-xl leading-relaxed text-ink-soft"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
                  >
                    Lady Whistledown figyelmezteti becses olvasóit: aki a mulatozás után
                    nem kívánna hintóra szállni, annak a Kúria kényelmesen berendezett
                    szobái állnak rendelkezésre.
                  </p>
                  <div className="mt-4 inline-flex items-baseline gap-2 border-b border-gold/30 pb-1">
                    <span
                      className="text-2xl sm:text-3xl font-semibold text-gold"
                      style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                      {ACCOMMODATION.pricePerNight.toLocaleString('hu-HU')} Ft
                    </span>
                    <span className="text-ink-muted" style={{ fontFamily: 'var(--font-cormorant)' }}>
                      / éj
                    </span>
                  </div>
                  <p
                    className="mt-2 text-base text-ink-muted"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {ACCOMMODATION.guestsPerRoom} főre, reggelivel
                  </p>
                </div>
              </div>
            </OrnateCard>
          </motion.div>

          {/* Pizza party info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <OrnateCard>
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-gold/30">
                  <Pizza className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3
                    className="text-xl sm:text-2xl font-semibold text-ink"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    Másnapi program
                  </h3>
                  <p
                    className="mt-2 text-lg sm:text-xl leading-relaxed text-ink-soft"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
                  >
                    S mint minden igazán emlékezetes báli szezon, ez sem ér véget egyetlen
                    éjszaka után! Másnap, a fellángolós fejek összeterítésekor, közös pizzázás
                    várja azokat, kik kitartanak a végéig. Másnap 18 óráig lehet a helyszínen
                    maradni, lehetőség van wellnessezésre is.
                  </p>
                </div>
              </div>
            </OrnateCard>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
