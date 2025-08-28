import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HomePlate - Home Food Delivery Platform',
  description: 'Discover authentic, home-cooked meals from talented home chefs in your neighborhood. Fresh, delicious food delivered to your doorstep.',
  keywords: ['food delivery', 'home cooked food', 'local chefs', 'meal delivery', 'fresh food'],
  authors: [{ name: 'HomePlate Team' }],
  openGraph: {
    title: 'HomePlate - Home Food Delivery Platform',
    description: 'Discover authentic, home-cooked meals from talented home chefs in your neighborhood.',
    type: 'website',
    url: 'https://homeplate.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HomePlate - Home Food Delivery Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HomePlate - Home Food Delivery Platform',
    description: 'Discover authentic, home-cooked meals from talented home chefs in your neighborhood.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Safely get bucket slug with fallback
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG || 'homeplate-demo'

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}