import Reveal from './Reveal'

const steps = [
  {
    n: '01',
    title: 'Diagnóstico',
    duration: '30 min · sin costo',
    description:
      'Conversamos sobre tu organización. Salgo con una lectura honesta de tu situación — y te digo si puedo ayudarte o no.',
  },
  {
    n: '02',
    title: 'Propuesta',
    duration: 'dentro de 48 horas',
    description:
      'Alcance, plazos y forma de trabajo por escrito. Sin letra chica ni compromisos abiertos.',
  },
  {
    n: '03',
    title: 'Ejecución',
    duration: 'según alcance acordado',
    description:
      'Trabajo con avances visibles, no una caja negra hasta el informe final. Reporto en el camino.',
  },
  {
    n: '04',
    title: 'Seguimiento',
    duration: 'continuo',
    description:
      'Cierre de hallazgos, ajustes y disponibilidad para lo que surja después de la entrega.',
  },
]

export default function Process() {
  return (
    <section id="proceso" className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Cómo trabajamos
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-ink leading-tight">
              De la primera llamada al resultado, sin sorpresas
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">
              Cuatro pasos claros. Sabes qué esperar antes de agendar.
            </p>
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent"
          />

          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div className="relative">
                <div className="flex items-center gap-3 md:block">
                  <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-primary text-primary font-grotesk font-semibold text-sm shrink-0">
                    {step.n}
                  </span>
                  <h3 className="md:mt-5 font-grotesk font-semibold text-ink text-base">
                    {step.title}
                  </h3>
                </div>
                <p className="md:mt-1 text-xs font-medium text-primary/80 uppercase tracking-wide ml-[3.75rem] md:ml-0">
                  {step.duration}
                </p>
                <p className="mt-2 md:mt-3 text-muted text-sm leading-relaxed ml-[3.75rem] md:ml-0">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
