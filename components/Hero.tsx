import Reveal from './Reveal'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center bg-white pt-24 pb-16"
    >
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-surface text-sm font-medium text-navy px-4 py-1.5 rounded-full mb-8 border border-navy/10">
            <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
            Auditoría &amp; Consultoría Estratégica para Empresas
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-grotesk font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-ink mb-6">
            Auditoría estratégica.{' '}
            <span className="text-gradient">Resultados medibles.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-lg sm:text-xl text-muted max-w-xl mb-10 leading-relaxed">
            Auditoría, tributación y consultoría de procesos para empresas grandes y
            medianas que buscan resultados medibles, no solo cumplimiento.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-navy transition-colors shadow-lg shadow-primary/25"
            >
              Solicitar una reunión
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 bg-white text-base font-semibold text-navy border-2 border-navy/30 px-7 py-3.5 rounded-xl hover:border-primary hover:text-primary transition-colors"
            >
              Ver servicios
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-4 text-sm text-muted/80">
            Nuestro equipo evalúa tu caso y responde dentro de 24 horas hábiles.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy/70 font-medium">
            <span>Auditoría &amp; Assurance</span>
            <span aria-hidden="true">·</span>
            <span>Tax Advisory</span>
            <span aria-hidden="true">·</span>
            <span>Risk &amp; Procesos</span>
            <span aria-hidden="true">·</span>
            <span>Consultoría Tecnológica</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
