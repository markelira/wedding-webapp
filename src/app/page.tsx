'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeAnimation } from '@/components/envelope/EnvelopeAnimation'
import { BridgertonBackground } from '@/components/ui/BridgertonBackground'
import { HeroSection } from '@/components/hero/HeroSection'
import { InvitationText } from '@/components/invitation/InvitationText'
import { VenueSection } from '@/components/venue/VenueSection'
import { ProgramTimeline } from '@/components/program/ProgramTimeline'
import { InfoSection } from '@/components/info/InfoSection'
import { RSVPForm } from '@/components/rsvp/RSVPForm'
import { Footer } from '@/components/footer/Footer'
import { MusicPlayer } from '@/components/ui/MusicPlayer'

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)

  return (
    <>
      <EnvelopeAnimation onComplete={() => setShowContent(true)} />

      <MusicPlayer shouldPlay={showContent} />

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <BridgertonBackground>
            <main>
              <HeroSection />
              <InvitationText />
              <VenueSection />
              <ProgramTimeline />
              <InfoSection />
              <RSVPForm />
              <Footer />
            </main>
          </BridgertonBackground>
        </motion.div>
      )}
    </>
  )
}
