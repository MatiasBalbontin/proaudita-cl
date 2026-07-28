import { ImageResponse } from 'next/og'
import {
  MONOGRAM_PATH,
  MONOGRAM_VIEWBOX,
  WORDMARK_PATH,
  WORDMARK_VIEWBOX,
} from '@/lib/brand-marks'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#FFFFFF',
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(0,25,255,0.10) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(26,26,94,0.10) 0%, transparent 55%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            marginBottom: 48,
          }}
        >
          <svg width={44} height={30} viewBox={MONOGRAM_VIEWBOX} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="og-mono" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0019FF" />
                <stop offset="100%" stopColor="#1A1A5E" />
              </linearGradient>
            </defs>
            <path d={MONOGRAM_PATH} fill="url(#og-mono)" fillRule="evenodd" />
          </svg>
          <svg width={164} height={40} viewBox={WORDMARK_VIEWBOX} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="og-word" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0019FF" />
                <stop offset="100%" stopColor="#1A1A5E" />
              </linearGradient>
            </defs>
            <path d={WORDMARK_PATH} fill="url(#og-word)" fillRule="evenodd" />
          </svg>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            color: '#0D0D2B',
            maxWidth: 900,
          }}
        >
          <span>Auditoría estratégica.</span>
          <span style={{ color: '#0019FF' }}>Resultados medibles.</span>
        </div>

        <div style={{ fontSize: 26, color: '#6B7280', marginTop: 32, maxWidth: 820 }}>
          Contabilidad, procesos y tecnología en una sola mesa — para empresas
          y organizaciones en Chile.
        </div>
      </div>
    ),
    { ...size }
  )
}
