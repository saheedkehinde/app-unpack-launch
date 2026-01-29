import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'TIMAK CENTRE | Luxury Events, Hospitality & Dining',
  description: 'Experience luxury at TIMAK CENTRE - Ilorin\'s premier destination for weddings, corporate events, fine dining, and premium lodging. Where moments become timeless.',
  keywords: ['events', 'weddings', 'hospitality', 'dining', 'hotel', 'Ilorin', 'Nigeria', 'banquet hall', 'conference'],
  authors: [{ name: 'TIMAK CENTRE' }],
  openGraph: {
    title: 'TIMAK CENTRE | Luxury Events, Hospitality & Dining',
    description: 'Experience luxury at TIMAK CENTRE - Ilorin\'s premier destination for weddings, corporate events, fine dining, and premium lodging.',
    type: 'website',
    locale: 'en_NG',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1A1118' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
