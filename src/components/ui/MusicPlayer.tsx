'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

interface MusicPlayerProps {
  shouldPlay: boolean
}

export function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    if (!shouldPlay || hasStarted) return

    const audio = new Audio('/audio/bridgerton-enchanted.mp3')
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setHasStarted(true)
        })
        .catch(() => {
          // Browser blocked autoplay — start muted with pulse indicator
          audio.muted = true
          audio.play().catch(() => {})
          setIsMuted(true)
          setHasStarted(true)
          setShowPulse(true)
        })
    }

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [shouldPlay, hasStarted])

  const toggleMute = () => {
    if (!audioRef.current) return

    if (isMuted) {
      audioRef.current.muted = false
      audioRef.current.play().catch(() => {})
      setIsMuted(false)
      setShowPulse(false)
    } else {
      audioRef.current.muted = true
      setIsMuted(true)
    }
  }

  if (!hasStarted) return null

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/60 bg-cream/90 backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-gold hover:shadow-xl hover:scale-105 active:scale-95"
        aria-label={isMuted ? 'Zene bekapcsolása' : 'Zene kikapcsolása'}
      >
        {/* Pulse animation when muted and needs attention */}
        {showPulse && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gold/40"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {isMuted ? (
          <VolumeX className="h-5 w-5 text-ink-soft" />
        ) : (
          <Volume2 className="h-5 w-5 text-gold-dark" />
        )}
      </motion.button>
    </AnimatePresence>
  )
}
