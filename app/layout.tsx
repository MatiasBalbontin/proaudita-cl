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
      'Auditoría de procesos, planificación tributaria y automatización para empresas medianas y grandes en Chile. Matías Balbontín — Contador Auditor UdeC.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://proaudita.cl/#founder',
      name: 'Matías Balbontín',
      jobTitle: 'Socio Fundador y CEO',
      worksFor: { '@id': 'https://proaudita.cl/#firm' },
    },
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': 'https://proaudita.cl/#firm',
      name: 'Proaudita',
      url: 'https://proaudita.cl',
      description:
        'Auditoría estratégica, tributación y consultoría de procesos para empresas en Chile.',
      areaServed: { '@type': 'Country', name: 'Chile' },
      telephone: '+56994388261',
      founder: { '@id': 'https://proaudita.cl/#founder' },
      serviceType: [
        'Auditoría de procesos',
        'Diagnóstico contable-financiero',
        'Planificación tributaria',
        'Contabilidades completas',
        'Automatización de flujos de trabajo',
      ],
      knowsAbout: ['Auditoría', 'Tributación', 'Contabilidad', 'Automatización'],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
