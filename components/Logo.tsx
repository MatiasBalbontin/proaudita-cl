import { WORDMARK_PATH, WORDMARK_VIEWBOX } from '@/lib/brand-marks'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Proaudita"
      role="img"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0019FF" />
          <stop offset="100%" stopColor="#1A1A5E" />
        </linearGradient>
      </defs>
      <path d={WORDMARK_PATH} fill="url(#logo-gradient)" fillRule="evenodd" />
    </svg>
  )
}
