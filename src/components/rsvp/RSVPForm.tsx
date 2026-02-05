'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { hu } from 'date-fns/locale'

import { db } from '@/lib/firebase'
import { rsvpFormSchema, type RSVPFormData } from '@/lib/validations'
import { RSVP_DEADLINE, MAX_ACCOMMODATION_NIGHTS } from '@/lib/constants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Checkbox } from '@/components/ui/Checkbox'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { GuestFields } from './GuestFields'

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

// Regency style section header
function SectionHeader({ children, subtitle }: { children: React.ReactNode; subtitle?: React.ReactNode }) {
  return (
    <div className="text-center mb-10">
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

      {subtitle && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  )
}

// Elegant form progress with Regency flourishes
function FormProgress({ step }: { step: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-3">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-3">
          <div
            className={`relative h-3 w-3 rounded-full border transition-all duration-300 ${
              s <= step
                ? 'border-gold bg-gold'
                : 'border-gold/30 bg-transparent'
            }`}
          >
            {s <= step && (
              <div className="absolute inset-0.5 rounded-full bg-gold-light/50" />
            )}
          </div>
          {s < 3 && (
            <div
              className={`h-px w-8 transition-colors duration-300 ${
                s < step ? 'bg-gold' : 'bg-gold/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// Success animation with Regency flourish
function SuccessAnimation() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative"
    >
      {/* Decorative ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0.6, 0], scale: 1.5 }}
        transition={{ delay: 0.2, duration: 1.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-gold/40">
          <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </motion.div>

      {/* Laurel wreath */}
      <svg width="100" height="100" viewBox="0 0 100 100" className="text-sage">
        {/* Left laurel */}
        <g fill="currentColor" fillOpacity="0.4">
          <path d="M 25 50 Q 20 40 25 30 Q 30 40 25 50" />
          <path d="M 30 55 Q 22 48 27 38 Q 35 47 30 55" />
          <path d="M 35 60 Q 25 55 28 45 Q 38 52 35 60" />
        </g>
        {/* Right laurel */}
        <g fill="currentColor" fillOpacity="0.4">
          <path d="M 75 50 Q 80 40 75 30 Q 70 40 75 50" />
          <path d="M 70 55 Q 78 48 73 38 Q 65 47 70 55" />
          <path d="M 65 60 Q 75 55 72 45 Q 62 52 65 60" />
        </g>
        {/* Center check */}
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M 38 50 L 46 58 L 62 42" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  )
}

// Ornate form card wrapper
function OrnateFormCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative rounded-sm p-6 sm:p-8 md:p-10"
      style={{
        background: 'linear-gradient(145deg, #FBF9F7 0%, #F5F0E8 100%)',
        boxShadow: '0 4px 20px rgba(196, 163, 90, 0.1), 0 8px 40px rgba(44, 36, 22, 0.06)',
      }}
    >
      {/* Corner decorations */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-sm" />
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-sm" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold/30 rounded-bl-sm" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-sm" />

      {/* Inner border */}
      <div className="absolute inset-6 border border-gold/10 rounded-sm pointer-events-none" />

      <div className="relative">{children}</div>
    </div>
  )
}

export function RSVPForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const formattedDeadline = format(RSVP_DEADLINE, 'yyyy. MMMM d.', { locale: hu })

  const methods = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      dietaryRestrictions: '',
      additionalGuests: [],
      message: '',
      needsAccommodation: false,
      accommodationNights: 1,
      stayingForPizzaParty: false,
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods

  const needsAccommodation = watch('needsAccommodation')
  const additionalGuests = watch('additionalGuests')
  const totalGuests = 1 + (additionalGuests?.length || 0)

  const onSubmit = async (data: RSVPFormData) => {
    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      const rsvpData = {
        ...data,
        totalGuests: 1 + data.additionalGuests.length,
        accommodationNights: data.needsAccommodation ? data.accommodationNights : 0,
        submittedAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'rsvps'), rsvpData)
      setSubmitStatus('success')
    } catch (error) {
      console.error('RSVP submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('Hiba történt a küldés során. Kérlek, próbáld újra.')
    }
  }

  const accommodationNightOptions = Array.from(
    { length: MAX_ACCOMMODATION_NIGHTS },
    (_, i) => ({
      value: i + 1,
      label: `${i + 1} éjszaka`,
    })
  )

  // Calculate form progress based on filled fields
  const name = watch('name')
  const email = watch('email')
  const formProgress = !name ? 1 : !email ? 2 : 3

  if (submitStatus === 'success') {
    return (
      <Section className="relative overflow-hidden" id="rsvp">

        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mx-auto max-w-lg"
          >
            <OrnateFormCard>
              <div className="text-center">
                <SuccessAnimation />

                <h3
                  className="mt-8 text-2xl sm:text-3xl font-semibold text-ink"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  Köszönjük!
                </h3>

                <p
                  className="mt-4 text-lg sm:text-xl text-ink-soft leading-relaxed"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Visszajelzésedet rögzítettük. Hamarosan küldünk egy megerősítő e-mailt.
                </p>

                {/* Decorative flourish */}
                <div className="mt-8 flex justify-center">
                  <svg width="60" height="20" viewBox="0 0 60 20" className="text-gold/40">
                    <path d="M 5 10 Q 15 5 30 10 Q 45 15 55 10" stroke="currentColor" fill="none" strokeWidth="1" />
                    <circle cx="30" cy="10" r="2" fill="currentColor" />
                  </svg>
                </div>

                <p
                  className="mt-4 text-3xl sm:text-4xl text-gold"
                  style={{ fontFamily: 'var(--font-pinyon)' }}
                >
                  Vivien & Martin
                </p>
              </div>
            </OrnateFormCard>
          </motion.div>
        </Container>
      </Section>
    )
  }

  return (
    <Section className="relative overflow-hidden" id="rsvp">

      <Container>
        <div className="relative mx-auto max-w-2xl">
          <SectionHeader
            subtitle={
              <p
                className="mt-6 text-lg sm:text-xl text-ink-soft leading-relaxed"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Hogy a házigazdák minden tekintetben felkészülhessenek,
                visszajelzéseteket{' '}
                <span
                  className="inline-block border-b border-gold/40 pb-0.5 font-semibold text-ink"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  {formattedDeadline}
                </span>
                -ig várjuk.
              </p>
            }
          >
            Visszajelzés
          </SectionHeader>

          <FormProvider {...methods}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <OrnateFormCard>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormProgress step={formProgress} />

                  {/* Guest count feedback */}
                  {totalGuests > 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-6 text-center"
                    >
                      <span
                        className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2"
                        style={{ fontFamily: 'var(--font-cormorant)' }}
                      >
                        <span
                          className="text-lg font-semibold text-gold"
                          style={{ fontFamily: 'var(--font-cinzel)' }}
                        >
                          {totalGuests}
                        </span>
                        <span className="text-ink-soft">vendég</span>
                      </span>
                    </motion.div>
                  )}

                  {/* Basic info */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Név"
                      {...register('name')}
                      error={errors.name?.message}
                      required
                    />
                    <Input
                      label="E-mail cím"
                      type="email"
                      {...register('email')}
                      error={errors.email?.message}
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <Textarea
                      label="Ételérzékenység, allergia"
                      {...register('dietaryRestrictions')}
                      error={errors.dietaryRestrictions?.message}
                      placeholder="Ha nincs, hagyd üresen"
                    />
                  </div>

                  {/* Additional guests */}
                  <div className="mt-6">
                    <GuestFields />
                  </div>

                  <div className="mt-4">
                    <Textarea
                      label="Üzenet a párnak"
                      {...register('message')}
                      error={errors.message?.message}
                      placeholder="Opcionális"
                    />
                  </div>

                  {/* Decorative divider */}
                  <div className="my-8 flex items-center justify-center">
                    <div className="h-px flex-1 bg-gold/20" />
                    <svg width="40" height="20" viewBox="0 0 40 20" className="mx-4 text-gold/40">
                      <circle cx="20" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
                      <circle cx="20" cy="10" r="1.5" fill="currentColor" />
                    </svg>
                    <div className="h-px flex-1 bg-gold/20" />
                  </div>

                  {/* Accommodation */}
                  <div className="space-y-4 rounded-sm border border-gold/20 bg-ivory/50 p-5">
                    <Checkbox
                      label="Szállást kérek"
                      description="55.000 Ft / éj, 2 főre, reggelivel"
                      {...register('needsAccommodation')}
                    />

                    <AnimatePresence>
                      {needsAccommodation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <Select
                            label="Hány éjszakára?"
                            options={accommodationNightOptions}
                            {...register('accommodationNights', { valueAsNumber: true })}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Pizza party */}
                  <div className="mt-4 rounded-sm border border-gold/20 bg-ivory/50 p-5">
                    <Checkbox
                      label="Maradok a másnapi pizza partyra"
                      description="Másnap délután közös program azoknak, akik ott maradnak"
                      {...register('stayingForPizzaParty')}
                    />
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6 flex items-center gap-3 rounded-sm border border-wine/30 bg-wine/10 p-4"
                      >
                        <AlertCircle className="h-5 w-5 flex-shrink-0 text-wine" />
                        <p
                          className="text-lg text-wine"
                          style={{ fontFamily: 'var(--font-cormorant)' }}
                        >
                          {errorMessage}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <div className="mt-8">
                    <Button
                      type="submit"
                      isLoading={submitStatus === 'loading'}
                      className="w-full"
                    >
                      <Send className="h-4 w-4" />
                      Visszajelzés küldése
                    </Button>
                  </div>
                </form>
              </OrnateFormCard>
            </motion.div>
          </FormProvider>
        </div>
      </Container>
    </Section>
  )
}
