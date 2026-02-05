'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { LogOut, RefreshCw } from 'lucide-react'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import { LoginForm } from '@/components/admin/LoginForm'
import { StatCards } from '@/components/admin/StatCards'
import { RSVPTable } from '@/components/admin/RSVPTable'
import { Button } from '@/components/ui/Button'
import type { RSVPDocument } from '@/types'

export default function AdminPage() {
  const { user, isAdmin, loading, logout } = useAuth()
  const [rsvps, setRsvps] = useState<RSVPDocument[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!isAdmin) return

    const q = query(
      collection(db, 'rsvps'),
      orderBy('submittedAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rsvpData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as RSVPDocument[]

      setRsvps(rsvpData)
      setDataLoading(false)
    })

    return () => unsubscribe()
  }, [isAdmin])

  // Calculate stats
  const stats = {
    totalRSVPs: rsvps.length,
    totalGuests: rsvps.reduce((sum, r) => sum + r.totalGuests, 0),
    accommodationRequests: rsvps
      .filter((r) => r.needsAccommodation)
      .reduce((sum, r) => sum + r.totalGuests, 0),
    pizzaPartyAttendees: rsvps
      .filter((r) => r.stayingForPizzaParty)
      .reduce((sum, r) => sum + r.totalGuests, 0),
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <RefreshCw className="h-8 w-8 animate-spin text-gold" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-gold/20 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-script text-2xl text-gold">Vivien & Martin</h1>
            <p className="font-body text-sm text-deep-blue/70">Admin Dashboard</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Kijelentkezés
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Stats */}
          <StatCards stats={stats} />

          {/* Dietary restrictions summary */}
          {rsvps.some((r) => r.dietaryRestrictions) && (
            <div className="rounded-lg border border-gold/20 bg-white p-6 shadow-lg">
              <h2 className="font-display text-lg font-semibold text-deep-blue">
                Ételérzékenységek összesítve
              </h2>
              <div className="mt-4 space-y-2">
                {rsvps
                  .filter((r) => r.dietaryRestrictions)
                  .map((rsvp) => (
                    <div key={rsvp.id} className="flex items-start gap-2">
                      <span className="font-body font-medium text-deep-blue">
                        {rsvp.name}:
                      </span>
                      <span className="font-body text-deep-blue/70">
                        {rsvp.dietaryRestrictions}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* RSVP Table */}
          {dataLoading ? (
            <div className="flex justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : (
            <RSVPTable rsvps={rsvps} />
          )}
        </motion.div>
      </main>
    </div>
  )
}
