'use client'

import { motion } from 'framer-motion'
import { Users, Hotel, Pizza } from 'lucide-react'

interface StatCardsProps {
  stats: {
    totalRSVPs: number
    totalGuests: number
    accommodationRequests: number
    pizzaPartyAttendees: number
  }
}

export function StatCards({ stats }: StatCardsProps) {
  const cards = [
    {
      label: 'Visszajelzések',
      value: stats.totalRSVPs,
      icon: Users,
      color: 'text-deep-blue',
      bg: 'bg-powder/30',
    },
    {
      label: 'Összes vendég',
      value: stats.totalGuests,
      icon: Users,
      color: 'text-gold',
      bg: 'bg-champagne/50',
    },
    {
      label: 'Szállás igények',
      value: stats.accommodationRequests,
      icon: Hotel,
      color: 'text-sage',
      bg: 'bg-sage/20',
    },
    {
      label: 'Pizza party',
      value: stats.pizzaPartyAttendees,
      icon: Pizza,
      color: 'text-burgundy',
      bg: 'bg-blush/30',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-lg border border-gold/20 ${card.bg} p-6`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-sm text-deep-blue/70">{card.label}</p>
              <p className={`mt-1 font-display text-3xl font-semibold ${card.color}`}>
                {card.value}
              </p>
            </div>
            <card.icon className={`h-8 w-8 ${card.color} opacity-50`} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
