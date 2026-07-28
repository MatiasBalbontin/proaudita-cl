import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://proaudita.cl'),
  title: 'Proaudita | Auditoría estratégica. Resultados medibles.',
  description:
    'Auditoría de procesos, contabilidad completa, planificación tributaria y automatización de flujos para empresas y organizaciones en Chile. Matías Balbontín — Contador Auditor UdeC.',
  keywords: [
    'auditoría de procesos Chile',
    'contador auditor Chile',
    'planificación tributaria Chile',
    'automatización contable pymes',
    'auditoría contable empresas Chile',
    'diagnóstico financiero empresas',
    'Proaudita',
  ],
  authors: [{ name: 'Matías Balbontín' }],
  creator: 'Matías Balbontín',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://proaudita.cl',
    title: 'Proaudita | Auditoría estratégica. Resultados medibles.',
    description:
      'Triple formación: Contador Auditor, Ingeniería en Informática y Transformación Digital. Auditoría de procesos, contabilidad y automatización para organizaciones en Chile.',
    siteName: 'Proaudita',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proaudita | Auditoría estratégica. Resultados medibles.',
    description:
      'Auditoría estratégica transversal para empresas y organizaciones en Chile.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://proaudita.cl',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
