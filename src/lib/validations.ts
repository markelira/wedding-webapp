import { z } from 'zod'
import { MAX_ADDITIONAL_GUESTS, MAX_ACCOMMODATION_NIGHTS } from './constants'

export const additionalGuestSchema = z.object({
  name: z.string().min(2, 'A név legalább 2 karakter legyen'),
  dietaryRestrictions: z.string(),
})

export const rsvpFormSchema = z.object({
  name: z
    .string()
    .min(2, 'A név legalább 2 karakter legyen')
    .max(100, 'A név maximum 100 karakter lehet'),
  email: z
    .string()
    .email('Érvényes e-mail címet adj meg'),
  dietaryRestrictions: z
    .string()
    .max(500, 'Maximum 500 karakter'),
  additionalGuests: z
    .array(additionalGuestSchema)
    .max(MAX_ADDITIONAL_GUESTS, `Maximum ${MAX_ADDITIONAL_GUESTS} kísérő adható meg`),
  message: z
    .string()
    .max(1000, 'Maximum 1000 karakter'),
  needsAccommodation: z.boolean(),
  accommodationNights: z
    .number()
    .min(0)
    .max(MAX_ACCOMMODATION_NIGHTS),
  stayingForPizzaParty: z.boolean(),
})

export type RSVPFormData = z.infer<typeof rsvpFormSchema>
