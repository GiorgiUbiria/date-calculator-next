import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ThemeProvider from "@/providers/ThemeProvider"

import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Date Calculator',
  description: 'Calculate the time from, or time to the desired date.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SupabaseProvider>
        <UserProvider>
          <ModalProvider />
          <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </UserProvider>
      </SupabaseProvider>
    </html>
  )
}
