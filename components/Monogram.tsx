import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from '@/lib/brand-marks'

export default function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Proaudita"
      role="img"
    >
      <defs>
        <linearGradient id="monogram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0019FF" />
          <stop offset="100%" stopColor="#1A1A5E" />
        </linearGradient>
      </defs>
      <path d={MONOGRAM_PATH} fill="url(#monogram-gradient)" fillRule="evenodd" />
    </svg>
  )
}
