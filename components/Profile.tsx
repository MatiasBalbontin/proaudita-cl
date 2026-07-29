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

export default function Profile() {
  return (
    <section id="perfil" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal>
            <div>
              <span className="text-sm font-semibold text-primary tracking-wide uppercase">
                Liderazgo
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
                    Socio Fundador y CEO
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4 text-muted leading-relaxed">
                <p>
                  Matías Balbontín es Socio Fundador y CEO de Proaudita. Su formación
                  combina auditoría, ingeniería y transformación digital — una base
                  poco común en el mercado chileno que define el enfoque de la firma:
                  auditoría con visión técnica, no solo normativa.
                </p>
                <p>
                  Bajo su dirección, Proaudita trabaja con empresas medianas y
                  grandes que buscan ir más allá del cumplimiento — entender su
                  operación en profundidad y mejorarla con evidencia.
                </p>
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

          <Reveal delay={120}>
            <div>
              <h3 className="font-grotesk font-semibold text-ink text-sm uppercase tracking-wide text-muted mb-4">
                Formación
              </h3>
              <div className="space-y-3">
                {credentials.map((c) => (
                  <div
                    key={c.degree}
                    className="flex gap-4 p-4 bg-surface rounded-xl border border-gray-200"
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
              <p className="mt-4 text-muted text-xs leading-relaxed">
                Certificaciones adicionales en IA aplicada a auditoría (IBM Granite,
                IBM SkillsBuild), cloud (Microsoft Azure) y análisis de datos.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
