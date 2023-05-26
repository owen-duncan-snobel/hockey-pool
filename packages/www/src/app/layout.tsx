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
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content="Experience the thrill of the annual Dohert & Ralph Hockey Pool, where you compete with fellow fans to predict tournaments outcomes and vie for ultimate glory." />
      <body className={albert_sans.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
