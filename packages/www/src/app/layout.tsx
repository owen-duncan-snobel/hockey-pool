import './globals.css'
import { Albert_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const albert_sans = Albert_Sans({ 
  subsets: ['latin'],
  weight: [
    '100', 
    '200', 
    '300',
    '400', 
    '500', 
    '600', 
    '700', 
    '800', 
    '900'
  ]
})

export const metadata = {
  title: 'Hockey pool',
  description: 'Annual doherty hockey pool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={albert_sans.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
