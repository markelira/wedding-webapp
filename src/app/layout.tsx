import type { Metadata } from 'next'
import { Cormorant_Garamond, Cinzel, Pinyon_Script } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
})

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pinyon',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vivien & Martin - Esküvői Meghívó',
  description: 'Szeretettel meghívunk Benneteket esküvőnkre 2026. május 7-én, Le Til Kúria, Biri.',
  keywords: ['esküvő', 'meghívó', 'Vivien', 'Martin', '2026'],
  authors: [{ name: 'Vivien & Martin' }],
  openGraph: {
    title: 'Vivien & Martin - Esküvői Meghívó',
    description: 'Szeretettel meghívunk Benneteket esküvőnkre 2026. május 7-én.',
    type: 'website',
    locale: 'hu_HU',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hu" className={`${cormorant.variable} ${cinzel.variable} ${pinyon.variable}`}>
      <body className="bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
