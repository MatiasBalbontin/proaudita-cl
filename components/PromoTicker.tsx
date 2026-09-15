const WHATSAPP =
  'https://wa.me/56994388261?text=' +
  encodeURIComponent(
    'Hola, vengo por la promoción: quiero agendar una reunión y cotizar mi plan de contabilidad desde $50.000 mensuales.'
  )

function Mensaje() {
  return (
    <span className="mx-6 flex items-center gap-2 text-xs sm:text-sm font-medium">
      <svg
        className="w-3.5 h-3.5 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
      Por período limitado — agenda una reunión y cotiza tu plan de contabilidad desde{' '}
      <b className="font-semibold">$50.000</b> mensuales
      <span className="ml-2 inline-flex items-center gap-1 font-semibold">
        Escríbenos por WhatsApp
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </span>
  )
}

export default function PromoTicker() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Promoción por período limitado: agenda una reunión y cotiza tu plan de contabilidad desde $50.000 mensuales. Escríbenos por WhatsApp."
      className="group fixed top-0 inset-x-0 z-[60] flex h-9 items-center overflow-hidden bg-primary text-white"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((grupo) => (
          <div className="flex items-center" key={grupo} aria-hidden={grupo === 1}>
            <Mensaje />
            <Mensaje />
            <Mensaje />
          </div>
        ))}
      </div>
    </a>
  )
}
