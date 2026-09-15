import Image from 'next/image'
import Reveal from './Reveal'

const lugares = [
  {
    src: '/photos/chile-santiago.webp',
    label: 'Santiago',
    detalle: 'Región Metropolitana',
    alt: 'Vista aérea del skyline de Santiago de Chile',
    className: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: '/photos/chile-mineria.webp',
    label: 'Minería & industria',
    detalle: 'Norte de Chile',
    alt: 'Faena minera de cobre con camiones de extracción en el norte de Chile',
    className: '',
  },
  {
    src: '/photos/chile-valparaiso.webp',
    label: 'Valparaíso',
    detalle: 'Zona central',
    alt: 'Casas de colores en los cerros de Valparaíso',
    className: '',
  },
  {
    src: '/photos/chile-atacama.webp',
    label: 'Norte',
    detalle: 'Desierto de Atacama',
    alt: 'Paisaje del desierto de Atacama con montañas al fondo',
    className: '',
  },
  {
    src: '/photos/chile-patagonia.webp',
    label: 'Sur',
    detalle: 'Patagonia',
    alt: 'Torres del Paine en la Patagonia chilena',
    className: '',
  },
]

export default function ChileBand() {
  return (
    <section className="py-28 bg-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <span className="text-sm font-semibold text-primary/90 tracking-wide uppercase">
              Cobertura
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white leading-tight">
              Empresas en todo Chile, de Arica a Punta Arenas
            </h2>
            <p className="mt-4 text-white/60 text-lg leading-relaxed">
              Trabajamos con organizaciones medianas y grandes a lo largo del país
              — presencial en la zona central y de forma remota donde estés.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[9rem] sm:auto-rows-[10rem] gap-3 sm:gap-4">
            {lugares.map((l) => (
              <div
                key={l.label}
                className={`group relative rounded-2xl overflow-hidden ring-1 ring-white/10 ${l.className}`}
              >
                <Image
                  src={l.src}
                  alt={l.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="font-grotesk font-semibold text-white text-sm leading-tight">
                    {l.label}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">{l.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
