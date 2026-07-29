import Reveal from './Reveal'

const credentials = [
  {
    degree: 'Contador Auditor',
    institution: 'Universidad de Concepción · 2024',
  },
  {
    degree: 'Ingeniería en Informática',
    institution: 'UNAB',
  },
  {
    degree: 'Digital Transformation Management',
    institution: 'UNAB + Arizona State University · 2026',
  },
  {
    degree: 'Dirección y Gestión de Proyectos',
    institution: 'Universidad Nacional de Córdoba · 2022',
  },
]

export default function Profile() {
  return (
    <section id="perfil" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold text-primary tracking-wide uppercase">
          Liderazgo
        </span>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-12 lg:gap-16 items-start">
          {/* Left — photo, name, credentials */}
          <Reveal>
            <div>
              <div className="aspect-[4/5] w-full max-w-xs rounded-2xl bg-gradient-to-br from-primary to-navy flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-grotesk font-semibold text-6xl">
                  MB
                </span>
              </div>

              <h2 className="mt-6 text-xl font-semibold text-ink leading-tight">
                Matías Balbontín
              </h2>
              <p className="text-muted text-sm mt-0.5">Socio Fundador y CEO</p>

              <div className="mt-6 space-y-3">
                {credentials.map((c) => (
                  <div key={c.degree} className="flex gap-3">
                    <div
                      className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-grotesk font-semibold text-ink text-sm">
                        {c.degree}
                      </p>
                      <p className="text-muted text-xs mt-0.5">{c.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-muted text-xs leading-relaxed">
                Certificaciones adicionales en IA aplicada a auditoría (IBM Granite,
                IBM SkillsBuild), cloud (Microsoft Azure) y análisis de datos.
              </p>
            </div>
          </Reveal>

          {/* Right — carta del fundador */}
          <Reveal delay={120}>
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                Carta del fundador
              </h3>

              <div className="mt-6 space-y-5 text-muted text-lg leading-relaxed">
                <p>
                  La mayoría de las auditorías te dicen qué salió mal. Muy
                  pocas te ayudan a que no vuelva a pasar.
                </p>
                <p>
                  Fundé Proaudita para cerrar esa brecha: usamos tecnología
                  para que tus procesos sean más confiables y tu información
                  esté lista para decisiones reales — las que terminan
                  afectando a tus clientes, tus accionistas, tu equipo y todo
                  lo que construiste.
                </p>
                <p>
                  Trabajamos con empresas medianas y grandes que quieren ir más
                  allá del cumplimiento: entender su operación en profundidad, y
                  mejorarla con evidencia. Si ese es tu caso, conversemos.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="font-grotesk font-semibold text-ink">
                  Matías Balbontín
                </p>
                <p className="text-muted text-sm">Socio Fundador y CEO, Proaudita</p>
              </div>

              <a
                href="#contacto"
                className="mt-8 inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-navy transition-colors"
              >
                Solicitar una reunión
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
