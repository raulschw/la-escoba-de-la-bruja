import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'La Escoba de la Bruja',
  description: 'Tarot, videncia y astrología.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
