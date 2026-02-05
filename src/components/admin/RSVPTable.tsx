'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { hu } from 'date-fns/locale'
import { ChevronDown, ChevronUp, Download, Search } from 'lucide-react'
import Papa from 'papaparse'
import type { RSVPDocument } from '@/types'
import { Button } from '@/components/ui/Button'

interface RSVPTableProps {
  rsvps: RSVPDocument[]
}

type SortField = 'name' | 'submittedAt' | 'totalGuests'
type SortDirection = 'asc' | 'desc'

export function RSVPTable({ rsvps }: RSVPTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('submittedAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredRSVPs = rsvps.filter((rsvp) =>
    rsvp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rsvp.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedRSVPs = [...filteredRSVPs].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1

    if (sortField === 'name') {
      return direction * a.name.localeCompare(b.name)
    }
    if (sortField === 'totalGuests') {
      return direction * (a.totalGuests - b.totalGuests)
    }
    if (sortField === 'submittedAt') {
      const aDate = a.submittedAt instanceof Date ? a.submittedAt : a.submittedAt.toDate()
      const bDate = b.submittedAt instanceof Date ? b.submittedAt : b.submittedAt.toDate()
      return direction * (aDate.getTime() - bDate.getTime())
    }
    return 0
  })

  const exportToCSV = () => {
    const csvData = rsvps.map((rsvp) => ({
      Név: rsvp.name,
      'E-mail': rsvp.email,
      'Vendégek száma': rsvp.totalGuests,
      Ételérzékenység: rsvp.dietaryRestrictions || '-',
      Kísérők: rsvp.additionalGuests.map((g) => `${g.name} (${g.dietaryRestrictions || 'nincs allergia'})`).join('; ') || '-',
      Szállás: rsvp.needsAccommodation ? `Igen (${rsvp.accommodationNights} éj)` : 'Nem',
      'Pizza party': rsvp.stayingForPizzaParty ? 'Igen' : 'Nem',
      Üzenet: rsvp.message || '-',
      Beküldve: format(
        rsvp.submittedAt instanceof Date ? rsvp.submittedAt : rsvp.submittedAt.toDate(),
        'yyyy.MM.dd HH:mm',
        { locale: hu }
      ),
    }))

    const csv = Papa.unparse(csvData)
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `rsvp-export-${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )
  }

  return (
    <div className="rounded-lg border border-gold/20 bg-white shadow-lg">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gold/20 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-deep-blue/40" />
          <input
            type="text"
            placeholder="Keresés név vagy e-mail alapján..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gold/30 bg-ivory py-2 pl-10 pr-4 font-body text-deep-blue focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 sm:w-64"
          />
        </div>
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="h-4 w-4" />
          Exportálás CSV-be
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-ivory/50">
            <tr>
              <th
                className="cursor-pointer px-4 py-3 text-left font-body text-sm font-medium text-deep-blue/70 hover:text-deep-blue"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Név
                  <SortIcon field="name" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-body text-sm font-medium text-deep-blue/70">
                E-mail
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left font-body text-sm font-medium text-deep-blue/70 hover:text-deep-blue"
                onClick={() => handleSort('totalGuests')}
              >
                <div className="flex items-center gap-1">
                  Vendégek
                  <SortIcon field="totalGuests" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-body text-sm font-medium text-deep-blue/70">
                Szállás
              </th>
              <th className="px-4 py-3 text-left font-body text-sm font-medium text-deep-blue/70">
                Pizza
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left font-body text-sm font-medium text-deep-blue/70 hover:text-deep-blue"
                onClick={() => handleSort('submittedAt')}
              >
                <div className="flex items-center gap-1">
                  Beküldve
                  <SortIcon field="submittedAt" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {sortedRSVPs.map((rsvp) => (
              <motion.tr
                key={rsvp.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-ivory/30"
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="font-body font-medium text-deep-blue">{rsvp.name}</p>
                    {rsvp.additionalGuests.length > 0 && (
                      <p className="font-body text-xs text-deep-blue/60">
                        +{rsvp.additionalGuests.length} kísérő
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-body text-sm text-deep-blue/80">
                  {rsvp.email}
                </td>
                <td className="px-4 py-3 font-body text-sm text-deep-blue/80">
                  {rsvp.totalGuests} fő
                </td>
                <td className="px-4 py-3">
                  {rsvp.needsAccommodation ? (
                    <span className="rounded-full bg-sage/20 px-2 py-1 font-body text-xs text-sage">
                      {rsvp.accommodationNights} éj
                    </span>
                  ) : (
                    <span className="font-body text-sm text-deep-blue/40">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {rsvp.stayingForPizzaParty ? (
                    <span className="rounded-full bg-blush/30 px-2 py-1 font-body text-xs text-burgundy">
                      Igen
                    </span>
                  ) : (
                    <span className="font-body text-sm text-deep-blue/40">-</span>
                  )}
                </td>
                <td className="px-4 py-3 font-body text-sm text-deep-blue/60">
                  {format(
                    rsvp.submittedAt instanceof Date ? rsvp.submittedAt : rsvp.submittedAt.toDate(),
                    'MM.dd. HH:mm',
                    { locale: hu }
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {sortedRSVPs.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-body text-deep-blue/50">
              {searchQuery ? 'Nincs találat' : 'Még nincs visszajelzés'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
