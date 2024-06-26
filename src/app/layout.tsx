import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Noise Effect',
  description: 'Copy and Paste magic effect ✨',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen bg-background font-sans antialiased dark', fontSans.variable)}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
