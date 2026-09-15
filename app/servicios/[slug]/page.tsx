import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { productos, getProducto } from '@/lib/productos'
import { promo } from '@/lib/promo'
import PromoTicker from '@/components/PromoTicker'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export async function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const producto = getProducto(slug)
  if (!producto) return {}
  return {
    title: `${producto.nombre} | Proaudita`,
    description: producto.tagline,
    alternates: { canonical: `https://proaudita.cl/servicios/${slug}` },
    openGraph: {
      title: `${producto.nombre} | Proaudita`,
      description: producto.tagline,
      url: `https://proaudita.cl/servicios/${slug}`,
    },
  }
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const producto = getProducto(slug)
  if (!producto) notFound()

  const otros = productos.filter((p) => p.slug !== producto.slug).slice(0, 3)

  return (
    <>
      <PromoTicker />
      <Navbar />
      <main className={promo.activa ? 'pt-[6.25rem]' : 'pt-16'}>
        {/* Hero del producto */}
        <section className="relative py-24 bg-ink overflow-hidden">
          {/* Imagen de fondo */}
          {producto.hero && (
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src={producto.hero}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-60"
              />
              {/* Oscurece la izquierda (donde va el texto) y deja ver la imagen a la derecha */}
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />
            </div>
          )}
          {/* Decoración */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full bg-navy/40 blur-3xl translate-y-1/2 -translate-x-1/4" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-10 flex items-center gap-2 text-sm text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/#servicios" className="hover:text-white/70 transition-colors">
                Servicios
              </Link>
              <span>/</span>
              <span className="text-white/70">{producto.nombre}</span>
            </nav>

            <div className="max-w-3xl">
              {producto.proximamente && (
                <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  Próximamente
                </span>
              )}

              <h1 className="font-grotesk text-4xl sm:text-5xl font-semibold text-white leading-tight mb-6">
                {producto.nombre}
              </h1>

              <p className="text-xl text-white/70 leading-relaxed mb-8">
                {producto.tagline}
              </p>

              <p className="text-base text-white/55 leading-relaxed max-w-2xl">
                {producto.descripcion}
              </p>

              {!producto.proximamente && (
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a
                    href="#contacto-producto"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-primary/25"
                  >
                    {producto.cta}
                  </a>
                  <a
                    href="https://wa.me/56994388261"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/10"
                  >
                    Preguntar por WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* El problema */}
        <section className="py-20 bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold text-primary tracking-wide uppercase">
                El problema
              </span>
              <p className="mt-4 text-xl text-ink leading-relaxed">
                {producto.problema}
              </p>
            </div>
          </div>
        </section>

        {/* Para quién es */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-grotesk text-2xl font-semibold text-ink mb-10">
              ¿Para quién es {producto.nombre}?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {producto.paraquien.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-gray-100">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-ink/80 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="py-20 bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-grotesk text-2xl font-semibold text-ink mb-10">
              Qué incluye
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {producto.queincluye.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                  <span className="font-grotesk font-semibold text-4xl text-navy/15 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-grotesk font-semibold text-ink mt-3 mb-2 text-sm">
                    {item.titulo}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resultado */}
        <section className="py-20 bg-ink">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm font-semibold text-primary/80 tracking-wide uppercase">
              El resultado
            </span>
            <p className="mt-4 text-2xl sm:text-3xl font-grotesk font-semibold text-white max-w-3xl mx-auto leading-snug">
              {producto.resultado}
            </p>
          </div>
        </section>

        {/* CTA / Contacto */}
        <section id="contacto-producto" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-grotesk text-2xl sm:text-3xl font-semibold text-ink mb-4">
                {producto.proximamente
                  ? '¿Te interesa saber cuándo estará disponible?'
                  : `¿Listo para comenzar con ${producto.nombre}?`}
              </h2>
              <p className="text-muted mb-8">
                {producto.proximamente
                  ? 'Déjanos tu email y serás el primero en conocer el lanzamiento del Toolkit.'
                  : 'El primer paso es un diagnóstico inicial sin costo. Conversamos 30 minutos, entendemos tu situación y te decimos si podemos ayudarte.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {producto.proximamente ? (
                  <a
                    href="/#contacto"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy transition-colors"
                  >
                    Notificarme
                  </a>
                ) : (
                  <>
                    <a
                      href="https://app.cal.com/matiasbalbontin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy transition-colors shadow-lg shadow-primary/20"
                    >
                      Agendar diagnóstico gratuito
                    </a>
                    <a
                      href="https://wa.me/56994388261"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-gray-200 text-ink font-semibold px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors"
                    >
                      WhatsApp
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Otros productos */}
        <section className="py-20 bg-surface border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-grotesk text-xl font-semibold text-ink mb-8">
              Otros servicios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otros.map((p) => (
                <Link
                  key={p.slug}
                  href={`/servicios/${p.slug}`}
                  className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-200"
                >
                  <p className="font-grotesk font-semibold text-sm text-ink group-hover:text-primary transition-colors mb-1">
                    {p.nombre}
                  </p>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {p.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Ver más
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
