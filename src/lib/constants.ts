// Wedding details
export const WEDDING_DATE = new Date('2026-05-07T15:00:00+02:00')
export const RSVP_DEADLINE = new Date('2026-04-07T23:59:59+02:00')

// Venue details
export const VENUE = {
  name: 'Le Til Kúria',
  address: 'Biri, Fő utca 94, 4235',
  coordinates: {
    lat: 47.80636316493026,
    lng: 21.853674719797173,
  },
  mapUrl: 'https://maps.app.goo.gl/iQHPPGwRCzyBtVKu9',
}

// Accommodation
export const ACCOMMODATION = {
  pricePerNight: 55000, // HUF
  guestsPerRoom: 2,
  includesBreakfast: true,
  maxNights: 3,
}

// Program schedule
export const PROGRAM = [
  { time: '15:00', event: 'Érkezés, vendégvárás' },
  { time: '16:00', event: 'Ceremónia' },
  { time: '19:00', event: 'Vacsora' },
  { time: '21:00', event: 'Nyitótánc' },
  { time: '22:30', event: 'Torta' },
  { time: '23:30', event: 'Menyasszonytánc' },
  { time: '00:00+', event: 'Buli hajnalig' },
]

// Form limits
export const MAX_ADDITIONAL_GUESTS = 5
export const MAX_ACCOMMODATION_NIGHTS = 3
