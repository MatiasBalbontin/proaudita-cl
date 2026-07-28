import Reveal from './Reveal'

const credentials = [
  {
    degree: 'Contador Auditor',
    institution: 'Universidad de Concepción',
    year: '2024',
    note: 'Decreto 2024-5478',
  },
  {
    degree: 'Ingeniería en Informática',
    institution: 'En proceso',
    year: '',
    note: '',
  },
  {
    degree: 'Digital Transformation Management',
    institution: 'UNAB + Arizona State University (W.P. Carey)',
    year: '2026',
    note: '',
  },
  {
    degree: 'Dirección y Gestión de Proyectos',
    institution: 'Universidad Nacional de Córdoba (edX)',
    year: '2022',
    note: '',
  },
]

const capabilities = [
  { label: 'IA y datos', detail: 'IBM Granite · IBM SkillsBuild' },
  { label: 'Cloud', detail: 'Microsoft Azure' },
  { label: 'Programación', detail: 'Python' },
  { label: 'Bases de datos', detail: 'Database Foundations (IBM)' },
]

export default function Profile() {
  return (
    <section id="perfil" className="relative py-28 bg-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/2 -left-32 -translate-y-1/2 w-80 h-80 rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #1A1A5E 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — bio */}
          <Reveal>
            <div>
              <span className="text-sm font-semibold text-primary tracking-wide uppercase">
                Perfil
              </span>

              <div className="mt-4 flex items-center gap-5">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-navy flex items-center justify-center text-white font-grotesk font-semibold text-xl shadow-lg shadow-primary/20">
                  MB
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                    Matías Balbontín
                  </h2>
                  <p className="text-muted text-sm mt-0.5">
                    Contador Auditor · Ingeniería en Informática · Transformación Digital
                  </p>
                </div>
              </div>

              <blockquote className="mt-10 pl-6 border-l-2 border-primary">
                <p className="font-grotesk text-xl sm:text-2xl text-ink leading-snug">
                  &ldquo;Tengo formación triple que escasea en Chile — eso me
                  permite sentarme en la mesa con cada área de tu organización
                  y tener algo útil que decir.&rdquo;
                </p>
              </blockquote>

              <div className="mt-8 space-y-4 text-muted leading-relaxed">
                <p>
                  Trabajo con empresas y organizaciones que quieren entender de
                  verdad qué está pasando en su operación — y luego mejorarla.
                  No solo reportar el pasado, sino construir sistemas que
                  funcionen mejor.
                </p>
                <p>
                  El diagnóstico inicial es siempre sin costo y sin compromiso.
                  En 30 minutos entiendo tu situación y te digo si puedo ayudarte.
                </p>
              </div>

              <a
                href="https://app.cal.com/matiasbalbontin"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-navy transition-colors"
              >
                Agendar diagnóstico gratuito
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </Reveal>

          {/* Right — credentials + capabilities */}
          <Reveal delay={120}>
            <div className="space-y-8">
              {/* Credentials */}
              <div>
                <h3 className="font-grotesk font-semibold text-ink text-sm uppercase tracking-wide text-muted mb-4">
                  Formación
                </h3>
                <div className="space-y-3">
                  {credentials.map((c) => (
                    <div
                      key={c.degree}
                      className="flex gap-4 p-4 bg-surface rounded-xl border border-gray-200 hover:border-primary/20 transition-colors"
                    >
                      <div
                        className="mt-0.5 w-2 h-2 rounded-full bg-primary flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-grotesk font-semibold text-ink text-sm">
                          {c.degree}
                          {c.year && (
                            <span className="ml-2 font-normal text-muted text-xs">
                              {c.year}
                            </span>
                          )}
                        </p>
                        <p className="text-muted text-sm mt-0.5">{c.institution}</p>
                        {c.note && (
                          <p className="text-muted/60 text-xs mt-0.5">{c.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical capabilities */}
              <div>
                <h3 className="font-grotesk font-semibold text-ink text-sm uppercase tracking-wide text-muted mb-4">
                  Capacidades técnicas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {capabilities.map((cap) => (
                    <div
                      key={cap.label}
                      className="p-3 bg-surface rounded-xl border border-gray-200 hover:border-primary/20 transition-colors"
                    >
                      <p className="font-grotesk font-semibold text-xs text-navy">
                        {cap.label}
                      </p>
                      <p className="text-muted text-xs mt-0.5">{cap.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
