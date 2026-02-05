import * as sgMail from '@sendgrid/mail'
import * as functions from 'firebase-functions'

interface RSVPEmailData {
  name: string
  email: string
  totalGuests: number
  needsAccommodation: boolean
  accommodationNights: number
  stayingForPizzaParty: boolean
  dietaryRestrictions: string
}

export async function sendConfirmationEmail(data: RSVPEmailData): Promise<void> {
  const config = functions.config()
  sgMail.setApiKey(config.sendgrid.key)

  const accommodationText = data.needsAccommodation
    ? `Igen, ${data.accommodationNights} éjszakára`
    : 'Nem'

  const pizzaText = data.stayingForPizzaParty ? 'Igen' : 'Nem'

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: 'Georgia', serif;
          line-height: 1.6;
          color: #1a365d;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #FAF9F6;
        }
        .header {
          text-align: center;
          padding: 30px 0;
          border-bottom: 1px solid #E6BE8A;
        }
        .header h1 {
          color: #E6BE8A;
          font-size: 28px;
          margin: 0;
        }
        .content {
          padding: 30px 0;
        }
        .details {
          background-color: #FFFFF0;
          border: 1px solid #E6BE8A;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #F7E7CE;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .label {
          color: #1a365d;
          opacity: 0.7;
        }
        .value {
          font-weight: 600;
        }
        .footer {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid #E6BE8A;
          color: #1a365d;
          opacity: 0.7;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Vivien & Martin</h1>
        <p style="color: #E6BE8A; margin-top: 10px;">Esküvői Meghívó</p>
      </div>

      <div class="content">
        <p>Kedves ${data.name}!</p>

        <p>Köszönjük szépen a visszajelzésedet! Örömmel értesítünk, hogy rögzítettük a jelentkezésedet esküvőnkre.</p>

        <div class="details">
          <div class="detail-row">
            <span class="label">Vendégek száma:</span>
            <span class="value">${data.totalGuests} fő</span>
          </div>
          <div class="detail-row">
            <span class="label">Szállás:</span>
            <span class="value">${accommodationText}</span>
          </div>
          <div class="detail-row">
            <span class="label">Pizza party:</span>
            <span class="value">${pizzaText}</span>
          </div>
          ${data.dietaryRestrictions ? `
          <div class="detail-row">
            <span class="label">Ételérzékenység:</span>
            <span class="value">${data.dietaryRestrictions}</span>
          </div>
          ` : ''}
        </div>

        <p>Ha bármilyen kérdésed lenne, ne habozz felvenni velünk a kapcsolatot!</p>

        <p>Szeretettel várunk,</p>
        <p style="font-style: italic; color: #E6BE8A; font-size: 20px;">Vivien & Martin</p>
      </div>

      <div class="footer">
        <p>2026. május 7. | Le Til Kúria, Biri</p>
      </div>
    </body>
    </html>
  `

  const msg = {
    to: data.email,
    from: config.sendgrid.from,
    subject: 'Vivien & Martin esküvő - Visszajelzés megerősítése',
    html: htmlContent,
  }

  await sgMail.send(msg)
}
