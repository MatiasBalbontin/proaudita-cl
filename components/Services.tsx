import Link from 'next/link'
import Reveal from './Reveal'

const grupos = [
  {
    index: '01',
    label: 'Auditoría & Assurance',
    productos: [
      {
        slug: 'diagnostico',
        nombre: 'Proaudita Diagnóstico',
        tagline: 'Detecta qué está fallando en tu empresa y cuánto te está costando.',
        icono: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
      },
      {
        slug: 'data',
        nombre: 'Proaudita Data',
        tagline: 'Decide con números reales, no con intuición.',
        icono: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
      },
    ],
  },
  {
    index: '02',
    label: 'Tax Advisory',
    productos: [
      {
        slug: 'tax',
        nombre: 'Proaudita Tax',
        tagline: 'Paga lo justo. Elimina el riesgo tributario.',
        icono: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    index: '03',
    label: 'Compliance & Reporting',
    productos: [
      {
        slug: 'control',
        nombre: 'Proaudita Control',
        tagline: 'Cumplimiento contable continuo, sin sorpresas.',
        icono: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    index: '04',
    label: 'Tecnología & Automatización',
    productos: [
      {
        slug: 'flow',
        nombre: 'Proaudita Flow',
        tagline: 'Elimina el trabajo manual y los errores de proceso.',
        icono: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ),
      },
      {
        slug: 'toolkit',
        nombre: 'Proaudita Toolkit',
        tagline: 'Herramientas digitales para pymes.',
        icono: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        ),
        badge: 'Próximamente',
      },
    ],
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-28 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-20">
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Línea de productos
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-ink leading-tight">
              Auditoría, impuestos, procesos y tecnología
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">
              Un enfoque multidisciplinario para empresas que necesitan más que
              cumplimiento normativo — necesitan visibilidad real sobre su operación.
            </p>
          </div>
        </Reveal>

        <div className="space-y-20">
          {grupos.map((grupo) => (
            <Reveal key={grupo.label}>
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,10rem)_1fr] gap-6 md:gap-10">
                <div className="flex md:flex-col md:items-start items-center gap-4 md:gap-2">
                  <span className="font-grotesk font-semibold text-5xl md:text-6xl text-navy/25 leading-none">
                    {grupo.index}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary md:mt-1">
                    {grupo.label}
                  </span>
                </div>

                <div
                  className={`grid gap-4 ${
                    grupo.productos.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {grupo.productos.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/servicios/${p.slug}`}
                      className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/40 hover:shadow-lg hover:shadow-navy/5 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-primary/8 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {p.icono}
                      </div>

                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-grotesk font-semibold text-ink text-sm">
                          {p.nombre}
                        </h3>
                        {'badge' in p && p.badge && (
                          <span className="flex-shrink-0 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                            Próximamente
                          </span>
                        )}
                      </div>

                      <p className="text-muted text-sm leading-relaxed mb-4">
                        {p.tagline}
                      </p>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Ver más
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>

                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-6 bottom-6 w-0.5 bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-full"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 text-center">
            <p className="text-muted text-sm mb-2">
              ¿Tu necesidad no está en esta lista?
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-navy transition-colors"
            >
              Conversemos
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
