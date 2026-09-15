'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const slides = [
  {
    src: '/photos/hero-santiago.webp',
    alt: 'Skyline de Santiago de Chile al atardecer con la cordillera de los Andes',
  },
  {
    src: '/photos/chile-santiago.webp',
    alt: 'Vista aérea del centro financiero de Santiago de Chile',
  },
  {
    src: '/photos/chile-valparaiso.webp',
    alt: 'Casas de colores en los cerros de Valparaíso',
  },
  {
    src: '/photos/chile-patagonia.webp',
    alt: 'Torres del Paine en la Patagonia chilena',
  },
  {
    src: '/photos/chile-atacama.webp',
    alt: 'Paisaje del desierto de Atacama',
  },
]

const INTERVALO = 4500

export default function HeroCarousel() {
  const [activo, setActivo] = useState(0)

  useEffect(() => {
    const t = setInterval(
      () => setActivo((p) => (p + 1) % slides.length),
      INTERVALO
    )
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-navy/20 ring-1 ring-navy/5">
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={i === activo ? s.alt : ''}
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 26rem"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === activo ? 'opacity-100 animate-kenburns' : 'opacity-0'
          }`}
        />
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"
      />

      {/* Indicadores */}
      <div className="absolute bottom-4 right-4 flex gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setActivo(i)}
            aria-label={`Ver imagen ${i + 1} de ${slides.length}`}
            aria-current={i === activo}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activo ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
