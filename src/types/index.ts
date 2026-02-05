import { Timestamp } from 'firebase/firestore'

export interface AdditionalGuest {
  name: string
  dietaryRestrictions: string
}

export interface RSVPDocument {
  id?: string
  name: string
  email: string
  dietaryRestrictions: string
  additionalGuests: AdditionalGuest[]
  message: string
  needsAccommodation: boolean
  accommodationNights: number
  stayingForPizzaParty: boolean
  submittedAt: Timestamp | Date
  totalGuests: number
}

export interface RSVPFormData {
  name: string
  email: string
  dietaryRestrictions: string
  additionalGuests: AdditionalGuest[]
  message: string
  needsAccommodation: boolean
  accommodationNights: number
  stayingForPizzaParty: boolean
}

export interface AdminStats {
  totalRSVPs: number
  totalGuests: number
  accommodationRequests: number
  pizzaPartyAttendees: number
  dietaryRestrictions: string[]
}
