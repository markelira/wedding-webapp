import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { sendConfirmationEmail } from './email'

admin.initializeApp()

/**
 * Triggered when a new RSVP document is created in Firestore.
 * Sends a confirmation email to the guest.
 */
export const onRSVPCreated = functions
  .region('europe-west1') // Use EU region for Hungary
  .firestore
  .document('rsvps/{rsvpId}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data()

    if (!data || !data.email) {
      console.error('No email found in RSVP document')
      return null
    }

    try {
      await sendConfirmationEmail({
        name: data.name,
        email: data.email,
        totalGuests: data.totalGuests || 1,
        needsAccommodation: data.needsAccommodation || false,
        accommodationNights: data.accommodationNights || 0,
        stayingForPizzaParty: data.stayingForPizzaParty || false,
        dietaryRestrictions: data.dietaryRestrictions || '',
      })

      // Update document to mark email as sent
      await snapshot.ref.update({
        emailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      console.log(`Confirmation email sent to ${data.email}`)
      return { success: true }
    } catch (error) {
      console.error('Error sending confirmation email:', error)

      // Update document to mark email failure
      await snapshot.ref.update({
        emailSent: false,
        emailError: error instanceof Error ? error.message : 'Unknown error',
      })

      return { success: false, error }
    }
  })

/**
 * HTTP function to get RSVP statistics.
 * Protected - requires admin authentication.
 */
export const getRSVPStats = functions
  .region('europe-west1')
  .https.onCall(async (data, context) => {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Must be authenticated to access this function'
      )
    }

    // Verify admin status
    const adminDoc = await admin.firestore()
      .collection('admins')
      .doc(context.auth.uid)
      .get()

    if (!adminDoc.exists) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Must be an admin to access this function'
      )
    }

    try {
      const rsvpsSnapshot = await admin.firestore()
        .collection('rsvps')
        .get()

      let totalRSVPs = 0
      let totalGuests = 0
      let accommodationRequests = 0
      let pizzaPartyAttendees = 0
      const dietaryRestrictions: string[] = []

      rsvpsSnapshot.forEach((doc) => {
        const rsvp = doc.data()
        totalRSVPs++
        totalGuests += rsvp.totalGuests || 1

        if (rsvp.needsAccommodation) {
          accommodationRequests += rsvp.totalGuests || 1
        }

        if (rsvp.stayingForPizzaParty) {
          pizzaPartyAttendees += rsvp.totalGuests || 1
        }

        if (rsvp.dietaryRestrictions) {
          dietaryRestrictions.push(rsvp.dietaryRestrictions)
        }

        // Add dietary restrictions from additional guests
        if (rsvp.additionalGuests && Array.isArray(rsvp.additionalGuests)) {
          rsvp.additionalGuests.forEach((guest: { dietaryRestrictions?: string }) => {
            if (guest.dietaryRestrictions) {
              dietaryRestrictions.push(guest.dietaryRestrictions)
            }
          })
        }
      })

      return {
        totalRSVPs,
        totalGuests,
        accommodationRequests,
        pizzaPartyAttendees,
        dietaryRestrictions,
      }
    } catch (error) {
      console.error('Error fetching RSVP stats:', error)
      throw new functions.https.HttpsError(
        'internal',
        'Error fetching statistics'
      )
    }
  })
