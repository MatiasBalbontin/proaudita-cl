import Reveal from './Reveal'

const groups = [
  {
    index: '01',
    label: 'Auditoría y diagnóstico',
    services: [
      {
        title: 'Auditoría de procesos y gestión',
        description:
          'Mapeo, evaluación y optimización de flujos operacionales con el mismo estándar de rigor que exige un rol contralor — el que la Contraloría aplica en el sector público, llevado también a empresas privadas. Identifico cuellos de botella, riesgos y oportunidades de mejora con visión contable y tecnológica.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
      },
      {
        title: 'Diagnóstico y ordenamiento contable-financiero',
        description:
          'Estado real de tu organización. Reviso la estructura contable y financiera, detecto inconsistencias y propongo un plan de ordenamiento accionable.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
      },
    ],
  },
  {
    index: '02',
    label: 'Contabilidad y tributario',
    services: [
      {
        title: 'Contabilidades completas',
        description:
          'Registro, control y reporte contable mensual. Llevanza completa del ciclo contable, para que tus números estén al día todo el año — no solo cuando toca fiscalizar.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        title: 'Planificación tributaria',
        description:
          'Optimización de la carga tributaria dentro del marco legal chileno. Análisis de estructura y estrategia para pagar lo justo — no más, no menos.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    index: '03',
    label: 'Tecnología y procesos',
    services: [
      {
        title: 'Automatización de flujos de trabajo',
        description:
          'Eliminación de procesos repetitivos mediante tecnología. Desde automatización de reportes hasta flujos completos de aprobación — sin código en la mayoría de los casos.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ),
      },
    ],
  },
]

export default function Services() {
  return (
    <section id="servicios" className="relative py-28 bg-surface overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #0019FF 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="max-w-2xl mb-20">
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Servicios
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-ink leading-tight">
              Procesos, gestión, contabilidad
              <br className="hidden sm:block" /> y tecnología avanzada
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">
              Todo en una sola mesa — no necesitas tres proveedores distintos. El
              cruce de disciplinas es donde está el valor real, para empresas y
              organizaciones públicas por igual.
            </p>
          </div>
        </Reveal>

        {/* Groups */}
        <div className="space-y-20">
          {groups.map((group) => (
            <Reveal key={group.label}>
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,10rem)_1fr] gap-6 md:gap-10">
                {/* Ghost index + label rail */}
                <div className="flex md:flex-col md:items-start items-center gap-4 md:gap-2">
                  <span className="font-grotesk font-semibold text-5xl md:text-6xl text-navy/25 leading-none">
                    {group.index}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary md:mt-1">
                    {group.label}
                  </span>
                </div>

                {/* Service cards */}
                <div
                  className={`grid gap-4 ${
                    group.services.length === 1
                      ? 'grid-cols-1 lg:grid-cols-2'
                      : 'grid-cols-1 md:grid-cols-2'
                  }`}
                >
                  {group.services.map((svc) => (
                    <article
                      key={svc.title}
                      className={`group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/40 hover:shadow-lg hover:shadow-navy/5 hover:-translate-y-1 transition-all duration-300 ${
                        group.services.length === 1 ? 'lg:col-span-1' : ''
                      }`}
                    >
                      <div className="w-10 h-10 bg-primary/8 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {svc.icon}
                      </div>
                      <h3 className="font-grotesk font-semibold text-ink text-sm mb-2">
                        {svc.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {svc.description}
                      </p>
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-6 bottom-6 w-0.5 bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-full"
                      />
                    </article>
                  ))}
                  {group.services.length === 1 && (
                    <div className="hidden lg:flex items-center justify-center rounded-2xl border-2 border-dashed border-primary/25 p-6 text-center">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          ¿Tu desafío no está aquí?
                        </p>
                        <p className="text-sm text-muted mt-1">
                          El diagnóstico inicial es gratuito
                          <br />y sin compromiso.
                        </p>
                        <a
                          href="https://app.cal.com/matiasbalbontin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block text-sm font-semibold text-primary hover:text-navy transition-colors"
                        >
                          Conversemos →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA below */}
        <Reveal>
          <div className="mt-16 text-center">
            <a
              href="https://app.cal.com/matiasbalbontin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-navy transition-colors"
            >
              Agendar diagnóstico gratuito (30 min)
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
