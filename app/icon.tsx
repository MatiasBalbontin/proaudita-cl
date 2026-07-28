import { ImageResponse } from 'next/og'
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from '@/lib/brand-marks'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={22} height={15} viewBox={MONOGRAM_VIEWBOX} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0019FF" />
              <stop offset="100%" stopColor="#1A1A5E" />
            </linearGradient>
          </defs>
          <path d={MONOGRAM_PATH} fill="url(#g)" fillRule="evenodd" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
